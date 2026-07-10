import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Términos de Uso",
  description:
    "Términos de uso del sitio web de Defensur Araucanía: alcance de la información publicada, uso permitido, propiedad intelectual y canales de contacto.",
  alternates: {
    canonical: `${SITE.domain}/terminos`,
  },
  openGraph: {
    title: "Términos de Uso | Defensur Araucanía",
    description:
      "Condiciones generales aplicables al uso del sitio web de Defensur Araucanía.",
    url: `${SITE.domain}/terminos`,
    type: "website",
  },
}

const sections = [
  {
    title: "1. Aceptación de los términos",
    body: [
      "Al navegar este sitio web, el usuario acepta estos términos de uso. Si no está de acuerdo con ellos, debe abstenerse de utilizar el sitio o enviar información a través de sus formularios.",
    ],
  },
  {
    title: "2. Finalidad del sitio",
    body: [
      "Este sitio tiene por finalidad presentar los servicios jurídicos de Defensur Araucanía, entregar información general sobre áreas de práctica, publicar contenidos de orientación legal y facilitar canales de contacto para solicitar una evaluación inicial.",
      "La información publicada es de carácter general y no reemplaza una asesoría jurídica personalizada basada en los antecedentes concretos de cada caso.",
    ],
  },
  {
    title: "3. No constitución automática de relación abogado-cliente",
    body: [
      "El envío de un formulario, correo electrónico, mensaje por WhatsApp o llamada telefónica no constituye por sí solo una relación abogado-cliente ni una obligación de representación judicial por parte de Defensur.",
      "La contratación de servicios profesionales requiere aceptación expresa del estudio, revisión de antecedentes, definición de alcance y acuerdo de condiciones aplicables.",
    ],
  },
  {
    title: "4. Uso permitido del sitio",
    body: [
      "El usuario se compromete a utilizar el sitio de forma lícita, respetuosa y conforme a su finalidad informativa y de contacto.",
      "Queda prohibido utilizar el sitio para enviar información falsa, abusiva, maliciosa, automatizada, fraudulenta o que afecte la disponibilidad, seguridad o integridad del servicio.",
    ],
  },
  {
    title: "5. Exactitud de la información",
    body: [
      "Defensur procura mantener información clara y actualizada, pero no garantiza que todos los contenidos reflejen cambios legales, jurisprudenciales o administrativos ocurridos con posterioridad a su publicación.",
      "Antes de tomar decisiones legales, el usuario debe consultar directamente con un abogado o abogada para revisar su caso específico.",
    ],
  },
  {
    title: "6. Propiedad intelectual",
    body: [
      "Los textos, estructura, diseño, marca, logotipo, recursos descargables y demás contenidos del sitio pertenecen a Defensur o se utilizan con autorización, salvo que se indique expresamente lo contrario.",
      "No se permite copiar, reproducir, republicar o explotar comercialmente el contenido del sitio sin autorización previa y por escrito.",
    ],
  },
  {
    title: "7. Enlaces externos",
    body: [
      "El sitio puede contener enlaces a plataformas externas, redes sociales, mapas, sistemas de mensajería u otros servicios de terceros. Defensur no controla ni responde por el contenido, disponibilidad o políticas de privacidad de esos sitios externos.",
    ],
  },
  {
    title: "8. Limitación de responsabilidad",
    body: [
      "Defensur no será responsable por daños derivados del uso indebido del sitio, decisiones tomadas únicamente con base en información general publicada, interrupciones técnicas, errores de conectividad o servicios prestados por terceros.",
    ],
  },
  {
    title: "9. Modificaciones",
    body: [
      "Defensur podrá modificar estos términos cuando sea necesario por razones legales, técnicas u operativas. La versión vigente será la publicada en esta página.",
      "Última actualización: julio de 2026.",
    ],
  },
  {
    title: "10. Contacto",
    body: [
      `Para consultas sobre estos términos puede escribir a ${SITE.email} o contactar al estudio a través de los canales publicados en el sitio.`,
    ],
  },
]

export default function TerminosPage() {
  return (
    <>
      <PageHero
        title="Términos de Uso"
        subtitle="Condiciones generales para navegar este sitio y utilizar nuestros canales digitales de contacto."
        breadcrumbs={[{ label: "Términos de Uso", href: "/terminos" }]}
      />

      <main className="bg-background px-5 py-14 md:px-8 md:py-20 lg:px-12">
        <article className="mx-auto max-w-3xl space-y-10 text-sm leading-7 text-muted-foreground">
          <p className="text-base leading-8 text-foreground">
            Estos términos regulan el uso del sitio web de Defensur Araucanía. Su objetivo es transparentar el alcance de la información publicada, las condiciones de uso y los límites de responsabilidad propios de un sitio informativo y de contacto profesional.
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
