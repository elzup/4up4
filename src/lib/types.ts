export type Mode =
  | 'edges'
  | 'symbols'
  | 'triSplit'
  | 'path'
  | 'dotLine'
  | 'aster'
  | 'box'
  | 'pos16'

export type PolygonVariant = 'normal' | 'rhombus' | 'inverse'
export type AsterFillMode = 'none' | 'alpha' | 'solid'
export type AsterFillColor = 'segment' | 'run'
export type BoxEdgeColor = 'single' | 'angle' | 'xy' | 'grad'
export type NotationStyle = 'default' | 'bin' | 'hex' | 'bar' | 'dot'

export interface PatternState {
  a: number
  b: number
  c: number
  d: number
}

export interface AppState {
  currentMode: Mode
  selectedIndex: number
  samplingPageBits: number[]
  samplingPage: number
  currentSymbolSet: number
  highlightDuplicates: boolean
  polygonVariant: PolygonVariant
  asterFillMode: AsterFillMode
  asterFillColor: AsterFillColor
  asterCross: boolean
  boxEdgeColor: BoxEdgeColor
  notationStyle: NotationStyle
  monochrome: boolean
  emphasizeSingleBit: boolean
  pos16OptionsVersion: number
  pos16ShowLine: boolean
  pos16ShowNeighborhood: boolean
  pos16ShowBoundary: boolean
}

export interface SvgResult {
  svg: string
}

export interface PathSvgResult extends SvgResult {
  separators: string[]
}

export interface AsterSvgResult extends SvgResult {
  directions: string[]
}
