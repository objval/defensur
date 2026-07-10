// ─── Tipos ───────────────────────────────────────────────────────────────────

export type Reel = {
  /** Código del post: la parte final de la URL de Instagram */
  shortcode: string
  /** "reel" para /reel/ y "post" para /p/ */
  type: "reel" | "post"
  title: string
  description: string
  category: string
  /** Fecha de publicación (YYYY-MM-DD) */
  date: string
  /** URL completa en Instagram para el botón "Ver en Instagram" */
  instagramUrl: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const REELS: Reel[] = [
  {
    shortcode: "C6FUQ-OLCq0",
    type: "reel",
    title: "Tutela Laboral — Caso de éxito en derecho laboral",
    description:
      "Nuestro equipo explica cómo logramos una indemnización histórica para una funcionaria pública víctima de hostigamiento laboral. Un caso que marcó precedente en La Araucanía.",
    category: "Tutela Laboral",
    date: "2024-04-15",
    instagramUrl: "https://www.instagram.com/reel/C6FUQ-OLCq0/",
  },
  {
    shortcode: "CxMYFdYLOr-",
    type: "reel",
    title: "Hospital Víctor Ríos Ruiz condenado por vulneración de Derechos Fundamentales",
    description:
      "Extracto de entrevista con Diario La Tribuna: juicio contra el Hospital Víctor Ríos Ruiz, condenado por vulneración a la honra e integridad física y psíquica de funcionaria pública.",
    category: "Tutela Laboral",
    date: "2023-09-14",
    instagramUrl: "https://www.instagram.com/reel/CxMYFdYLOr-/",
  },
  {
    shortcode: "DSD7QmTicQz",
    type: "post",
    title: "Director de Educación de Pucón: hostigamiento, presiones y oficina desmantelada",
    description:
      "Alejandro Durán, con 25 años de servicio, fue objeto de hostigamiento sistemático por parte del alcalde y su equipo, incluyendo presiones para renunciar y el desmantelamiento de su oficina mientras estaba con licencia médica.",
    category: "Tutela Laboral",
    date: "2025-12-09",
    instagramUrl: "https://www.instagram.com/p/DSD7QmTicQz/",
  },
  {
    shortcode: "DV63vvKiRGC",
    type: "post",
    title: "Corte de Apelaciones rechaza censura contra Novena Digital",
    description:
      "La Corte de Apelaciones de Temuco rechazó el recurso de protección de AMZOMA contra el medio regional, ratificando la libertad de prensa y descartando que existiera acto ilegal alguno. Defensa a cargo de Defensur.",
    category: "Derecho Civil",
    date: "2026-03-15",
    instagramUrl: "https://www.instagram.com/p/DV63vvKiRGC/",
  },
  {
    shortcode: "DZsi_CcA4vC",
    type: "post",
    title: "Municipalidad de Los Ángeles condenada a pagar $10 millones por acoso laboral",
    description:
      "El Juzgado del Trabajo de Los Ángeles acreditó acoso laboral y represalias contra funcionaria que denunció irregularidades, condenando al municipio a $10.000.000 por daño moral más medidas preventivas bajo Ley Karin.",
    category: "Acoso Laboral",
    date: "2026-06-17",
    instagramUrl: "https://www.instagram.com/p/DZsi_CcA4vC/",
  },
  {
    shortcode: "DVUl7FFgXBq",
    type: "post",
    title: "Municipalidad de Perquenco condenada: podóloga reintegrada y $12 millones por daño moral",
    description:
      "El Juzgado de Lautaro acogió la tutela de Karla Lara, funcionaria trasladada 22 km sin locomoción tras denunciar irregularidades. Ordenó su reintegración al CESFAM, disculpas públicas y $12.000.000 por daño moral.",
    category: "Tutela Laboral",
    date: "2026-02-28",
    instagramUrl: "https://www.instagram.com/p/DVUl7FFgXBq/",
  },
  // ── Agrega más reels/posts aquí siguiendo el mismo formato ───────────────
]
