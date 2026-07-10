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
    <section
      className="relative overflow-hidden bg-brand-navy"
      aria-label="Conoce nuestro trabajo"
    >
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:px-16">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <span className="text-[11px] font-bold tracking-[0.15em] text-brand-sky uppercase">
            Conoce nuestro trabajo
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl leading-[1.15] font-semibold text-white sm:text-4xl lg:text-[clamp(2rem,4vw,3rem)]">
            Defensa legal con{" "}
            <span className="font-normal text-white/60 italic">
              resultados comprobados.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/50">
            Conoce cómo trabajamos en Defensur. Desde la primera consulta hasta
            la sentencia final, acompañamos a cada cliente con estrategia,
            transparencia y compromiso.
          </p>
        </div>

        {/* Video container */}
        <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Defensur: Asesoría legal en sumarios administrativos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full cursor-pointer"
              aria-label="Reproducir video"
            >
              {/* Thumbnail */}
              {/* YouTube's remote thumbnail is intentionally used as a lightweight poster. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={THUMBNAIL}
                alt="Defensur — Asesoría legal en sumarios administrativos"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex size-20 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:bg-white/25">
                  <Play
                    className="ml-1 size-8 text-white"
                    fill="currentColor"
                  />
                  {/* Pulse ring */}
                  <div className="absolute inset-0 animate-ping rounded-full border border-white/20" />
                </div>
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white/60 md:bottom-6 md:left-6">
                <span className="size-2 animate-pulse rounded-full bg-red-500" />
                Ver video informativo
              </div>
            </button>
          )}
        </div>

        {/* Stats strip */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 md:mt-16 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white md:text-3xl">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-1 text-xs text-white/40 md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
