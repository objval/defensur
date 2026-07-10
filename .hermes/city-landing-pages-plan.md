# Plan: Páginas de Aterrizaje por Ciudad del Sur de Chile

> **Future proposal, not implemented.** Validate demand, legal-service coverage, and unique local content before creating any route from this document.

> Solicitado por el jefe. Estrategia SEO local para captar clientes en Valdivia, Osorno, Puerto Montt y Punta Arenas sin perder el foco en Temuco.

---

## Contexto

Defensur Araucanía es un estudio jurídico físicamente ubicado en **Temuco** pero con vocación de atender a toda la Región de La Araucanía y el **sur de Chile**. Actualmente el sitio está optimizado para "abogados temuco" y sus variantes. La expansión SEO a otras ciudades del sur puede captar tráfico de búsquedas como "abogado laboral valdivia" o "abogado familia puerto montt".

**Dominio:** `defensuraraucania.cl` (principal) | `defensur.cl` (referencia)

---

## ⚠️ Riesgos a evitar

| Riesgo | Por qué pasa | Cómo evitarlo |
|--------|-------------|---------------|
| **Contenido duplicado (thin content)** | Copiar/pegar la misma página cambiando solo el nombre de la ciudad. Google penaliza esto. | Cada página debe tener contenido único, local y valioso |
| **Cannibalización SEO** | Las páginas de ciudad compiten entre sí por las mismas keywords | Diferenciar keywords por ciudad + temática |
| **Engañoso para usuarios** | El usuario busca "abogado valdivia" y llega a una página que solo habla de Temuco | Ser transparente: "Atendemos remotamente desde Temuco" |
| **Doorway pages** | Páginas creadas solo para rankear, sin valor real | Incluir info útil de la ciudad, casos, FAQ local |

---

## Estrategia recomendada: "Hub de Servicios + Spokes de Ciudad"

En vez de crear 4 páginas genéricas por ciudad, crear **páginas temáticas específicas** que mencionen la ciudad como contexto local.

### Opción A: Páginas temáticas por ciudad (recomendada)

Estructura: `/[servicio]-[ciudad]/`

Ejemplos:
- `/derecho-laboral-valdivia/` 
- `/derecho-laboral-osorno/`
- `/derecho-familia-puerto-montt/`
- `/insolvencia-punta-arenas/`
- `/derecho-laboral-puerto-montt/`

**Ventajas:**
- Cada página tiene un propósito claro (servicio + ciudad)
- Evita contenido duplicado porque el enfoque del servicio se adapta al contexto regional
- URLs semánticas y fáciles de entender
- Google premia la relevancia temática + local

### Opción B: Páginas de ciudad genéricas (más riesgo de thin content)

Estructura: `/abogados-[ciudad]/`

Ejemplos:
- `/abogados-valdivia/`
- `/abogados-osorno/`

**Desventajas:**
- Tendencia a ser "todo en una página" sin profundidad
- Más difícil de diferenciar entre ciudades
- Mayor riesgo de ser considerado doorway page

---

## Contenido que debe tener cada página

### 1. Hero localizado
```
Título: "Abogados Laborales en Valdivia — Atención Remota desde Temuco"
Subtítulo: "Especialistas en derecho laboral con atención remota para Valdivia, 
           Los Ríos y todo el sur de Chile. Más de 15 años de experiencia."
```

**Importante:** Ser transparente desde el primer segundo. No fingir que hay oficina física en Valdivia si no la hay.

### 2. Sección "¿Cómo funciona la atención remota?"
- Videollamada para primera consulta
- Firma digital de documentos
- Seguimiento por WhatsApp
- Si es necesario, traslado para audiencias (explicar cuándo)

### 3. Casos / Contexto local
- Mencionar leyes o situaciones específicas de la región
- Ej: "En Valdivia, muchos trabajadores de la industria forestal..."
- Ej: "En Puerto Montt, el sector salmonero tiene particularidades..."
- Referir a sentencias propias que apliquen al contexto

### 4. Testimonios / Social proof regional
- "Atendimos a un cliente de Osorno que..."
- "Logramos una sentencia favorable para un trabajador de Punta Arenas..."

### 5. FAQ local
- "¿Puedo contratar un abogado de Temuco si vivo en Valdivia?"
- "¿Las audiencias se pueden hacer de forma remota?"
- "¿Cómo se pagan los honorarios si soy de otra ciudad?"

### 6. CTA localizado
- "Consulta gratuita por WhatsApp — Atendemos en Valdivia"
- Botón con link directo a WhatsApp con mensaje pre-escrito

---

## Keywords objetivo por ciudad

### Valdivia
- abogado laboral valdivia
- abogado familia valdivia
- despido injustificado valdivia
- abogado civil valdivia
- insolvencia valdivia

### Osorno
- abogado laboral osorno
- abogado familia osorno
- abogado civil osorno
- abogado insolvencia osorno
- tutela laboral osorno

### Puerto Montt
- abogado laboral puerto montt
- abogado salmonera puerto montt
- abogado familia puerto montt
- derecho laboral puerto montt
- abogado civil puerto montt

