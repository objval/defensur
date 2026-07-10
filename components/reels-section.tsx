"use client"

import { ArrowRight, Calendar, ExternalLink, Play } from "lucide-react"
import { REELS, type Reel } from "@/lib/reels-data"

// Icono SVG inline de Instagram
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

// ─── Tarjeta compacta ─────────────────────────────────────────────────────────

function ReelCard({ reel }: { reel: Reel }) {
  const base = reel.type === "reel" ? "reel" : "p"
  const embedUrl = `https://www.instagram.com/${base}/${reel.shortcode}/embed/captioned/`

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-brand-navy/15 hover:shadow-[0_4px_24px_rgba(8,24,107,0.07)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)]">

      {/* ── Iframe del reel ──────────────────────────────────────────────── */}
      <div className="relative w-full bg-muted/40 overflow-hidden" style={{ height: "340px" }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-navy/10 to-brand-sky/10 z-0">
          <div className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play className="size-5 text-brand-navy fill-brand-navy ml-0.5" />
          </div>
        </div>
        <iframe
          src={embedUrl}
          className="relative z-10 w-full h-full border-0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          loading="lazy"
          title={reel.title}
        />
      </div>

      {/* ── Contenido compacto ───────────────────────────────────────────── */}
      <div className="flex flex-col p-5 gap-3">
        {/* Badge categoría + icono IG */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-sky px-2.5 py-1 rounded-full bg-brand-sky/10">
            {reel.category}
          </span>
          <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] text-white shadow-sm">
            <InstagramIcon className="size-3.5" />
          </div>
        </div>

        {/* Título */}
        <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-primary leading-snug line-clamp-2">
          {reel.title}
        </h3>

        {/* Descripción recortada */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {reel.description}
        </p>

        {/* Footer: fecha + botón */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
            <Calendar className="size-3" />
            {new Date(reel.date).toLocaleDateString("es-CL", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            })}
          </span>
          <a
            href={reel.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-brand-navy hover:bg-brand-navy/90 px-3 py-1.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(8,24,107,0.25)] active:scale-95"
          >
            <InstagramIcon className="size-3" />
            Ver reel
            <ExternalLink className="size-2.5" />
          </a>
        </div>
      </div>
    </article>
  )
}

// ─── Sección principal ────────────────────────────────────────────────────────

export function ReelsSection() {
  return (
    <section
      className="py-16 md:py-28 bg-muted/30"
      aria-label="Nuestros Reels de Instagram"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#f09433]/15 via-[#e6683c]/15 to-[#dc2743]/15 border border-[#e6683c]/20">
              <InstagramIcon className="size-3.5 text-[#e6683c]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#c84b2f]">
                Instagram · @defensur.estudiojuridico
              </span>
            </div>
            <h2 className="max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[clamp(2.4rem,4.5vw,3.5rem)]">
              Nuestros{" "}
              <span className="italic font-normal">Reels.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Historias reales, explicadas en primera persona. Cada reel muestra
              cómo trabajamos y los resultados que obtenemos para nuestros clientes.
            </p>
          </div>

          <a
            href="https://www.instagram.com/defensur.estudiojuridico/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:text-brand-sky transition-colors dark:text-brand-on-navy-muted dark:hover:text-white shrink-0"
          >
            Ver perfil completo
            <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Grid 2 columnas en desktop, 1 en móvil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REELS.map((reel) => (
            <ReelCard key={reel.shortcode} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  )
}
