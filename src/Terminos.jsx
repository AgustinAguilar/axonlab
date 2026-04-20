import React from 'react'
import { motion } from 'framer-motion'

const Logo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-label="AxonLab logo">
    <defs>
      <linearGradient id="logo-line-grad-tos" x1="7" y1="29" x2="27" y2="9" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4F46E5" />
        <stop offset="1" stopColor="#00F2FE" />
      </linearGradient>
    </defs>
    <line x1="7" y1="29" x2="27" y2="9" stroke="url(#logo-line-grad-tos)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="27" cy="9" r="5" fill="#00F2FE" />
    <circle cx="7" cy="29" r="2.5" fill="#4F46E5" opacity="0.65" />
  </svg>
)

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="font-grotesk font-semibold text-xl text-graphite mb-4 pb-2"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
      {title}
    </h2>
    <div className="font-inter text-base leading-relaxed space-y-3" style={{ color: '#4A4A52' }}>
      {children}
    </div>
  </section>
)

export default function Terminos() {
  return (
    <div className="min-h-screen bg-platinum text-graphite">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(245,245,247,0.92)',
          backdropFilter: 'blur(26px)',
          WebkitBackdropFilter: 'blur(26px)',
          borderBottom: '1px solid rgba(0,0,0,0.055)',
        }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-grotesk font-semibold text-base tracking-tight text-graphite">AxonLab</span>
          </a>
          <a href="/" className="font-inter text-sm hover:text-axcyan transition-colors" style={{ color: '#6E6E73' }}>
            ← Volver al inicio
          </a>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="mb-12">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,242,254,0.07)', border: '1px solid rgba(0,242,254,0.2)', color: '#00F2FE' }}>
              Documentación Legal
            </span>
            <h1 className="font-grotesk font-bold text-4xl md:text-5xl text-graphite mb-4 leading-tight">
              Términos de Servicio
            </h1>
            <p className="font-inter text-base" style={{ color: '#9393A0' }}>
              Última actualización: 20 de abril de 2026 · Vigente desde: 20 de abril de 2026
            </p>
          </div>

          {/* Intro */}
          <div className="rounded-2xl p-6 mb-10"
            style={{
              background: 'rgba(79,70,229,0.04)',
              border: '1px solid rgba(79,70,229,0.10)',
            }}>
            <p className="font-inter text-base leading-relaxed" style={{ color: '#4A4A52' }}>
              Estos Términos de Servicio regulan el uso de <strong>Axon Finance</strong> y demás
              productos y servicios ofrecidos por <strong>AxonLab</strong>. Al utilizar cualquiera
              de nuestros servicios, aceptás los términos aquí descriptos. Si no estás de acuerdo,
              te pedimos que no uses el servicio.
            </p>
          </div>

          <Section title="1. Aceptación de los términos">
            <p>
              Al acceder, registrarte o utilizar <strong>Axon Finance</strong> (el "Servicio"),
              operado por AxonLab, aceptás quedar vinculado por estos Términos de Servicio y por
              nuestra{' '}
              <a href="/privacidad" className="text-axcyan hover:underline">Política de Privacidad</a>.
              Si utilizás el Servicio en nombre de una organización, declarás tener autoridad para
              aceptar estos términos en su nombre.
            </p>
          </Section>

          <Section title="2. Descripción del servicio">
            <p>
              <strong>Axon Finance</strong> es un asistente financiero personal que opera a través
              de <strong>WhatsApp</strong>. El servicio registra gastos, ingresos, tarjetas, ahorros
              y préstamos del usuario en una <strong>planilla de Google Sheets</strong> alojada en
              el <strong>Google Drive del propio usuario</strong>.
            </p>
            <p>
              Para procesar los mensajes y generar respuestas, el Servicio utiliza tecnologías de
              inteligencia artificial, en particular <strong>Claude de Anthropic</strong>.
            </p>
            <p>
              AxonLab se reserva el derecho de modificar, suspender o discontinuar, total o
              parcialmente, el Servicio y sus funcionalidades en cualquier momento.
            </p>
          </Section>

          <Section title="3. Cuenta y acceso">
            <p>
              Para utilizar Axon Finance, el usuario debe:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contar con un número de WhatsApp activo.</li>
              <li>Conectar una cuenta de <strong>Google</strong> mediante <strong>OAuth</strong>, autorizando el acceso al scope <code>drive.file</code> (acceso restringido a los archivos creados por la aplicación).</li>
              <li>Proporcionar información veraz y actualizada durante el proceso de vinculación.</li>
            </ul>
            <p>
              El usuario es el único responsable de mantener la confidencialidad de sus credenciales
              de Google y WhatsApp, así como de toda actividad realizada a través de su cuenta.
              Debe notificar de inmediato a <a href="mailto:info@axonlab.cloud" className="text-axcyan hover:underline">info@axonlab.cloud</a>{' '}
              ante cualquier uso no autorizado.
            </p>
          </Section>

          <Section title="4. Uso permitido">
            <p>
              El Servicio se ofrece para <strong>uso personal y no comercial</strong>. Queda
              expresamente prohibido:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Revender, sublicenciar o explotar comercialmente el Servicio sin autorización escrita de AxonLab.</li>
              <li>Automatizar el envío masivo de mensajes, realizar scraping o abusar de los recursos del Servicio.</li>
              <li>Usar el Servicio para fines ilegales, fraudulentos, para acosar a terceros, lavar activos o financiar actividades ilícitas.</li>
              <li>Intentar vulnerar la seguridad, ingeniería inversa, o interferir con el funcionamiento del Servicio.</li>
              <li>Utilizar el Servicio de cualquier forma que infrinja leyes aplicables o derechos de terceros.</li>
            </ul>
          </Section>

          <Section title="5. Disclaimer financiero">
            <p>
              <strong>Axon Finance es una herramienta de registro personal</strong>.
              <strong> No constituye asesoramiento financiero, contable, impositivo ni legal</strong>.
              La información que brinda el Servicio (resúmenes, totales, sugerencias, recordatorios)
              tiene carácter meramente informativo.
            </p>
            <p>
              Las decisiones financieras, de inversión, endeudamiento o de cualquier otra naturaleza
              que el usuario tome son de su exclusiva responsabilidad. Ante dudas, el usuario debe
              consultar a un profesional matriculado.
            </p>
          </Section>

          <Section title="6. Precisión de los datos">
            <p>
              Axon Finance utiliza modelos de inteligencia artificial para interpretar los mensajes
              en lenguaje natural del usuario. <strong>Estos modelos pueden cometer errores</strong>:
              malinterpretar montos, fechas, categorías o destinatarios de transacciones.
            </p>
            <p>
              Es responsabilidad del usuario <strong>verificar periódicamente los registros en su
              planilla de Google Sheets</strong> y corregir cualquier inexactitud. AxonLab no se
              responsabiliza por errores de interpretación o por las consecuencias de basar decisiones
              en datos no verificados.
            </p>
          </Section>

          <Section title="7. Disponibilidad del servicio">
            <p>
              El Servicio se ofrece <strong>"tal cual" y "según disponibilidad"</strong>, sin
              garantías expresas ni implícitas de ningún tipo. No garantizamos que el Servicio
              esté libre de errores, sea ininterrumpido, seguro o cumpla con expectativas
              específicas del usuario.
            </p>
            <p>
              AxonLab puede realizar tareas de mantenimiento, actualizaciones o cambios sin
              aviso previo. El Servicio depende además de proveedores externos (WhatsApp/Meta,
              Google, Anthropic) cuyas caídas o cambios pueden afectar su disponibilidad.
            </p>
          </Section>

          <Section title="8. Cancelación y terminación">
            <p>
              El usuario puede <strong>cancelar el uso del Servicio en cualquier momento</strong>,
              sin costo, mediante cualquiera de estas acciones:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Revocar el acceso de Axon Finance desde{' '}
                <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer"
                  className="text-axcyan hover:underline">https://myaccount.google.com/permissions</a>.
              </li>
              <li>Dejar de enviar mensajes al número de WhatsApp del Servicio.</li>
              <li>Solicitar la eliminación de sus datos escribiendo a{' '}
                <a href="mailto:info@axonlab.cloud" className="text-axcyan hover:underline">info@axonlab.cloud</a>.
              </li>
            </ul>
            <p>
              AxonLab puede suspender o dar de baja cuentas que violen estos Términos, abusen
              del Servicio o pongan en riesgo su integridad, sin obligación de aviso previo.
            </p>
          </Section>

          <Section title="9. Limitación de responsabilidad">
            <p>
              En la máxima medida permitida por la ley aplicable, <strong>AxonLab no será
              responsable</strong> por:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Daños indirectos, incidentales, especiales, consecuenciales o punitivos.</li>
              <li>Pérdida de datos, de ganancias, de oportunidades de negocio o de reputación.</li>
              <li>Decisiones financieras, de inversión o de cualquier otro tipo tomadas por el usuario en base a información provista por el Servicio.</li>
              <li>Fallas, errores o interrupciones originadas en servicios de terceros (WhatsApp/Meta, Google, Anthropic u otros).</li>
              <li>Accesos no autorizados a la cuenta del usuario derivados de negligencia en la custodia de sus credenciales.</li>
            </ul>
          </Section>

          <Section title="10. Propiedad intelectual">
            <p>
              El software, la marca <strong>AxonLab</strong>, <strong>Axon Finance</strong>,
              sus logotipos, diseños, textos y demás elementos del Servicio son propiedad exclusiva
              de AxonLab o de sus licenciantes. El usuario no adquiere ningún derecho sobre estos
              activos por el solo uso del Servicio.
            </p>
            <p>
              Los datos personales y la planilla de Google Sheets generada son y siguen siendo
              <strong> propiedad del usuario</strong>.
            </p>
          </Section>

          <Section title="11. Cambios en los términos">
            <p>
              Podemos actualizar estos Términos periódicamente para reflejar cambios en el
              Servicio, en la normativa aplicable o en nuestras prácticas. La versión vigente
              siempre estará disponible en <a href="https://axonlab.cloud/terminos" className="text-axcyan hover:underline">axonlab.cloud/terminos</a>
              {' '}con la fecha de última actualización.
            </p>
            <p>
              En caso de cambios sustanciales, notificaremos al usuario por un medio razonable
              (mensaje de WhatsApp, correo electrónico o aviso destacado en el sitio) con
              antelación razonable. El uso continuado del Servicio luego de la publicación
              implica la aceptación de los nuevos términos.
            </p>
          </Section>

          <Section title="12. Contacto">
            <p>Ante cualquier consulta sobre estos Términos de Servicio:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Correo electrónico:</strong>{' '}
                <a href="mailto:info@axonlab.cloud" className="text-axcyan hover:underline">info@axonlab.cloud</a>
              </li>
              <li><strong>Sitio web:</strong>{' '}
                <a href="https://axonlab.cloud" className="text-axcyan hover:underline">axonlab.cloud</a>
              </li>
            </ul>
          </Section>

          <Section title="13. Ley aplicable y jurisdicción">
            <p>
              Estos Términos se rigen por las leyes de la <strong>República Argentina</strong>.
              Para toda controversia derivada de su interpretación o aplicación, las partes se
              someten a la jurisdicción de los tribunales ordinarios con asiento en la Ciudad
              Autónoma de Buenos Aires, con renuncia a cualquier otro fuero o jurisdicción que
              pudiera corresponder.
            </p>
          </Section>

          {/* Footer note */}
          <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
            <p className="font-mono text-xs" style={{ color: '#9393A0' }}>
              © 2026 AxonLab · Donde la IA cobra impulso
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
