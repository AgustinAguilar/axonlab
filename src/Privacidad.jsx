import React from 'react'
import { motion } from 'framer-motion'

const Logo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-label="AxonLab logo">
    <defs>
      <linearGradient id="logo-line-grad-pp" x1="7" y1="29" x2="27" y2="9" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4F46E5" />
        <stop offset="1" stopColor="#00F2FE" />
      </linearGradient>
    </defs>
    <line x1="7" y1="29" x2="27" y2="9" stroke="url(#logo-line-grad-pp)" strokeWidth="2.5" strokeLinecap="round" />
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

export default function Privacidad() {
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
              Política de Privacidad
            </h1>
            <p className="font-inter text-base" style={{ color: '#9393A0' }}>
              Última actualización: 20 de abril de 2026 · Vigente desde: 9 de abril de 2025
            </p>
          </div>

          {/* Intro */}
          <div className="rounded-2xl p-6 mb-10"
            style={{
              background: 'rgba(79,70,229,0.04)',
              border: '1px solid rgba(79,70,229,0.10)',
            }}>
            <p className="font-inter text-base leading-relaxed" style={{ color: '#4A4A52' }}>
              En <strong>AxonLab</strong> nos comprometemos a proteger tu privacidad y a ser completamente transparentes
              sobre cómo recopilamos, usamos y protegemos tu información personal. Esta Política de Privacidad aplica
              a todos nuestros servicios, incluyendo nuestro sitio web{' '}
              <strong>axonlab.cloud</strong>, nuestros agentes de inteligencia artificial, y cualquier comunicación que
              mantengas con nosotros a través de WhatsApp, Telegram, correo electrónico u otros canales.
            </p>
          </div>

          <Section title="1. Responsable del tratamiento de datos">
            <p>
              <strong>AxonLab</strong> es responsable del tratamiento de los datos personales recabados a través de este sitio
              web y de sus servicios asociados.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Nombre comercial:</strong> AxonLab</li>
              <li><strong>Correo electrónico de contacto:</strong> hola@axonlab.cloud</li>
              <li><strong>Sitio web:</strong> https://axonlab.cloud</li>
            </ul>
            <p>
              Para cualquier consulta relacionada con el tratamiento de tus datos personales, podés comunicarte con
              nosotros en cualquier momento a través del correo indicado.
            </p>
          </Section>

          <Section title="2. Información que recopilamos">
            <p>Recopilamos distintos tipos de información según la forma en que interactuás con nuestros servicios:</p>

            <p><strong>2.1 Información que nos proporcionás directamente</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nombre y apellido</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (cuando contactás por WhatsApp o Telegram)</li>
              <li>Contenido de los mensajes que nos enviás a través de cualquier canal de comunicación</li>
              <li>Información sobre tu negocio o proyecto que compartís al consultar nuestros servicios</li>
              <li>Cualquier otra información que decidás compartir voluntariamente</li>
            </ul>

            <p><strong>2.2 Información recopilada automáticamente</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Dirección IP y datos de geolocalización aproximada</li>
              <li>Tipo y versión del navegador</li>
              <li>Sistema operativo y dispositivo utilizado</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>URL de referencia (desde dónde llegaste a nuestro sitio)</li>
              <li>Fecha y hora de las visitas</li>
            </ul>

            <p><strong>2.3 Información generada por el uso de nuestros agentes de IA</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Historial de conversaciones con AxonBot y demás agentes</li>
              <li>Preferencias y configuraciones expresadas durante el uso</li>
              <li>Datos de uso y rendimiento de los agentes desplegados para tu cuenta</li>
            </ul>
          </Section>

          <Section title="3. Finalidades del tratamiento">
            <p>Utilizamos tu información personal exclusivamente para los siguientes fines:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Prestación del servicio:</strong> Para activar, configurar, mantener y mejorar los agentes de IA y workflows automatizados que contratás con nosotros.</li>
              <li><strong>Comunicación:</strong> Para responderte consultas, enviarte información relevante sobre tu cuenta, notificarte cambios en el servicio y brindarte soporte técnico.</li>
              <li><strong>Mejora de productos:</strong> Para analizar patrones de uso de manera agregada y anónima, con el objetivo de mejorar la experiencia del usuario y desarrollar nuevas funcionalidades.</li>
              <li><strong>Marketing y comunicaciones comerciales:</strong> Con tu consentimiento previo, para enviarte información sobre nuevos servicios, actualizaciones y contenidos relevantes.</li>
              <li><strong>Cumplimiento legal:</strong> Para cumplir con obligaciones legales, regulatorias o requerimientos de autoridades competentes.</li>
              <li><strong>Prevención de fraude:</strong> Para detectar, investigar y prevenir actividades fraudulentas o usos indebidos de nuestros servicios.</li>
            </ul>
          </Section>

          <Section title="4. Base legal para el tratamiento">
            <p>El tratamiento de tus datos personales se fundamenta en las siguientes bases legales:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Ejecución de contrato:</strong> Cuando el tratamiento es necesario para prestarte los servicios que solicitás.</li>
              <li><strong>Consentimiento:</strong> Cuando nos das tu permiso explícito, como al suscribirte a comunicaciones comerciales.</li>
              <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios, prevenir fraudes y garantizar la seguridad de nuestra plataforma.</li>
              <li><strong>Obligación legal:</strong> Cuando debemos cumplir con normativas aplicables.</li>
            </ul>
          </Section>

          <Section title="5. Comunicaciones por WhatsApp y Telegram">
            <p>
              Algunos de nuestros servicios implican el uso de <strong>WhatsApp Business</strong> y <strong>Telegram</strong>
              como canales de comunicación entre nuestros agentes de IA y los usuarios finales de nuestros clientes.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Las conversaciones en estos canales pueden ser procesadas por nuestros sistemas de IA para generar respuestas automáticas.</li>
              <li>Los mensajes se almacenan de forma segura para garantizar la continuidad del servicio y la calidad de la atención.</li>
              <li>El uso de WhatsApp Business está sujeto a las{' '}
                <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
                  className="text-axcyan hover:underline">Políticas de Privacidad de WhatsApp/Meta</a>.</li>
              <li>El uso de Telegram está sujeto a la{' '}
                <a href="https://telegram.org/privacy" target="_blank" rel="noopener noreferrer"
                  className="text-axcyan hover:underline">Política de Privacidad de Telegram</a>.</li>
              <li>Jamás utilizamos estos canales para enviar spam ni comunicaciones no solicitadas.</li>
            </ul>
          </Section>

          <Section title="6. Uso de inteligencia artificial">
            <p>
              Nuestros servicios emplean tecnologías de inteligencia artificial, incluyendo modelos de lenguaje de terceros,
              para procesar mensajes y generar respuestas automatizadas.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Los textos de los mensajes pueden ser procesados por modelos de IA para generar respuestas pertinentes.</li>
              <li>No utilizamos tus conversaciones para entrenar modelos de IA propietarios sin tu consentimiento explícito.</li>
              <li>Los proveedores de IA con los que trabajamos están sujetos a sus propias políticas de privacidad y se comprometen a no utilizar los datos de nuestros clientes para entrenar sus modelos.</li>
              <li>Tomamos medidas técnicas y organizativas para minimizar la cantidad de datos personales procesados por sistemas de IA.</li>
            </ul>
          </Section>

          <Section title="7. Compartición de datos con terceros">
            <p>
              No vendemos, alquilamos ni cedemos tus datos personales a terceros con fines comerciales. Únicamente
              compartimos información en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar nuestra plataforma (alojamiento web, servicios de email, herramientas de análisis), bajo estrictos acuerdos de confidencialidad.</li>
              <li><strong>Plataformas de automatización:</strong> Herramientas como n8n, Zapier u otras que utilizamos para construir y ejecutar los workflows de automatización.</li>
              <li><strong>Plataformas de mensajería:</strong> Meta (WhatsApp Business API), Telegram y otros canales de comunicación que integramos en nuestros servicios.</li>
              <li><strong>Modelos de IA:</strong> Proveedores de inteligencia artificial como Anthropic (Claude) u otros, procesando únicamente los datos necesarios para generar respuestas.</li>
              <li><strong>Obligación legal:</strong> Cuando sea requerido por autoridades competentes conforme a derecho.</li>
              <li><strong>Con tu consentimiento:</strong> En cualquier otro caso en que nos hayas dado tu autorización expresa.</li>
            </ul>
          </Section>

          <Section title="8. Datos de usuarios de Google (Axon Finance)">
            <p>
              <strong>Axon Finance</strong> es un producto de AxonLab que funciona como asistente financiero
              por WhatsApp y guarda la información del usuario en una planilla de Google Sheets dentro de
              su propio Google Drive.
            </p>

            <p><strong>8.1 Scopes de Google solicitados</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>openid, email</strong> — para identificar al usuario y asociarlo a su cuenta de WhatsApp.</li>
              <li>
                <strong>https://www.googleapis.com/auth/drive.file</strong> — acceso restringido únicamente
                a los archivos que Axon Finance crea en el Drive del usuario. No tenemos acceso al resto
                de su Drive.
              </li>
            </ul>

            <p><strong>8.2 Uso de los datos</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Crear y mantener la planilla personal del usuario con sus gastos, ingresos, tarjetas, ahorros y préstamos.</li>
              <li>Leer y escribir en esa planilla cuando el usuario envía mensajes por WhatsApp (ej: registrar un gasto, consultar el resumen).</li>
            </ul>

            <p><strong>8.3 Lo que NO hacemos</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No vendemos, alquilamos ni compartimos datos de Google con terceros.</li>
              <li>No usamos datos de Google (contenido de Sheets/Drive) para entrenar modelos de IA propios ni de terceros.</li>
              <li>No accedemos a archivos del Drive que no hayan sido creados por Axon Finance.</li>
              <li>No usamos los datos de Google para publicidad.</li>
            </ul>

            <p><strong>8.4 Retención y eliminación</strong></p>
            <p>
              El usuario puede revocar el acceso en cualquier momento desde{' '}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer"
                className="text-axcyan hover:underline">https://myaccount.google.com/permissions</a>.
              Al revocar, Axon Finance deja de leer/escribir en la planilla. La planilla permanece en el
              Drive del usuario (es suya). Para eliminar los datos que guardamos asociados a su cuenta
              (tokens, configuración), puede escribir a{' '}
              <a href="mailto:hola@axonlab.cloud" className="text-axcyan hover:underline">hola@axonlab.cloud</a>.
            </p>

            <p><strong>8.5 Cumplimiento</strong></p>
            <p>
              El uso y transferencia de información recibida de las APIs de Google por parte de Axon Finance
              cumple con la{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank"
                rel="noopener noreferrer" className="text-axcyan hover:underline">
                Google API Services User Data Policy
              </a>, incluyendo los requisitos de Limited Use.
            </p>
          </Section>

          <Section title="9. Transferencias internacionales de datos">
            <p>
              Algunos de nuestros proveedores de servicios pueden estar ubicados en países distintos al tuyo. En estos
              casos, garantizamos que dicha transferencia se realiza conforme a la normativa aplicable, utilizando
              mecanismos de protección adecuados como cláusulas contractuales estándar u otros instrumentos
              jurídicos reconocidos.
            </p>
          </Section>

          <Section title="10. Retención de datos">
            <p>Conservamos tu información personal durante el tiempo estrictamente necesario para cumplir con las finalidades descritas en esta política:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Datos de clientes activos:</strong> Mientras dure la relación contractual y por un período adicional de hasta 5 años para cumplir obligaciones legales y fiscales.</li>
              <li><strong>Historial de conversaciones:</strong> Hasta 12 meses desde la última interacción, o según lo acordado en el contrato de servicio.</li>
              <li><strong>Datos de visitas al sitio web:</strong> Hasta 24 meses, en formato anonimizado para análisis estadístico.</li>
              <li><strong>Consultas de soporte:</strong> Hasta 3 años para garantizar la continuidad del servicio.</li>
            </ul>
            <p>
              Una vez cumplido el período de retención, los datos son eliminados de forma segura o anonimizados de
              manera irreversible.
            </p>
          </Section>

          <Section title="11. Seguridad de la información">
            <p>
              Implementamos medidas técnicas y organizativas apropiadas para proteger tu información personal contra
              accesos no autorizados, pérdida, alteración o destrucción:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cifrado de datos en tránsito mediante TLS/HTTPS</li>
              <li>Control de acceso basado en roles y principio de mínimo privilegio</li>
              <li>Monitoreo continuo de la infraestructura</li>
              <li>Copias de seguridad regulares y procedimientos de recuperación</li>
              <li>Revisiones periódicas de seguridad</li>
            </ul>
            <p>
              A pesar de nuestros esfuerzos, ningún sistema es absolutamente seguro. En caso de una brecha de
              seguridad que afecte tus datos, te notificaremos conforme a la normativa aplicable.
            </p>
          </Section>

          <Section title="12. Tus derechos">
            <p>De acuerdo con la normativa de protección de datos aplicable, tenés los siguientes derechos sobre tus datos personales:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> Obtener confirmación sobre si tratamos tus datos y recibir una copia de los mismos.</li>
              <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos cuando ya no sean necesarios para los fines para los que fueron recabados.</li>
              <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
              <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado y de uso común.</li>
              <li><strong>Limitación:</strong> Solicitar que restrinjamos el tratamiento de tus datos en ciertos casos.</li>
              <li><strong>Revocación del consentimiento:</strong> Retirar tu consentimiento en cualquier momento, sin que ello afecte la licitud del tratamiento previo.</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, podés enviarnos un correo a{' '}
              <a href="mailto:hola@axonlab.cloud" className="text-axcyan hover:underline">hola@axonlab.cloud</a>{' '}
              indicando tu solicitud. Responderemos dentro de los plazos legalmente establecidos.
            </p>
          </Section>

          <Section title="13. Cookies y tecnologías similares">
            <p>
              Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar la experiencia de navegación
              y analizar el tráfico del sitio.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio. No requieren tu consentimiento.</li>
              <li><strong>Cookies analíticas:</strong> Nos ayudan a entender cómo usás el sitio para mejorarlo. Las utilizamos en forma anonimizada.</li>
              <li><strong>Cookies de preferencias:</strong> Recuerdan tus configuraciones para personalizar tu experiencia.</li>
            </ul>
            <p>
              Podés configurar tu navegador para rechazar todas las cookies o para recibir una notificación cuando
              se envíe una cookie. Ten en cuenta que algunas partes del sitio pueden no funcionar correctamente
              si deshabilités las cookies.
            </p>
          </Section>

          <Section title="14. Menores de edad">
            <p>
              Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente
              datos personales de menores de edad. Si tenés conocimiento de que un menor nos ha proporcionado
              información personal, te pedimos que nos lo comuniques a{' '}
              <a href="mailto:hola@axonlab.cloud" className="text-axcyan hover:underline">hola@axonlab.cloud</a>{' '}
              para proceder a su eliminación de inmediato.
            </p>
          </Section>

          <Section title="15. Enlaces a terceros">
            <p>
              Nuestro sitio puede contener enlaces a sitios web de terceros. Esta Política de Privacidad no aplica
              a dichos sitios. Te recomendamos revisar las políticas de privacidad de cada sitio que visités.
              AxonLab no se responsabiliza por las prácticas de privacidad de terceros.
            </p>
          </Section>

          <Section title="16. Cambios en esta política">
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestros
              servicios, tecnologías o marcos legales aplicables. La versión actualizada estará siempre disponible
              en esta página con la fecha de última actualización.
            </p>
            <p>
              En caso de cambios sustanciales que afecten tus derechos, te notificaremos por correo electrónico
              o mediante un aviso destacado en nuestro sitio web con una antelación razonable.
            </p>
          </Section>

          <Section title="17. Contacto">
            <p>Si tenés preguntas, comentarios o inquietudes sobre esta Política de Privacidad o sobre el tratamiento de tus datos personales, no dudes en contactarnos:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Correo electrónico:</strong>{' '}
                <a href="mailto:hola@axonlab.cloud" className="text-axcyan hover:underline">hola@axonlab.cloud</a>
              </li>
              <li><strong>Sitio web:</strong>{' '}
                <a href="https://axonlab.cloud" className="text-axcyan hover:underline">axonlab.cloud</a>
              </li>
            </ul>
            <p>
              Nos comprometemos a responder toda consulta dentro de los 15 días hábiles siguientes a su recepción.
            </p>
          </Section>

          {/* Footer note */}
          <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
            <p className="font-mono text-xs" style={{ color: '#9393A0' }}>
              © 2025 AxonLab · Donde la IA cobra impulso
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
