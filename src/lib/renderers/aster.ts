import { ASTER_COLORS, ASTER_DIRECTIONS } from '../constants'
import type { AsterFillColor, AsterFillMode, AsterSvgResult } from '../types'

export function asterSvg(
  index: number,
  size = 40,
  options: {
    fillMode?: AsterFillMode
    fillColor?: AsterFillColor
    cross?: boolean
    monochrome?: boolean
  } = {},
): AsterSvgResult {
  const fillMode = options.fillMode ?? 'solid'
  const fillColor = options.fillColor ?? 'run'
  const cross = options.cross ?? true
  const monochrome = options.monochrome ?? false

  // 8方向の放射線。bit7=上、bit6=右上、...、bit0=左上（時計回り）
  const cx = size / 2
  const cy = size / 2
  const pad = size * 0.12
  const r = size / 2 - pad
  const lineWidth = Math.max(1.5, size * 0.05)

  const on = (i: number) => (index >> (7 - i)) & 1
  const pointAt = (i: number) => {
    const angle = -Math.PI / 2 + i * (Math.PI / 4)
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const
  }
  const runStart = (i: number) => {
    let s = i
    let guard = 0
    while (on((s - 1 + 8) % 8) && guard < 8) {
      s = (s - 1 + 8) % 8
      guard++
    }
    return s
  }

  const parts: string[] = []

  if (cross) {
    const guideWidth = Math.max(0.5, size * 0.012)
    parts.push(
      `<line x1="${cx}" y1="${pad}" x2="${cx}" y2="${size - pad}" stroke="#3f3f46" stroke-width="${guideWidth}"/>`,
    )
    parts.push(
      `<line x1="${pad}" y1="${cy}" x2="${size - pad}" y2="${cy}" stroke="#3f3f46" stroke-width="${guideWidth}"/>`,
    )
  }

  if (fillMode !== 'none') {
    const fillOpacity = fillMode === 'solid' ? '1' : '0.32'
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8
      if (on(i) && on(next)) {
        const colorIdx = fillColor === 'run' ? runStart(i) : i
        const fill = monochrome ? '#e4e4e7' : ASTER_COLORS[colorIdx]
        const [x1, y1] = pointAt(i)
        const [x2, y2] = pointAt(next)
        parts.push(
          `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z" fill="${fill}" fill-opacity="${fillOpacity}" stroke="none"/>`,
        )
      }
    }
  }

  for (let i = 0; i < 8; i++) {
    if (!on(i)) continue
    const coveredByFill =
      fillMode !== 'none' && (on((i + 7) % 8) || on((i + 1) % 8))
    if (coveredByFill) continue
    const spokeColor = monochrome ? '#e4e4e7' : ASTER_COLORS[i]
    const [x2, y2] = pointAt(i)
    parts.push(
      `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${spokeColor}" stroke-width="${lineWidth}" stroke-linecap="round"/>`,
    )
  }

  return {
    svg: `<svg viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet">${parts.join('')}</svg>`,
    directions: ASTER_DIRECTIONS.filter((_, i) => on(i)),
  }
}

export function asterNotation(index: number): string {
  const bits = index.toString(2).padStart(8, '0')
  return bits.match(/.{2}/g)?.join('-') ?? bits
}
