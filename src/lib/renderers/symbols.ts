import type { PatternState } from '../types'

const SYMBOL_SETS = [
  {
    name: '0 / \\ X',
    render: (v: number, x: number, y: number, s: number, w: number) => {
      const m = s * 0.18
      const attrs = `stroke="#e4e4e7" stroke-width="${w}" fill="none" stroke-linecap="round"`
      if (v === 0) return ''
      if (v === 1)
        return `<line x1="${x + m}" y1="${y + s - m}" x2="${x + s - m}" y2="${y + m}" ${attrs}/>`
      if (v === 2)
        return `<line x1="${x + m}" y1="${y + m}" x2="${x + s - m}" y2="${y + s - m}" ${attrs}/>`
      return `<line x1="${x + m}" y1="${y + s - m}" x2="${x + s - m}" y2="${y + m}" ${attrs}/><line x1="${x + m}" y1="${y + m}" x2="${x + s - m}" y2="${y + s - m}" ${attrs}/>`
    },
  },
  {
    name: '点の大きさ',
    render: (v: number, x: number, y: number, s: number) => {
      const cx = x + s / 2
      const cy = y + s / 2
      const radii = [0, s * 0.08, s * 0.16, s * 0.24]
      const r = radii[v]
      if (r === 0) return ''
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#e4e4e7"/>`
    },
  },
  {
    name: '— | +',
    render: (v: number, x: number, y: number, s: number, w: number) => {
      const cx = x + s / 2
      const cy = y + s / 2
      const m = s * 0.18
      const attrs = `stroke="#e4e4e7" stroke-width="${w}" fill="none" stroke-linecap="round"`
      if (v === 0) return ''
      if (v === 1)
        return `<line x1="${x + m}" y1="${cy}" x2="${x + s - m}" y2="${cy}" ${attrs}/>`
      if (v === 2)
        return `<line x1="${cx}" y1="${y + m}" x2="${cx}" y2="${y + s - m}" ${attrs}/>`
      return `<line x1="${x + m}" y1="${cy}" x2="${x + s - m}" y2="${cy}" ${attrs}/><line x1="${cx}" y1="${y + m}" x2="${cx}" y2="${y + s - m}" ${attrs}/>`
    },
  },
  {
    name: 'マルバツ',
    render: (v: number, x: number, y: number, s: number, w: number) => {
      const cx = x + s / 2
      const cy = y + s / 2
      const m = s * 0.18
      const r = (s / 2 - m) * Math.sqrt(2)
      const attrs = `stroke="#e4e4e7" stroke-width="${w}" fill="none" stroke-linecap="round"`
      const slash = `<line x1="${x + m}" y1="${y + s - m}" x2="${x + s - m}" y2="${y + m}" ${attrs}/>`
      const backslash = `<line x1="${x + m}" y1="${y + m}" x2="${x + s - m}" y2="${y + s - m}" ${attrs}/>`
      const circle = `<circle cx="${cx}" cy="${cy}" r="${r}" ${attrs}/>`
      if (v === 0) return ''
      if (v === 1) return slash
      if (v === 2) return backslash
      return `${circle}${slash}${backslash}`
    },
  },
]

export function symbolGridHtml(
  { a, b, c, d }: PatternState,
  currentSymbolSet: number,
  size = 40,
): string {
  const cellSize = size / 2
  const strokeWidth = Math.max(1.5, size * 0.045)
  const render = SYMBOL_SETS[currentSymbolSet].render
  const cells = [
    render(a, 0, 0, cellSize, strokeWidth),
    render(b, cellSize, 0, cellSize, strokeWidth),
    render(c, 0, cellSize, cellSize, strokeWidth),
    render(d, cellSize, cellSize, cellSize, strokeWidth),
  ].join('')
  return `<svg viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet" style="color:#e4e4e7">${cells}</svg>`
}

export function symbolNotation({ a, b, c, d }: PatternState): string {
  return [a, b, c, d].map((v) => v.toString(2).padStart(2, '0')).join(' ')
}

export function renderSymbolPreview(
  value: number,
  symbolSetIndex: number,
  size = 18,
  strokeWidth = 2,
): string {
  const render = SYMBOL_SETS[symbolSetIndex].render
  return `<svg viewBox="0 0 ${size} ${size}" width="18" height="18">${render(value, 0, 0, size, strokeWidth)}</svg>`
}
