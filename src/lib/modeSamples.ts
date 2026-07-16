import { DEFAULT_STATE } from './constants'
import { renderPattern, type PatternRenderOptions } from './renderPattern'
import type { Mode } from './types'

type ModeSamplePreset = Partial<Omit<PatternRenderOptions, 'currentMode'>>

export const MODE_SAMPLE_INDEX = 0b01100011

export const MODE_SAMPLE_PRESETS: Record<Mode, ModeSamplePreset[]> = {
  edges: [{}],
  symbols: [0, 1, 2, 3].map((currentSymbolSet) => ({ currentSymbolSet })),
  triSplit: [
    { polygonVariant: 'normal' },
    { polygonVariant: 'rhombus' },
  ],
  path: [{ highlightDuplicates: false }],
  dotLine: [{}],
  aster: [
    { asterFillMode: 'solid', asterFillColor: 'run', asterCross: true },
  ],
  box: [{ boxEdgeColor: 'angle' }],
  pos16: [
    {
      pos16ShowLine: true,
      pos16ShowNeighborhood: false,
      pos16ShowBoundary: true,
    },
  ],
  amida: [{ amidaRailMode: 'colored' }],
}

export function renderModeSamples(mode: Mode): string[] {
  return MODE_SAMPLE_PRESETS[mode].map(
    (preset) =>
      renderPattern(MODE_SAMPLE_INDEX, 32, {
        ...DEFAULT_STATE,
        ...preset,
        currentMode: mode,
      }).graphic,
  )
}
