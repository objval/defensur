"use client"

export function VideoSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30" aria-label="Video informativo">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy dark:text-brand-on-navy-muted">
              Conoce nuestro trabajo
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl">
              Asesoría legal en sumarios administrativos{" "}
              <span className="italic font-normal">de principio a fin.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En Defensur acompañamos a funcionarios públicos durante todo el proceso
              de sumarios administrativos. Desde la notificación hasta la defensa
              final, nuestro equipo garantiza el debido proceso y la protección de
              tus derechos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-navy/5 dark:bg-brand-on-navy-muted/5">
                <span className="text-2xl font-bold text-brand-navy dark:text-brand-on-navy-muted">+15</span>
                <span className="text-sm text-muted-foreground">Años de experiencia</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-navy/5 dark:bg-brand-on-navy-muted/5">
                <span className="text-2xl font-bold text-brand-navy dark:text-brand-on-navy-muted">+500</span>
                <span className="text-sm text-muted-foreground">Casos resueltos</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(8,24,107,0.12)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
            <iframe
              src="https://www.youtube.com/embed/44g_fgYZtEg"
              title="Defensur: Asesoría legal en sumarios administrativos de principio a fin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
