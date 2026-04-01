import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Brain,
  Workflow,
  Globe,
  ArrowRight,
  Zap,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// SVG Logo — línea diagonal terminando en un nodo brillante
// ─────────────────────────────────────────────────────────────────────────────
const Logo = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    aria-label="AxonLab logo"
  >
    <defs>
      <linearGradient
        id="logo-line-grad"
        x1="7"
        y1="29"
        x2="27"
        y2="9"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4F46E5" />
        <stop offset="1" stopColor="#00F2FE" />
      </linearGradient>
      <filter id="logo-node-glow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* The impulse line */}
    <line
      x1="7"
      y1="29"
      x2="27"
      y2="9"
      stroke="url(#logo-line-grad)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Bright node — the destination */}
    <circle cx="27" cy="9" r="5" fill="#00F2FE" filter="url(#logo-node-glow)" />
    {/* Origin node */}
    <circle cx="7" cy="29" r="2.5" fill="#4F46E5" opacity="0.65" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// Neural Background — impulsos eléctricos sobre la red de nodos
// ─────────────────────────────────────────────────────────────────────────────
const NODES = [
  { x: 80,   y: 130 },
  { x: 295,  y: 62  },
  { x: 545,  y: 192 },
  { x: 785,  y: 54  },
  { x: 1045, y: 160 },
  { x: 172,  y: 372 },
  { x: 435,  y: 435 },
  { x: 705,  y: 330 },
  { x: 962,  y: 418 },
  { x: 332,  y: 542 },
  { x: 615,  y: 558 },
  { x: 1115, y: 512 },
  { x: 1152, y: 278 },
]

const CONNECTIONS = [
  [0,  1], [1,  2], [2,  3], [3,  4],
  [0,  5], [1,  6], [2,  7], [3,  7], [4,  8],
  [5,  6], [6,  7], [7,  8],
  [5,  9], [9, 10], [10, 11],
  [6,  9], [7, 10], [8, 11],
  [4, 12], [8, 12],
  [2,  6],
]

const NeuralBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1200 620"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <filter id="pulse-glow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="node-glow" x="-120%" y="-120%" width="340%" height="340%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Static base connectors */}
    {CONNECTIONS.map(([f, t], i) => (
      <line
        key={`base-${i}`}
        x1={NODES[f].x}
        y1={NODES[f].y}
        x2={NODES[t].x}
        y2={NODES[t].y}
        stroke="#1D1D1F"
        strokeWidth="0.6"
        opacity="0.065"
      />
    ))}

    {/* Animated impulse paths — the "lógica luminosa" effect */}
    {CONNECTIONS.map(([f, t], i) => (
      <motion.path
        key={`pulse-${i}`}
        d={`M${NODES[f].x} ${NODES[f].y} L${NODES[t].x} ${NODES[t].y}`}
        stroke="#00F2FE"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        filter="url(#pulse-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 1],
          opacity:    [0, 0.85, 0],
        }}
        transition={{
          duration:    2.2 + (i % 4) * 0.45,
          times:       [0, 0.62, 1],
          repeat:      Infinity,
          delay:       i * 0.27,
          ease:        'easeInOut',
          repeatDelay: (i % 3) * 0.4,
        }}
      />
    ))}

    {/* Glowing nodes */}
    {NODES.map((node, i) => (
      <motion.circle
        key={`node-${i}`}
        cx={node.x}
        cy={node.y}
        fill="#00F2FE"
        filter="url(#node-glow)"
        animate={{
          opacity: [0.07, 0.48, 0.07],
          r:       [2.2,  4.5,  2.2],
        }}
        transition={{
          duration: 2.4 + (i % 3) * 0.9,
          repeat:   Infinity,
          delay:    i * 0.21,
          ease:     'easeInOut',
        }}
      />
    ))}
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// Reusable UI primitives
// ─────────────────────────────────────────────────────────────────────────────
const CyanButton = ({ children, large = false, className = '', href }) => {
  const Tag = href ? 'a' : motion.button
  return (
    <Tag
      href={href}
      className={`inline-flex items-center gap-2 font-inter font-semibold rounded-full cursor-pointer ${
        large ? 'px-8 py-4 text-base' : 'px-5 py-2.5 text-sm'
      } ${className}`}
      style={{
        background: 'linear-gradient(135deg, #4F46E5 0%, #00F2FE 100%)',
        color: '#fff',
        textDecoration: 'none',
      }}
      whileHover={{
        boxShadow: '0 0 40px rgba(0,242,254,0.55), 0 4px 20px rgba(79,70,229,0.3)',
        scale: 1.025,
        transition: { type: 'spring', stiffness: 380, damping: 18 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </Tag>
  )
}

const SectionLabel = ({ children, center = false }) => (
  <p
    className={`font-mono text-xs uppercase tracking-[0.22em] mb-3 ${
      center ? 'text-center' : ''
    }`}
    style={{ color: '#00F2FE' }}
  >
    {children}
  </p>
)

// ─────────────────────────────────────────────────────────────────────────────
// Service Cards — Glassmorphism
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Brain,
    title: 'AI Agents',
    description:
      'Agentes inteligentes que piensan, deciden y actúan de forma autónoma para resolver tus procesos más complejos — sin intervención humana.',
  },
  {
    icon: Workflow,
    title: 'n8n Workflows',
    description:
      'Automatización visual de procesos. Conectamos cada herramienta de tu stack con flujos de trabajo que operan de forma continua.',
  },
  {
    icon: Globe,
    title: 'Smart Webs',
    description:
      'Sitios que no solo informan: procesan consultas, responden en tiempo real y evolucionan integrando IA en cada interacción.',
  },
]

const ServiceCard = ({ icon: Icon, title, description, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 52 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: index * 0.14,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-2xl p-8 overflow-hidden"
      style={{
        background:
          'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        border: '1px solid rgba(255,255,255,0.78)',
        boxShadow:
          '0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.65)',
        cursor: 'pointer',
      }}
      whileHover={{
        y: -7,
        boxShadow:
          '0 16px 48px rgba(0,242,254,0.1), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.65)',
        border: '1px solid rgba(0,242,254,0.38)',
        transition: { type: 'spring', stiffness: 280, damping: 20 },
      }}
    >
      {/* Cyan radial accent on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background:
            'radial-gradient(circle at 0% 0%, rgba(0,242,254,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
        style={{
          background: 'rgba(0,242,254,0.08)',
          border: '1px solid rgba(0,242,254,0.16)',
        }}
      >
        <Icon size={22} style={{ color: '#00F2FE' }} />
      </div>

      <h3 className="font-grotesk font-semibold text-xl text-graphite mb-3">
        {title}
      </h3>
      <p
        className="font-inter text-sm leading-relaxed mb-6"
        style={{ color: '#6E6E73' }}
      >
        {description}
      </p>

      <div
        className="inline-flex items-center gap-1 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#00F2FE' }}
      >
        Explorar <ChevronRight size={12} />
      </div>
    </motion.article>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Process Diagram
// ─────────────────────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    icon: Brain,
    title: 'Claude',
    sublabel: 'Inteligencia',
    description:
      'El motor cognitivo que analiza contexto, genera estrategias y toma decisiones complejas.',
    tag: '01',
    highlight: false,
  },
  {
    icon: Workflow,
    title: 'n8n',
    sublabel: 'Lógica',
    description:
      'El orquestador visual que conecta sistemas, automatiza flujos y ejecuta la lógica de negocio.',
    tag: '02',
    highlight: false,
  },
  {
    icon: Zap,
    title: 'Resultado',
    sublabel: 'Impulso',
    description:
      'Ejecución tangible y medible: automatizaciones, respuestas, webs y agentes en producción.',
    tag: '03',
    highlight: true,
  },
]

const ProcessConnector = ({ index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div
      ref={ref}
      className="relative flex items-center w-full mx-6"
      style={{ height: '2px' }}
    >
      {/* Base track */}
      <div
        className="w-full rounded-full"
        style={{ height: '1px', background: 'rgba(0,0,0,0.09)' }}
      />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full rounded-full origin-left"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, #4F46E5, #00F2FE)',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.3, delay: index * 0.28, ease: 'easeOut' }}
      />
      {/* Traveling dot */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '8px',
          height: '8px',
          background: '#00F2FE',
          boxShadow: '0 0 12px rgba(0,242,254,0.85)',
          left: 0,
        }}
        animate={{ left: ['0%', 'calc(100% - 8px)'] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 0.6,
        }}
      />
      {/* Arrow tip */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] leading-none"
        style={{ color: '#00F2FE', transform: 'translateY(-50%) translateX(1px)' }}
      >
        ▶
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-platinum text-graphite overflow-x-hidden">

      {/* ──────────────────────── NAVBAR ──────────────────────── */}
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

          {/* Logo + wordmark */}
          <a href="#" className="flex items-center gap-2.5 group">
            <Logo />
            <span className="font-grotesk font-semibold text-lg tracking-tight text-graphite group-hover:opacity-80 transition-opacity">
              AxonLab
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {['Servicios', 'Proceso', 'Contacto'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-inter text-sm font-medium transition-colors duration-200 hover:text-axcyan"
                style={{ color: '#6E6E73' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <CyanButton href="#contacto">Comenzar →</CyanButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1.5 rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? (
              <X size={20} color="#1D1D1F" />
            ) : (
              <Menu size={20} color="#1D1D1F" />
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mt-3 pt-4 pb-2 border-t flex flex-col gap-5"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}
          >
            {['Servicios', 'Proceso', 'Contacto'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-inter text-sm"
                style={{ color: '#6E6E73' }}
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
            <CyanButton href="#contacto" className="self-start mt-1">
              Comenzar →
            </CyanButton>
          </motion.div>
        )}
      </motion.nav>

      {/* ──────────────────────── HERO ──────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated neural background */}
        <NeuralBackground />

        {/* Radial highlight behind text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(245,245,247,0.92) 0%, rgba(245,245,247,0.5) 55%, transparent 100%)',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-xs mb-10"
            style={{
              background: 'rgba(0,242,254,0.07)',
              border: '1px solid rgba(0,242,254,0.2)',
              color: '#00F2FE',
            }}
          >
            <span
              className="badge-dot w-1.5 h-1.5 rounded-full"
              style={{ background: '#00F2FE' }}
            />
            AxonLab: Donde la IA cobra impulso
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-grotesk font-bold leading-[1.04] tracking-tight mb-8"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Transformamos la
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(130deg, #4F46E5 10%, #00F2FE 75%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              lógica en ejecución
            </span>
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

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.64 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CyanButton large href="#contacto">
              Iniciar proyecto <ArrowRight size={17} />
            </CyanButton>
            <a
              href="#servicios"
              className="font-inter text-sm px-6 py-4 rounded-full transition-colors hover:text-graphite"
              style={{ color: '#9393A0' }}
            >
              Ver servicios →
            </a>
          </motion.div>

          {/* Metric strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center gap-10 mt-20"
          >
            {[
              { value: '10×', label: 'más rápido' },
              { value: '24/7', label: 'operación' },
              { value: '100%', label: 'automatizado' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p
                  className="font-grotesk font-bold text-2xl"
                  style={{ color: '#1D1D1F' }}
                >
                  {value}
                </p>
                <p className="font-mono text-xs mt-0.5" style={{ color: '#9393A0' }}>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade to section below */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent, #F5F5F7)',
          }}
        />
      </section>

      {/* ──────────────────────── SERVICES ──────────────────────── */}
      <section id="servicios" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75 }}
          >
            <SectionLabel>Servicios</SectionLabel>
            <h2
              className="font-grotesk font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Todo lo que necesitás,
              <br />
              <span style={{ color: '#00F2FE' }}>en un solo estudio</span>
            </h2>
            <p
              className="font-inter text-base mb-16 max-w-md"
              style={{ color: '#6E6E73', lineHeight: 1.75 }}
            >
              Tres servicios diseñados para transformar la manera en que tu negocio
              utiliza la inteligencia artificial.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── PROCESS ──────────────────────── */}
      <section id="proceso" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75 }}
          >
            <SectionLabel>El Proceso</SectionLabel>
            <h2
              className="font-grotesk font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Cómo convertimos ideas
              <br />
              <span style={{ color: '#4F46E5' }}>en resultados reales</span>
            </h2>
            <p
              className="font-inter text-base mb-16 max-w-md"
              style={{ color: '#6E6E73', lineHeight: 1.75 }}
            >
              Un flujo elegante donde la inteligencia se convierte en lógica
              y la lógica en impulso.
            </p>
          </motion.div>

          {/* Diagram row */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-12">
            {PROCESS_STEPS.map((step, i) => (
              <React.Fragment key={step.title}>

                {/* Step node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.82 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center px-2 md:px-4"
                >
                  <motion.div
                    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: step.highlight
                        ? 'linear-gradient(135deg, #4F46E5, #00F2FE)'
                        : 'rgba(255,255,255,0.72)',
                      border: step.highlight
                        ? 'none'
                        : '1px solid rgba(0,0,0,0.08)',
                      boxShadow: step.highlight
                        ? '0 0 36px rgba(0,242,254,0.38)'
                        : '0 4px 18px rgba(0,0,0,0.07)',
                    }}
                    whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 320 } }}
                  >
                    <step.icon
                      size={28}
                      color={step.highlight ? '#fff' : '#4F46E5'}
                    />
                  </motion.div>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.2em] mb-1"
                    style={{ color: '#00F2FE' }}
                  >
                    {step.sublabel}
                  </p>
                  <p className="font-grotesk font-semibold text-lg text-graphite">
                    {step.title}
                  </p>
                </motion.div>

                {/* Connector */}
                {i < PROCESS_STEPS.length - 1 && (
                  <>
                    {/* Desktop connector */}
                    <div className="hidden md:flex items-center flex-1 min-w-[64px] max-w-[140px]">
                      <ProcessConnector index={i} />
                    </div>
                    {/* Mobile connector */}
                    <div
                      className="md:hidden w-px my-4"
                      style={{
                        height: '40px',
                        background: 'linear-gradient(to bottom, #4F46E5, #00F2FE)',
                      }}
                    />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Description cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={`desc-${step.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.42)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <p
                  className="font-mono text-xs mb-3"
                  style={{ color: '#00F2FE' }}
                >
                  {step.tag}
                </p>
                <p className="font-grotesk font-semibold text-base mb-2 text-graphite">
                  {step.title}
                </p>
                <p
                  className="font-inter text-sm leading-relaxed"
                  style={{ color: '#6E6E73' }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── CTA ──────────────────────── */}
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
              boxShadow:
                '0 24px 90px rgba(79,70,229,0.09), 0 4px 24px rgba(0,0,0,0.04)',
            }}
          >
            {/* Background orbs */}
            <div
              className="absolute -top-28 -right-28 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,242,254,0.09) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute -bottom-28 -left-28 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10">
              <SectionLabel center>Contacto</SectionLabel>
              <h2
                className="font-grotesk font-bold leading-tight mb-6 mt-4"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
              >
                ¿Listo para el{' '}
                <span
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #4F46E5, #00F2FE)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  impulso?
                </span>
              </h2>
              <p
                className="font-inter text-base mb-10 max-w-md mx-auto"
                style={{ color: '#6E6E73', lineHeight: 1.78 }}
              >
                Contanos tu proyecto. En 24 horas te mostramos exactamente
                cómo la IA puede transformarlo en algo extraordinario.
              </p>
              <CyanButton large href="mailto:hola@axonlab.ai">
                Iniciar conversación <ArrowRight size={17} />
              </CyanButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────── FOOTER ──────────────────────── */}
      <footer
        className="py-10 px-6"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="font-grotesk font-semibold text-sm text-graphite">
              AxonLab
            </span>
          </a>

          <p className="font-mono text-xs" style={{ color: '#9393A0' }}>
            © 2025 AxonLab · Donde la IA cobra impulso
          </p>

          <nav className="flex gap-6">
            {['Servicios', 'Proceso', 'Contacto'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-inter text-xs transition-colors hover:text-axcyan"
                style={{ color: '#9393A0' }}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
