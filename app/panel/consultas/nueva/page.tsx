import { ConsultaForm } from "@/components/panel/consulta-form"

export default function NuevaConsultaPage() {
  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-primary">
          Nueva Consulta Especializada
        </h1>
        <p className="mt-2 text-muted-foreground">
          Describe tu caso y nuestro equipo te responderá en menos de 24 horas.
        </p>
      </div>
      <ConsultaForm />
    </div>
  )
}
