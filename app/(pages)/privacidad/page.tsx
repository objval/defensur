import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Defensur Araucanía: tratamiento de datos personales, finalidades, conservación, derechos ARCO y canales de contacto.",
  alternates: {
    canonical: `${SITE.domain}/privacidad`,
  },
  openGraph: {
    title: "Política de Privacidad | Defensur Araucanía",
    description:
      "Información sobre el tratamiento de datos personales en el sitio web de Defensur Araucanía.",
    url: `${SITE.domain}/privacidad`,
    type: "website",
  },
}

const sections = [
  {
    title: "1. Responsable del tratamiento",
    body: [
      "Defensur Araucanía — Estudio Jurídico es responsable del tratamiento de los datos personales que los usuarios entregan a través de este sitio web, formularios de contacto, canales de WhatsApp, correo electrónico o teléfono.",
      `Para consultas relacionadas con privacidad puede escribir a ${SITE.email}.`,
    ],
  },
  {
    title: "2. Datos personales que podemos tratar",
    body: [
      "Podemos recibir y tratar datos de identificación y contacto, tales como nombre, correo electrónico, teléfono, RUT cuando el usuario lo entrega voluntariamente, área legal de interés, modalidad de atención, fecha y hora solicitada para una consulta, y la descripción del caso enviada por el usuario.",
      "No solicitamos que se ingresen datos sensibles innecesarios en formularios públicos. Si el usuario comunica antecedentes sensibles dentro de la descripción de su caso, estos serán usados únicamente para evaluar la solicitud de orientación jurídica.",
    ],
  },
  {
    title: "3. Finalidades del tratamiento",
    body: [
      "Los datos se utilizan para responder consultas, coordinar reuniones o videollamadas, entregar orientación inicial, mantener registro interno de solicitudes, mejorar la atención del estudio y cumplir obligaciones legales aplicables.",
      "También podemos usar información técnica básica del sitio para fines de seguridad, prevención de abuso, analítica operativa y mejora de la experiencia de usuario.",
    ],
  },
  {
    title: "4. Base legal y consentimiento",
    body: [
      "Al enviar un formulario, escribir por WhatsApp, llamar o enviar un correo, el usuario entrega voluntariamente sus datos para que Defensur pueda responder y gestionar su solicitud.",
      "El tratamiento se realiza conforme a la Ley Nº 19.628 sobre protección de la vida privada y demás normativa chilena aplicable.",
    ],
  },
  {
    title: "5. Conservación de la información",
    body: [
      "Los datos serán conservados durante el tiempo necesario para responder la solicitud, mantener trazabilidad de la atención y cumplir obligaciones legales o profesionales que correspondan.",
      "Cuando la información deje de ser necesaria, podrá ser eliminada o anonimizada de acuerdo con los criterios internos del estudio.",
    ],
  },
  {
    title: "6. Comunicación a terceros",
    body: [
      "Defensur no vende ni arrienda datos personales. La información podrá ser tratada por proveedores tecnológicos necesarios para operar el sitio, formularios, correo electrónico, agenda, hosting o herramientas de gestión interna, siempre bajo una finalidad legítima asociada a la atención del usuario.",
      "También podrá comunicarse información cuando exista obligación legal, requerimiento de autoridad competente o autorización del titular.",
    ],
  },
  {
    title: "7. Derechos del titular",
    body: [
      `El usuario puede solicitar acceso, rectificación, cancelación u oposición respecto de sus datos personales escribiendo a ${SITE.email}.`,
      "Para procesar la solicitud, podremos pedir antecedentes mínimos para verificar la identidad del solicitante y ubicar la información correspondiente.",
    ],
  },
  {
    title: "8. Seguridad",
    body: [
      "Adoptamos medidas razonables para proteger la información recibida a través del sitio y de nuestros canales de contacto. Sin embargo, ningún sistema de transmisión o almacenamiento electrónico puede garantizar seguridad absoluta.",
    ],
  },
  {
    title: "9. Cambios a esta política",
    body: [
      "Esta política podrá ser actualizada para reflejar cambios legales, técnicos u operativos. La versión vigente será siempre la publicada en esta página.",
      "Última actualización: julio de 2026.",
    ],
  },
]

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        title="Política de Privacidad"
        subtitle="Información sobre cómo recibimos, usamos y protegemos los datos personales enviados a través de nuestros canales digitales."
        breadcrumbs={[{ label: "Política de Privacidad", href: "/privacidad" }]}
      />

      <main className="bg-background px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <article className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-muted-foreground">
          <p className="text-base leading-8 text-foreground">
            Esta política explica el tratamiento de datos personales realizado por Defensur Araucanía en relación con su sitio web y canales de contacto. Su finalidad es entregar información clara a usuarios, potenciales clientes y visitantes.
          </p>

          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-primary">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </main>
    </>
  )
}
