import {
  asterNotation,
  asterSvg,
  boxNotation,
  boxSvg,
  dotLineNotation,
  dotLineSvg,
  edgeNotation,
  glyphSvg,
  pathNotation,
  pathSvg,
  pos16Notation,
  pos16Svg,
  symbolGridHtml,
  symbolNotation,
  triSplitNotation,
  triSplitSvg,
} from './renderers'
import { stateFromIndex } from './state'
import type { AppState, Mode } from './types'

export type PatternRenderOptions = Pick<
  AppState,
  | 'currentMode'
  | 'currentSymbolSet'
  | 'highlightDuplicates'
  | 'polygonVariant'
  | 'asterFillMode'
  | 'asterFillColor'
  | 'asterCross'
  | 'boxEdgeColor'
  | 'monochrome'
  | 'pos16ShowLine'
  | 'pos16ShowNeighborhood'
  | 'pos16ShowBoundary'
>

interface RenderedPattern {
  graphic: string
  note: string
}

function renderPath(
  index: number,
  size: number,
  options: PatternRenderOptions,
): RenderedPattern {
  const state = stateFromIndex(index)
  const { svg, separators } = pathSvg(
    state,
    size,
    options.highlightDuplicates,
    options.monochrome,
  )
  return { graphic: svg, note: pathNotation(state, separators) }
}

function renderAster(
  index: number,
  size: number,
  options: PatternRenderOptions,
): RenderedPattern {
  const { svg } = asterSvg(index, size, {
    fillMode: options.asterFillMode,
    fillColor: options.asterFillColor,
    cross: options.asterCross,
    monochrome: options.monochrome,
  })
  return { graphic: svg, note: asterNotation(index) }
}

function renderPos16(
  index: number,
  size: number,
  options: PatternRenderOptions,
): RenderedPattern {
  const graphic = pos16Svg(index, size, {
    monochrome: options.monochrome,
    showLine: options.pos16ShowLine,
    showNeighborhood: options.pos16ShowNeighborhood,
    showBoundary: options.pos16ShowBoundary,
  })
  return { graphic, note: pos16Notation(index) }
}

export function renderPattern(
  index: number,
  size: number,
  options: PatternRenderOptions,
): RenderedPattern {
  const state = stateFromIndex(index)
  const mode: Mode = options.currentMode

  switch (mode) {
    case 'edges':
      return {
        graphic: glyphSvg(state.a, state.b, state.c, state.d, size),
        note: edgeNotation(state),
      }
    case 'symbols':
      return {
        graphic: symbolGridHtml(state, options.currentSymbolSet, size),
        note: symbolNotation(state),
      }
    case 'triSplit':
      return {
        graphic: triSplitSvg(index, size, options.polygonVariant),
        note: triSplitNotation(index),
      }
    case 'path':
      return renderPath(index, size, options)
    case 'dotLine':
      return {
        graphic: dotLineSvg(index, size, options.monochrome),
        note: dotLineNotation(index),
      }
    case 'aster':
      return renderAster(index, size, options)
    case 'box':
      return {
        graphic: boxSvg(index, size, options.boxEdgeColor, options.monochrome),
        note: boxNotation(index),
      }
    case 'pos16':
      return renderPos16(index, size, options)
  }
}