### Punta Arenas
- abogado laboral punta arenas
- abogado familia punta arenas
- abogado civil punta arenas
- abogado magallanes
- derecho laboral punta arenas

---

## Estructura de archivos propuesta

```
app/(pages)/
├── derecho-laboral-valdivia/page.tsx
├── derecho-laboral-osorno/page.tsx
├── derecho-laboral-puerto-montt/page.tsx
├── derecho-laboral-punta-arenas/page.tsx
├── abogados-familia-valdivia/page.tsx
├── abogados-familia-osorno/page.tsx
├── abogados-familia-puerto-montt/page.tsx
├── abogados-familia-punta-arenas/page.tsx
├── derecho-civil-valdivia/page.tsx
├── derecho-civil-osorno/page.tsx
├── derecho-civil-puerto-montt/page.tsx
├── derecho-civil-punta-arenas/page.tsx
└── ... (insolvencia, sumarios)
```

**Nota:** No es necesario crear las 20 páginas de golpe. Empezar con las 4 de Derecho Laboral (la especialidad principal) y medir resultados antes de expandir.

---

## Implementación técnica

### 1. Reutilizar `ServicePageContent`
El componente `ServicePageContent` ya acepta `highlights`, `details`, `faqs` como props. Se puede crear una factory function:

```typescript
function getLaboralContent(city: string) {
  return {
    highlights: [
      {
        title: "Despidos Injustificados",
        description: `Reclamamos tu indemnización cuando el despido no cumple con las causales legales. Atendemos trabajadores de ${city} de forma remota.`
      },
      // ...
    ],
    details: [
      {
        heading: `Despidos Injustificados en ${city}`,
        content: `En ${city}, la industria [...contexto local...]`
      }
    ],
    faqs: [
      {
        question: `¿Puedo contratar un abogado de Temuco si vivo en ${city}?`,
        answer: `Sí. La mayoría de las gestiones se pueden realizar de forma remota...`
      }
    ]
  }
}
```

### 2. Metadata dinámica
```typescript
export const metadata: Metadata = {
  title: `Abogados Laborales en Valdivia — Atención Remota | Defensur`,
  description: `Especialistas en derecho laboral con atención remota para Valdivia. Despidos, tutela laboral, acoso. Consulta gratuita.`,
  alternates: {
    canonical: `https://www.defensuraraucania.cl/derecho-laboral-valdivia/`,
  },
}
```

### 3. Schema.org LocalBusiness
Añadir JSON-LD con `areaServed` que incluya las ciudades:
```json
{
  "@type": "LegalService",
  "areaServed": [
    { "@type": "City", "name": "Temuco" },
    { "@type": "City", "name": "Valdivia" },
    { "@type": "City", "name": "Osorno" },
    { "@type": "City", "name": "Puerto Montt" },
    { "@type": "City", "name": "Punta Arenas" }
  ]
}
```

---

## Plan de ejecución (fases)

### Fase 1: MVP (2-3 días)
- Crear 4 páginas de Derecho Laboral (Valdivia, Osorno, Puerto Montt, Punta Arenas)
- Reutilizar `ServicePageContent` con contenido adaptado
- Añadir enlaces en footer: "También atendemos en: Valdivia, Osorno, Puerto Montt, Punta Arenas"

### Fase 2: Expansión (1 semana)
- Crear páginas de Familia y Civil para las 4 ciudades
- Añadir Schema.org con `areaServed`
- Crear sitemap.xml actualizado con nuevas URLs

### Fase 3: Optimización (continuo)
- Monitoriar Search Console para ver qué páginas rankean
- Refinar contenido de las páginas que reciban tráfico
- Añadir más ciudades si hay demanda (Chillán, Concepción, etc.)

---

## Métricas de éxito

| Métrica | Meta | Cómo medir |
|---------|------|-----------|
| Indexación en Google | 4+ páginas indexadas en 2 semanas | `site:defensuraraucania.cl` |
| Tráfico orgánico | +50% en "abogado [ciudad]" en 3 meses | Search Console |
| CTR en SERP | >3% para páginas de ciudad | Search Console |
| Consultas por ciudad | 1+ consulta mensual por ciudad | WhatsApp tracking |

---

## Reglas de oro

1. **Nunca mentir** sobre la ubicación física. Ser transparente: "Atendemos remotamente desde Temuco".
2. **Contenido único por página**. Mínimo 300 palabras de contenido original y localizado.
3. **No crear doorway pages**. Cada página debe ser útil incluso si nadie buscara SEO.
4. **Canonical self-referencing** en cada página para evitar duplicados.
5. **Enlazar internamente** entre páginas de ciudad y la página principal del servicio.

---

## Próximo paso inmediato

¿Querés que implemente las 4 páginas de Derecho Laboral (Valdivia, Osorno, Puerto Montt, Punta Arenas) ahora? Usaría el componente `ServicePageContent` existente con contenido adaptado para cada ciudad.
