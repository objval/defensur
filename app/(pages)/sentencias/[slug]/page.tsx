import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SENTENCIAS, getSentenciaBySlug, getAllSlugs } from "@/lib/sentencias-data"
import { SentenciaDetail } from "@/components/sentencia-detail"

// ─── SSG ─────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = getSentenciaBySlug(slug)
  if (!s) return {}

  const formattedDate = new Date(s.date).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return {
    title: s.title,
    description: s.excerpt,
    openGraph: {
      title: s.title,
      description: s.excerpt,
      type: "article",
      publishedTime: s.date,
      authors: [s.author],
      locale: "es_CL",
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.excerpt,
    },
    other: {
      "article:published_time": formattedDate,
      "article:author": s.author,
      "article:section": s.category,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SentenciaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const sentencia = getSentenciaBySlug(slug)

  if (!sentencia) {
    notFound()
  }

  return <SentenciaDetail s={sentencia} />
}
