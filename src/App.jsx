import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Brain, Workflow, Globe, ArrowRight, Zap,
  ChevronRight, Menu, X, MessageCircle, Send, Sparkles,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// SVG Logo
// ─────────────────────────────────────────────────────────────────────────────
const Logo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-label="AxonLab logo">
    <defs>
      <linearGradient id="logo-line-grad" x1="7" y1="29" x2="27" y2="9" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4F46E5" />
        <stop offset="1" stopColor="#00F2FE" />
      </linearGradient>
      <filter id="logo-node-glow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <line x1="7" y1="29" x2="27" y2="9" stroke="url(#logo-line-grad)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="27" cy="9" r="5" fill="#00F2FE" filter="url(#logo-node-glow)" />
    <circle cx="7" cy="29" r="2.5" fill="#4F46E5" opacity="0.65" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// Neural Background — chorro de luz viajando por cada conexión
// ─────────────────────────────────────────────────────────────────────────────
const NODES = [
  { x: 80,   y: 130 }, { x: 295,  y: 62  }, { x: 545,  y: 192 },
  { x: 785,  y: 54  }, { x: 1045, y: 160 }, { x: 172,  y: 372 },
  { x: 435,  y: 435 }, { x: 705,  y: 330 }, { x: 962,  y: 418 },
  { x: 332,  y: 542 }, { x: 615,  y: 558 }, { x: 1115, y: 512 },
  { x: 1152, y: 278 },
]
const CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,7],[3,7],[4,8],
  [5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[6,9],[7,10],[8,11],[4,12],[8,12],[2,6],
]

const NeuralBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1200 620"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <filter id="nb-glow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Static base mesh */}
    {CONNECTIONS.map(([f, t], i) => (
      <line key={`b-${i}`} x1={NODES[f].x} y1={NODES[f].y} x2={NODES[t].x} y2={NODES[t].y}
        stroke="#1D1D1F" strokeWidth="0.5" opacity="0.055" />
    ))}

    {/* Chorros de luz — segmento viajando con pathOffset */}
    {CONNECTIONS.map(([f, t], i) => (
      <motion.path
        key={`jet-${i}`}
        d={`M${NODES[f].x} ${NODES[f].y} L${NODES[t].x} ${NODES[t].y}`}
        stroke="#00F2FE"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        filter="url(#nb-glow)"
        style={{ pathLength: 0.09, pathOffset: 0 }}
        animate={{ pathOffset: [0, 0.91] }}
        transition={{
          duration: 1.8 + (i % 3) * 0.6,
          repeat: Infinity,
          ease: 'linear',
          delay: i * 0.22,
          repeatDelay: (i % 4) * 0.35,
        }}
      />
    ))}

    {/* Nodes */}
    {NODES.map((n, i) => (
      <motion.circle key={`nd-${i}`} cx={n.x} cy={n.y} fill="#00F2FE" filter="url(#nb-glow)"
        animate={{ opacity: [0.06, 0.44, 0.06], r: [2, 4, 2] }}
        transition={{ duration: 2.5 + (i % 3) * 0.8, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// CyanButton — breathing glow en variante large
// ─────────────────────────────────────────────────────────────────────────────
const CyanButton = ({ children, large = false, className = '', href, onClick }) => {
  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-2 font-inter font-semibold rounded-full cursor-pointer
        ${large ? 'px-8 py-4 text-base hero-cta-breathe' : 'px-5 py-2.5 text-sm'}
        ${className}`}
      style={{
        background: 'linear-gradient(135deg, #4F46E5 0%, #00F2FE 100%)',
        color: '#fff',
        textDecoration: 'none',
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 0 50px rgba(0,242,254,0.6), 0 6px 24px rgba(79,70,229,0.35)',
        transition: { type: 'spring', stiffness: 360, damping: 16 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </Tag>
  )
}

const SectionLabel = ({ children, center = false }) => (
  <p className={`font-mono text-xs uppercase tracking-[0.22em] mb-3 ${center ? 'text-center' : ''}`}
    style={{ color: '#00F2FE' }}>
    {children}
  </p>
)

// ─────────────────────────────────────────────────────────────────────────────
// ServiceCard — 3D Tilt + specular highlight
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: Brain,    title: 'AI Agents',      description: 'Agentes inteligentes que piensan, deciden y actúan de forma autónoma para resolver tus procesos más complejos — sin intervención humana.' },
  { icon: Workflow, title: 'n8n Workflows',   description: 'Automatización visual de procesos. Conectamos cada herramienta de tu stack con flujos de trabajo que operan de forma continua.' },
  { icon: Globe,    title: 'Smart Webs',      description: 'Sitios que no solo informan: procesan consultas, responden en tiempo real y evolucionan integrando IA en cada interacción.' },
]

const ServiceCard = ({ icon: Icon, title, description, index }) => {
  const cardRef = useRef(null)
  const revealRef = useRef(null)
  const inView = useInView(revealRef, { once: true, margin: '-60px' })
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sx: 50, sy: 50 })

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ rx: (y - 0.5) * 14, ry: (x - 0.5) * -14, sx: x * 100, sy: y * 100 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, sx: 50, sy: 50 })
  }, [])

  return (
    <motion.div ref={revealRef}
      initial={{ opacity: 0, y: 52 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        className="tilt-card group relative rounded-2xl p-8 overflow-hidden cursor-pointer h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          border: '1px solid rgba(255,255,255,0.78)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.65)',
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 0.12s ease, box-shadow 0.3s ease, border 0.3s ease',
        }}
      >
        {/* Specular highlight — sigue el mouse */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.sx}% ${tilt.sy}%, rgba(255,255,255,0.28) 0%, transparent 55%)`,
          }}
        />
        {/* Cyan corner glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle at 0% 0%, rgba(0,242,254,0.07) 0%, transparent 55%)' }}
        />

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{ background: 'rgba(0,242,254,0.08)', border: '1px solid rgba(0,242,254,0.16)' }}>
          <Icon size={22} style={{ color: '#00F2FE' }} />
        </div>

        <h3 className="font-grotesk font-semibold text-xl text-graphite mb-3">{title}</h3>
        <p className="font-inter text-sm leading-relaxed mb-6" style={{ color: '#6E6E73' }}>{description}</p>

        <div className="inline-flex items-center gap-1 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: '#00F2FE' }}>
          Explorar <ChevronRight size={12} />
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AxonFlow Lab — sección interactiva con señal secuencial
// ─────────────────────────────────────────────────────────────────────────────
const FLOW_NODES = [
  { id: 0, label: 'Claude',  sublabel: 'Input',       icon: Brain,         accentColor: '#4F46E5',
    tag: '01', description: 'El motor cognitivo que analiza contexto, genera estrategias y toma decisiones complejas en tiempo real.' },
  { id: 1, label: 'n8n',     sublabel: 'Lógica',      icon: Workflow,      accentColor: '#00F2FE',
    tag: '02', description: 'El orquestador visual que conecta sistemas, automatiza flujos y ejecuta la lógica de negocio sin código.' },
  { id: 2, label: 'Canales', sublabel: 'Multi-canal', icon: MessageCircle, accentColor: '#4F46E5',
    tag: '03', description: 'El resultado llega donde está tu audiencia: WhatsApp, Telegram, Email, Slack — o cualquier canal de tu stack.',
    channels: ['WhatsApp', 'Telegram', 'Email', 'Slack'] },
  { id: 3, label: 'Impulso', sublabel: 'Output',      icon: Zap,           accentColor: '#00F2FE',
    tag: '04', description: 'Ejecución tangible y medible: automatizaciones activas, respuestas instantáneas y agentes corriendo en producción.' },
]

const FlowNode = ({ label, sublabel, icon: Icon, accentColor, lit, isFirst, onHover, channels }) => {
  const [chanIdx, setChanIdx] = useState(0)

  useEffect(() => {
    if (!lit || !channels) { setChanIdx(0); return }
    setChanIdx(0)
    const id = setInterval(() => setChanIdx(i => (i + 1) % channels.length), 650)
    return () => clearInterval(id)
  }, [lit, channels])

  const displaySublabel = channels && lit ? channels[chanIdx] : sublabel

  return (
  <motion.div
    className="flex flex-col items-center gap-3 cursor-pointer select-none"
    onHoverStart={isFirst ? onHover : undefined}
    whileHover={{ scale: isFirst ? 1.06 : 1.02 }}
    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
  >
    <div className="relative">
      <motion.div
        className="w-[68px] h-[68px] rounded-2xl flex items-center justify-center"
        animate={{
          background: lit
            ? [`rgba(${accentColor === '#4F46E5' ? '79,70,229' : '0,242,254'},0.14)`,
               `rgba(${accentColor === '#4F46E5' ? '79,70,229' : '0,242,254'},0.22)`,
               `rgba(${accentColor === '#4F46E5' ? '79,70,229' : '0,242,254'},0.14)`]
            : 'rgba(255,255,255,0.7)',
          borderColor: lit ? accentColor + '55' : 'rgba(0,0,0,0.08)',
          boxShadow: lit
            ? [`0 0 0px ${accentColor}00`, `0 0 28px ${accentColor}55`, `0 0 16px ${accentColor}33`]
            : '0 4px 16px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid',
        }}
      >
        <Icon size={24} color={lit ? accentColor : '#6E6E73'} style={{ transition: 'color 0.3s' }} />
      </motion.div>

      {/* Ring pulse al activarse */}
      <AnimatePresence>
        {lit && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: `1.5px solid ${accentColor}` }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </div>

    <div className="text-center">
      <p className="font-grotesk font-semibold text-sm" style={{ color: lit ? '#1D1D1F' : '#6E6E73', transition: 'color 0.3s' }}>{label}</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={displaySublabel}
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: channels && lit ? '#00F2FE' : '#9393A0' }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
        >
          {displaySublabel}
        </motion.p>
      </AnimatePresence>
    </div>
  </motion.div>
  )
}

const FlowConnector = ({ lit }) => (
  <div className="hidden md:flex flex-1 items-center mx-3" style={{ minWidth: 40, height: 2, position: 'relative' }}>
    <div className="w-full rounded-full" style={{ height: '1px', background: 'rgba(0,0,0,0.09)' }} />
    <motion.div
      className="absolute top-0 left-0 rounded-full origin-left"
      style={{ height: '1px', background: 'linear-gradient(90deg, #4F46E5, #00F2FE)', width: '100%' }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={lit ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
    />
    <AnimatePresence>
      {lit && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 7, height: 7, background: '#00F2FE', boxShadow: '0 0 10px rgba(0,242,254,0.9)', left: 0 }}
          initial={{ left: '0%' }}
          animate={{ left: 'calc(100% - 7px)' }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  </div>
)

const AxonFlowLab = () => {
  const [litSet, setLitSet] = useState(new Set())
  const running = useRef(false)
  const timers = useRef([])
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const triggerSignal = useCallback(() => {
    if (running.current) return
    running.current = true
    setLitSet(new Set())
    timers.current.forEach(clearTimeout)
    timers.current = []

    FLOW_NODES.forEach((_, i) => {
      const t = setTimeout(() => {
        setLitSet(prev => new Set([...prev, i]))
      }, i * 430)
      timers.current.push(t)
    })

    const reset = setTimeout(() => {
      setLitSet(new Set())
      running.current = false
    }, FLOW_NODES.length * 430 + 1100)
    timers.current.push(reset)
  }, [])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  return (
    <section ref={ref} id="lab" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <SectionLabel>Laboratorio</SectionLabel>
          <h2 className="font-grotesk font-bold leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            El flujo <span style={{ color: '#4F46E5' }}>en acción</span>
          </h2>
          <p className="font-inter text-base max-w-md mb-2" style={{ color: '#6E6E73', lineHeight: 1.75 }}>
            Pasá el mouse sobre <strong style={{ color: '#4F46E5' }}>Claude</strong> para disparar
            una señal a través del flujo — y ver cómo el resultado llega a cualquier canal: WhatsApp, Telegram, Email o Slack.
          </p>
          <p className="font-mono text-xs mb-16" style={{ color: '#9393A0' }}>
            ↑ hover sobre el primer nodo para activar
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0"
          style={{
            background: 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.82)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.04)',
          }}
        >
          {/* Ambient glow cuando está activo */}
          <AnimatePresence>
            {litSet.size > 0 && (
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,242,254,0.04) 0%, transparent 100%)' }}
              />
            )}
          </AnimatePresence>

          {FLOW_NODES.map((node, i) => (
            <React.Fragment key={node.id}>
              <FlowNode {...node} lit={litSet.has(i)} isFirst={i === 0} onHover={triggerSignal} channels={node.channels} />
              {i < FLOW_NODES.length - 1 && <FlowConnector lit={litSet.has(i)} />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Description cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {FLOW_NODES.map((node, i) => (
            <motion.div
              key={`desc-${node.id}`}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.42)',
                border: '1px solid rgba(0,0,0,0.06)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <p className="font-mono text-[10px] mb-2" style={{ color: '#00F2FE' }}>{node.tag}</p>
              <p className="font-grotesk font-semibold text-sm mb-1.5 text-graphite">{node.label}</p>
              <p className="font-inter text-xs leading-relaxed" style={{ color: '#6E6E73' }}>{node.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AxonBot — FAB + Modal de chat
// ─────────────────────────────────────────────────────────────────────────────
const BOT_RESPONSES = [
  'Podemos automatizarlo con n8n + Claude. ¿Cuándo querés empezar?',
  'Un agente de IA puede resolver eso en minutos. Contame más.',
  '¡Perfecto caso de uso! Te armo una propuesta rápida.',
  'Eso lo conectamos con n8n en un par de nodos. Muy viable.',
  'Combinando Claude con tu stack actual, lo tenemos en días.',
]

const AxonBotModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy AxonBot. ¿En qué proyecto puedo ayudarte hoy?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      const reply = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)]
      setMessages(prev => [...prev, { from: 'bot', text: reply }])
    }, 950)
  }, [input])

  const handleKey = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }, [handleSend])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-end pb-[88px] pr-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', background: 'rgba(245,245,247,0.4)' }}
        onClick={onClose}
      />

      {/* Chat window */}
      <motion.div
        className="relative z-10 w-[340px] rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.95)',
          boxShadow: '0 24px 70px rgba(79,70,229,0.18), 0 4px 20px rgba(0,0,0,0.06)',
          maxHeight: '480px',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 shrink-0"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #00F2FE)' }}>
              <Brain size={16} color="#fff" />
            </div>
            <div>
              <p className="font-grotesk font-semibold text-sm text-graphite">AxonBot</p>
              <p className="font-mono text-[10px]" style={{ color: '#00F2FE' }}>
                <span className="badge-dot inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle" style={{ background: '#00F2FE' }} />
                activo
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors">
            <X size={16} color="#6E6E73" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="chat-messages flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[82%] px-3.5 py-2.5 font-inter text-sm leading-relaxed"
                style={msg.from === 'user'
                  ? { background: 'linear-gradient(135deg, #4F46E5, #00F2FE)', color: '#fff', borderRadius: '16px 16px 4px 16px' }
                  : { background: 'rgba(0,0,0,0.045)', color: '#1D1D1F', borderRadius: '16px 16px 16px 4px' }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex justify-start">
                <div className="px-4 py-3 flex gap-1 items-center"
                  style={{ background: 'rgba(0,0,0,0.045)', borderRadius: '16px 16px 16px 4px' }}>
                  {[0, 0.18, 0.36].map((d, i) => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#9393A0' }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="p-3 shrink-0" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex gap-2 items-center">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribí tu consulta..."
              className="flex-1 font-inter text-sm px-3.5 py-2.5 rounded-xl outline-none"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)', color: '#1D1D1F' }}
            />
            <motion.button
              onClick={handleSend}
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #00F2FE)' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              <Send size={14} color="#fff" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const AxonBotFAB = () => {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #00F2FE 100%)',
          padding: hovered ? '12px 20px 12px 16px' : '12px',
          boxShadow: '0 4px 24px rgba(79,70,229,0.35)',
          transition: 'padding 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setOpen(true)}
        whileHover={{ boxShadow: '0 8px 40px rgba(0,242,254,0.45), 0 4px 20px rgba(79,70,229,0.35)' }}
        whileTap={{ scale: 0.95 }}
        aria-label="Hablar con AxonBot"
      >
        <Sparkles size={20} color="#fff" />
        <motion.span
          className="font-inter font-semibold text-sm text-white whitespace-nowrap overflow-hidden"
          initial={false}
          animate={{ width: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Hablar con la IA
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && <AxonBotModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-platinum text-graphite overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(245,245,247,0.88)',
          backdropFilter: 'blur(26px)',
          WebkitBackdropFilter: 'blur(26px)',
          borderBottom: '1px solid rgba(0,0,0,0.055)',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <Logo />
            <span className="font-grotesk font-semibold text-lg tracking-tight text-graphite group-hover:opacity-80 transition-opacity">
              AxonLab
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Servicios', 'Lab', 'Contacto'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="font-inter text-sm font-medium transition-colors duration-200 hover:text-axcyan"
                style={{ color: '#6E6E73' }}>
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <CyanButton href="#contacto">Comenzar →</CyanButton>
          </div>

          <button className="md:hidden p-1.5 rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}>
            {mobileOpen ? <X size={20} color="#1D1D1F" /> : <Menu size={20} color="#1D1D1F" />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-3 pt-4 pb-2 border-t flex flex-col gap-5"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            {['Servicios', 'Lab', 'Contacto'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="font-inter text-sm" style={{ color: '#6E6E73' }}
                onClick={() => setMobileOpen(false)}>{item}</a>
            ))}
            <CyanButton href="#contacto" className="self-start mt-1">Comenzar →</CyanButton>
          </motion.div>
        )}
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <NeuralBackground />

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(245,245,247,0.93) 0%, rgba(245,245,247,0.5) 55%, transparent 100%)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-xs mb-10"
            style={{ background: 'rgba(0,242,254,0.07)', border: '1px solid rgba(0,242,254,0.2)', color: '#00F2FE' }}
          >
            <span className="badge-dot w-1.5 h-1.5 rounded-full" style={{ background: '#00F2FE' }} />
            AxonLab: Donde la IA cobra impulso
          </motion.div>

          {/* Headline — gradiente animado */}
          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-grotesk font-bold leading-[1.04] tracking-tight mb-8"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Transformamos la
            <br />
            <span className="animated-gradient-text">lógica en ejecución</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.42 }}
            className="font-inter text-lg md:text-xl max-w-2xl mx-auto mb-12"
            style={{ color: '#6E6E73', lineHeight: 1.78 }}
          >
            Diseñamos agentes de IA, workflows automatizados y webs inteligentes
            que convierten la complejidad en resultados concretos y medibles.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.64 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CyanButton large href="#contacto">
              Iniciar proyecto <ArrowRight size={17} />
            </CyanButton>
            <a href="#servicios"
              className="font-inter text-sm px-6 py-4 rounded-full transition-colors hover:text-graphite"
              style={{ color: '#9393A0' }}>
              Ver servicios →
            </a>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center gap-10 mt-20"
          >
            {[{ value: '10×', label: 'más rápido' }, { value: '24/7', label: 'operación' }, { value: '100%', label: 'automatizado' }]
              .map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-grotesk font-bold text-2xl" style={{ color: '#1D1D1F' }}>{value}</p>
                  <p className="font-mono text-xs mt-0.5" style={{ color: '#9393A0' }}>{label}</p>
                </div>
              ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #F5F5F7)' }} />
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.75 }}>
            <SectionLabel>Servicios</SectionLabel>
            <h2 className="font-grotesk font-bold leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Todo lo que necesitás,
              <br /><span style={{ color: '#00F2FE' }}>en un solo estudio</span>
            </h2>
            <p className="font-inter text-base mb-16 max-w-md" style={{ color: '#6E6E73', lineHeight: 1.75 }}>
              Tres servicios diseñados para transformar la manera en que tu negocio utiliza la inteligencia artificial.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── LAB ── */}
      <AxonFlowLab />

      {/* ── CTA ── */}
      <section id="contacto" className="py-20 px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(255,255,255,0.88)',
              boxShadow: '0 24px 90px rgba(79,70,229,0.09), 0 4px 24px rgba(0,0,0,0.04)',
            }}
          >
            <div className="absolute -top-28 -right-28 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.09) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)' }} />

            <div className="relative z-10">
              <SectionLabel center>Contacto</SectionLabel>
              <h2 className="font-grotesk font-bold leading-tight mb-6 mt-4"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
                ¿Listo para el{' '}
                <span style={{ backgroundImage: 'linear-gradient(135deg, #4F46E5, #00F2FE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  impulso?
                </span>
              </h2>
              <p className="font-inter text-base mb-10 max-w-md mx-auto" style={{ color: '#6E6E73', lineHeight: 1.78 }}>
                Contanos tu proyecto. En 24 horas te mostramos exactamente cómo la IA puede transformarlo.
              </p>
              <CyanButton large href="mailto:hola@axonlab.cloud">
                Iniciar conversación <ArrowRight size={17} />
              </CyanButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="font-grotesk font-semibold text-sm text-graphite">AxonLab</span>
          </a>
          <p className="font-mono text-xs" style={{ color: '#9393A0' }}>
            © 2025 AxonLab · Donde la IA cobra impulso
          </p>
          <nav className="flex gap-6">
            {['Servicios', 'Lab', 'Contacto'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="font-inter text-xs transition-colors hover:text-axcyan"
                style={{ color: '#9393A0' }}>{link}</a>
            ))}
          </nav>
        </div>
      </footer>

      {/* ── AXONBOT FAB ── */}
      <AxonBotFAB />
    </div>
  )
}
