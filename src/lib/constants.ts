import type { AppState, Mode, PolygonVariant } from './types'

export const STORAGE_KEY = 'fupf-state'

export const MODES: Mode[] = [
  'edges',
  'symbols',
  'triSplit',
  'path',
  'dotLine',
  'aster',
  'box',
  'pos16',
]

export const MODE_LABELS: Record<Mode, string> = {
  edges: 'ボーダー',
  symbols: 'タイル',
  triSplit: 'ポリゴン',
  path: '4隅パス',
  dotLine: '丸点+線',
  aster: 'Aster',
  box: 'ダイス',
  pos16: '16² pos',
}

export const DEFAULT_STATE: AppState = {
  currentMode: 'edges',
  selectedIndex: 0,
  currentSymbolSet: 0,
  highlightDuplicates: false,
  polygonVariant: 'normal',
  asterFillMode: 'solid',
  asterFillColor: 'run',
  asterCross: true,
  boxEdgeColor: 'single',
  notationStyle: 'default',
  monochrome: false,
  emphasizeSingleBit: false,
}

// Aster 8方向の配色（上から時計回りの色相環）
export const ASTER_COLORS = [
  '#f87171',
  '#fb923c',
  '#facc15',
  '#a3e635',
  '#34d399',
  '#22d3ee',
  '#818cf8',
  '#e879f9',
]

export const ASTER_DIRECTIONS = [
  '上',
  '右上',
  '右',
  '右下',
  '下',
  '左下',
  '左',
  '左上',
]

// 座標: 00=左上, 01=右上, 10=左下, 11=右下
export const CORNERS: Record<number, [number, number]> = {
  0: [8, 8],
  1: [32, 8],
  2: [8, 32],
  3: [32, 32],
}

export const CORNER_NAMES: Record<number, string> = {
  0: '左上',
  1: '右上',
  2: '左下',
  3: '右下',
}

export const EDGE_STYLES: Record<
  number,
  { width: number; dash: string; wave: boolean }
> = {
  0: { width: 0, dash: '', wave: false },
  1: { width: 2, dash: '', wave: false },
  2: { width: 2, dash: '4 3', wave: false },
  3: { width: 2, dash: '', wave: true },
}

export const POLYGON_VARIANTS: PolygonVariant[] = [
  'normal',
  'rhombus',
  'inverse',
]

export const POLYGON_VARIANT_LABELS: Record<PolygonVariant, string> = {
  normal: '通常',
  rhombus: 'ひし形',
  inverse: '逆ひし形',
}

export const BOX_CELLS: Record<string, [number, number]> = {
  top: [0, 1],
  left: [1, 0],
  center: [1, 1],
  right: [1, 2],
  bottom: [2, 1],
}

export const BOX_ARM_ORDER = ['top', 'right', 'bottom', 'left'] as const

export const BOX_EDGE_COLORS: Array<{
  value: AppState['boxEdgeColor']
  label: string
}> = [
  { value: 'single', label: '単色' },
  { value: 'angle', label: '45°' },
  { value: 'xy', label: '位置(xy)' },
  { value: 'grad', label: 'グラデ' },
]

export const ASTER_FILL_MODES: Array<{
  value: AppState['asterFillMode']
  label: string
}> = [
  { value: 'none', label: 'なし' },
  { value: 'alpha', label: '半透明' },
  { value: 'solid', label: '不透明' },
]

export const ASTER_FILL_COLORS: Array<{
  value: AppState['asterFillColor']
  label: string
}> = [
  { value: 'segment', label: '区間ごと' },
  { value: 'run', label: '連続の始点色' },
]

export const NOTATION_STYLES: Array<{
  value: AppState['notationStyle']
  label: string
}> = [
  { value: 'default', label: 'モード既定' },
  { value: 'bin', label: '2進' },
  { value: 'bar', label: '_ |' },
  { value: 'dot', label: '· ●' },
]

export const SYMBOL_SET_LABELS = [
  '0 / \\ X',
  '点の大きさ',
  '— | +',
  'マルバツ',
] as const
