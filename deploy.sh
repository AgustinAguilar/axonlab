#!/bin/bash
set -euo pipefail

# ============================================================
# AxonLab — Deploy a VPS Hostinger
# Uso: bash deploy.sh
#      bash deploy.sh --fresh   (reinstalación completa)
# ============================================================

BRANCH="main"
DOMAIN="axonlab.cloud"
APP_DIR="/var/www/axonlab"
NODE_VERSION="20"

# --- Leer secrets ---
SECRETS_FILE="$USERPROFILE/.claude/secrets/axonlab-vps.json"
if [ -z "${USERPROFILE:-}" ]; then
  SECRETS_FILE="$HOME/.claude/secrets/axonlab-vps.json"
fi

if [ ! -f "$SECRETS_FILE" ]; then
  echo "Error: No se encontro $SECRETS_FILE"
  exit 1
fi

read_secret() {
  node -e "const d=JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));console.log(d[process.argv[2]])" "$SECRETS_FILE" "$1"
}

VPS_USER=$(read_secret user)
VPS_HOST=$(read_secret host)
VPS_PORT=$(read_secret port)
VPS_PASS=$(read_secret password)
GH_TOKEN=$(read_secret gh_token)

AUTH_REPO_URL="https://${GH_TOKEN}@github.com/AgustinAguilar/axonlab.git"

# --- Flags ---
FRESH=false
if [[ "${1:-}" == "--fresh" ]]; then
  FRESH=true
fi

echo ""
echo "=================================================="
echo "  AxonLab — Deploy a $VPS_HOST"
echo "=================================================="
echo "  Dominio:    $DOMAIN"
echo "  Directorio: $APP_DIR"
echo "  Branch:     $BRANCH"
echo "  Modo:       $([ "$FRESH" = true ] && echo 'INSTALACION COMPLETA' || echo 'ACTUALIZACION')"
echo ""

# ============================================================
# Deploy remoto vía SSH (las variables se expanden ANTES de enviar)
# ============================================================
ssh -p "$VPS_PORT" -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" bash -s <<REMOTE
set -euo pipefail

AUTH_REPO_URL="$AUTH_REPO_URL"
BRANCH="$BRANCH"
APP_DIR="$APP_DIR"
DOMAIN="$DOMAIN"
NODE_VERSION="$NODE_VERSION"
FRESH="$FRESH"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "\${GREEN}[✓]\${NC} \$1"; }
warn() { echo -e "\${YELLOW}[!]\${NC} \$1"; }
err()  { echo -e "\${RED}[✗]\${NC} \$1"; exit 1; }
info() { echo -e "\${CYAN}[→]\${NC} \$1"; }

# ──────────────────────────────────────────────
# 1. Dependencias base (solo en fresh)
# ──────────────────────────────────────────────
if [ "\$FRESH" = "true" ]; then
  info "Actualizando sistema..."
  apt-get update -qq
  apt-get install -y -qq curl git nginx certbot python3-certbot-nginx sshpass
fi

# ──────────────────────────────────────────────
# 2. Node.js
# ──────────────────────────────────────────────
install_node() {
  if command -v node &>/dev/null; then
    CURRENT=\$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "\$CURRENT" -ge "\$NODE_VERSION" ]; then
      log "Node.js \$(node -v) ya instalado."
      return
    fi
  fi
  info "Instalando Node.js \${NODE_VERSION}.x..."
  curl -fsSL "https://deb.nodesource.com/setup_\${NODE_VERSION}.x" | bash -
  apt-get install -y -qq nodejs
  log "Node.js \$(node -v) instalado."
}

if [ "\$FRESH" = "true" ]; then
  install_node
fi

# ──────────────────────────────────────────────
# 3. Clonar o actualizar repo
# ──────────────────────────────────────────────
if [ ! -d "\$APP_DIR/.git" ]; then
  info "Primera vez — clonando repo..."
  mkdir -p "\$(dirname "\$APP_DIR")"
  rm -rf "\$APP_DIR"
  git clone "\$AUTH_REPO_URL" "\$APP_DIR"
  cd "\$APP_DIR"
  git checkout "\$BRANCH"
  log "Repo clonado."
else
  info "Actualizando código..."
  cd "\$APP_DIR"
  git remote set-url origin "\$AUTH_REPO_URL"
  git fetch origin
  git reset --hard "origin/\$BRANCH"
  log "Código actualizado."
fi

cd "\$APP_DIR"

# ──────────────────────────────────────────────
# 4. Instalar dependencias y build
# ──────────────────────────────────────────────
info "Instalando dependencias npm..."
npm ci 2>/dev/null || npm install

info "Construyendo frontend..."
npm run build
log "Build completado en dist/"

# ──────────────────────────────────────────────
# 5. Nginx (solo en fresh install)
# ──────────────────────────────────────────────
setup_nginx() {
  info "Configurando Nginx para \$DOMAIN..."
  cat > /etc/nginx/sites-available/axonlab <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name \$DOMAIN www.\$DOMAIN;

    root \$APP_DIR/dist;
    index index.html;

    # SPA fallback
    location / {
        try_files \\\$uri \\\$uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)\$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
NGINX

  ln -sf /etc/nginx/sites-available/axonlab /etc/nginx/sites-enabled/
  rm -f /etc/nginx/sites-enabled/default
  nginx -t
  systemctl enable nginx
  systemctl restart nginx
  log "Nginx configurado."
}

# ──────────────────────────────────────────────
# 6. SSL con Let's Encrypt
# ──────────────────────────────────────────────
setup_ssl() {
  info "Configurando SSL para \$DOMAIN..."
  certbot --nginx \
    -d "\$DOMAIN" \
    -d "www.\$DOMAIN" \
    --non-interactive \
    --agree-tos \
    --email "hola@\$DOMAIN" \
    --redirect || warn "SSL no se pudo configurar automáticamente. Ejecutar: certbot --nginx -d \$DOMAIN"
  log "SSL configurado."
}

# ──────────────────────────────────────────────
# 7. Firewall
# ──────────────────────────────────────────────
setup_firewall() {
  if command -v ufw &>/dev/null; then
    info "Configurando firewall..."
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    log "Firewall activo."
  fi
}

# ──────────────────────────────────────────────
# Ejecución condicional
# ──────────────────────────────────────────────
if [ "\$FRESH" = "true" ]; then
  setup_nginx
  setup_ssl
  setup_firewall
else
  # En actualización solo recargar Nginx para reflejar nuevo build
  nginx -t && systemctl reload nginx
  log "Nginx recargado."
fi

echo ""
echo "=================================================="
echo -e "  \${GREEN}AxonLab deployado OK\${NC}"
echo "=================================================="
echo "  https://\$DOMAIN"
echo ""
echo "  Comandos útiles:"
echo "    Logs nginx:   journalctl -u nginx -f"
echo "    Recargar:     systemctl reload nginx"
echo "    SSL renovar:  certbot renew --dry-run"
echo "=================================================="
REMOTE

echo ""
echo "Deploy completado. Sitio en: https://$DOMAIN"
echo ""
