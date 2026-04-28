
function buildFaviconHref(primary: string, background: string): string {
  const p = primary.replace(/"/g, "'")
  const b = background.replace(/"/g, "'")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${b}"/>
  <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle"
        font-size="18" font-family="Arial, sans-serif"
        font-weight="700" fill="${p}">
    T
  </text>
</svg>`
    .replace(/\s+/g, " ")
    .trim()
  return `data:image/svg+xml;base64,${globalThis.btoa(svg)}`
}

function readColorsFromThemeProbe(): { primary: string; background: string } | null {
  if (typeof document === "undefined" || !document.body) return null

  const el = document.createElement("div")
  el.setAttribute("aria-hidden", "true")
  el.className = "bg-background text-primary"
  el.style.cssText =
    "position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);pointer-events:none"

  document.body.appendChild(el)
  const cs = getComputedStyle(el)
  const primary = cs.color
  const background = cs.backgroundColor
  el.remove()

  if (!primary || !background || primary === "rgba(0, 0, 0, 0)") return null
  return { primary, background }
}

export function syncTypeblitzFavicon() {
  if (typeof document === "undefined") return

  const colors = readColorsFromThemeProbe()
  if (!colors) return

  const href = buildFaviconHref(colors.primary, colors.background)

  const selectors = ['link[rel="icon"]', 'link[rel="shortcut icon"]'] as const
  let touched = false
  for (const sel of selectors) {
    document.querySelectorAll<HTMLLinkElement>(sel).forEach((link) => {
      link.type = "image/svg+xml"
      link.href = href
      touched = true
    })
  }

  if (!touched) {
    const link = document.createElement("link")
    link.id = "typeblitz-favicon"
    link.rel = "shortcut icon"
    link.type = "image/svg+xml"
    link.href = href
    document.head.prepend(link)
  }
}
