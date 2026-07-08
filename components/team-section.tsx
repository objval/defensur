"use client"

import * as React from "react"
import Image from "next/image"
import { TEAM, type TeamMember } from "@/lib/site"

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div
      className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl lg:h-full lg:aspect-auto"
      role="listitem"
      aria-label={`${member.name}, ${member.role}`}
    >
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/46 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-sky">
            {member.role}
          </p>
          <h4 className="mt-1 text-[13px] font-semibold leading-snug text-white">
            {member.name}
          </h4>
        </div>
      </div>
    </div>
  )
}

function FeaturedCard({ member }: { member: TeamMember }) {
  return (
    <article
      className="relative h-full min-h-[26rem] w-full overflow-hidden rounded-2xl sm:min-h-[34rem] lg:min-h-0"
      aria-label={`${member.name}, ${member.role}`}
    >
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/48 to-black/8" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-sky">
            {member.role}
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[2.6rem]">
            {member.name}
          </h3>
        </div>
      </div>
    </article>
  )
}

export function TeamSection() {
  const featured = React.useMemo(() => TEAM.find((m) => m.featured)!, [])
  const rest = React.useMemo(() => TEAM.filter((m) => !m.featured), [])

  return (
    <section className="py-16 md:py-28" aria-label="Nuestro equipo">
      <div className="mx-auto max-w-7xl px-5 md:px-12 lg:px-24">
        <div className="mb-12 grid gap-8 border-b border-border/70 pb-10 md:mb-16 md:pb-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-end">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
              Nuestro equipo
            </span>

            <h2 className="max-w-3xl font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-[clamp(2.4rem,4.5vw,3.5rem)]">
              Tu defensa tiene nombres y apellidos.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:pl-8">
            <div className="border-t border-border/70 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy">
                Base
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Temuco</p>
            </div>

            <div className="border-t border-border/70 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy">
                Equipo
              </p>
              <p className="mt-2 text-sm text-muted-foreground">6 integrantes</p>
            </div>

            <div className="border-t border-border/70 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy">
                Áreas
              </p>
              <p className="mt-2 text-sm text-muted-foreground">5 áreas</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:auto-rows-[15rem] xl:auto-rows-[17rem]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 lg:row-span-2">
            <FeaturedCard member={featured} />
          </div>

          {rest.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
