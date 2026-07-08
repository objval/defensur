"use client"

import * as React from "react"
import { Play } from "lucide-react"
import { STATS } from "@/lib/site"
import { AnimatedCounter } from "@/components/ui/animated-counter"

const VIDEO_ID = "44g_fgYZtEg"
const THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`
const stats = STATS

export function VideoSection() {
  const [playing, setPlaying] = React.useState(false)

  return (
    <section className="relative bg-brand-navy overflow-hidden" aria-label="Conoce nuestro trabajo">
      <div className="relative max-w-7xl mx-auto px-5 md:px-12 lg:px-24 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-sky">
            Conoce nuestro trabajo
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.15] text-white">
            Defensa legal con{" "}
            <span className="italic font-normal text-white/60">resultados comprobados.</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto leading-relaxed">
            Conoce cómo trabajamos en Defensur. Desde la primera consulta hasta la sentencia
            final, acompañamos a cada cliente con estrategia, transparencia y compromiso.
          </p>
        </div>

        {/* Video container */}
        <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.5)] aspect-video max-w-4xl mx-auto">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Defensur: Asesoría legal en sumarios administrativos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 w-full h-full cursor-pointer"
              aria-label="Reproducir video"
            >
              {/* Thumbnail */}
              <img
                src={THUMBNAIL}
                alt="Defensur — Asesoría legal en sumarios administrativos"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center size-20 rounded-full bg-white/15 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:bg-white/25 group-hover:scale-110 group-hover:border-white/30">
                  <Play className="size-8 text-white ml-1" fill="currentColor" />
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                </div>
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2 text-xs text-white/60">
                <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                Ver video informativo
              </div>
            </button>
          )}
        </div>

        {/* Stats strip */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-white">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-1 text-xs md:text-sm text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
