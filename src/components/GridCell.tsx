import { popcount, stateFromIndex } from '../lib/state'
import {
  asterNotation,
  asterSvg,
  boxNotation,
  boxSvg,
  dotLineNotation,
  dotLineSvg,
  edgeNotation,
  glyphSvg,
  notationIsGlyph,
  pathNotation,
  pathSvg,
  pos16Notation,
  pos16Svg,
  styleNotation,
  symbolGridHtml,
  symbolNotation,
  triSplitNotation,
  triSplitSvg,
} from '../lib/renderers'
import type { AppState, Mode } from '../lib/types'

interface GridCellProps {
  index: number
  currentMode: Mode
  currentSymbolSet: number
  highlightDuplicates: boolean
  polygonVariant: AppState['polygonVariant']
  asterFillMode: AppState['asterFillMode']
  asterFillColor: AppState['asterFillColor']
  asterCross: boolean
  boxEdgeColor: AppState['boxEdgeColor']
  notationStyle: AppState['notationStyle']
  monochrome: boolean
  emphasizeSingleBit: boolean
  selectedIndex: number
  onSelect: (index: number) => void
}

export function GridCell(props: GridCellProps) {
  const state = stateFromIndex(props.index)
  let graphic: string
  let note: string

  switch (props.currentMode) {
    case 'edges':
      graphic = glyphSvg(state.a, state.b, state.c, state.d, 40)
      note = edgeNotation(state)
      break
    case 'symbols':
      graphic = symbolGridHtml(state, props.currentSymbolSet, 40)
      note = symbolNotation(state)
      break
    case 'path': {
      const { svg, separators } = pathSvg(
        state,
        40,
        props.highlightDuplicates,
        props.monochrome,
      )
      graphic = svg
      note = pathNotation(state, separators)
      break
    }
    case 'dotLine':
      graphic = dotLineSvg(props.index, 40, props.monochrome)
      note = dotLineNotation(props.index)
      break
    case 'aster': {
      const { svg } = asterSvg(props.index, 40, {
        fillMode: props.asterFillMode,
        fillColor: props.asterFillColor,
        cross: props.asterCross,
        monochrome: props.monochrome,
      })
      graphic = svg
      note = asterNotation(props.index)
      break
    }
    case 'box':
      graphic = boxSvg(props.index, 40, props.boxEdgeColor, props.monochrome)
      note = boxNotation(props.index)
      break
    case 'triSplit':
      graphic = triSplitSvg(props.index, 40, props.polygonVariant)
      note = triSplitNotation(props.index)
      break
    case 'pos16':
      graphic = pos16Svg(props.index, 40, props.monochrome)
      note = pos16Notation(props.index)
      break
    default:
      graphic = ''
      note = ''
  }

  const noteText = styleNotation(props.index, note, props.notationStyle)
  const isGlyph = notationIsGlyph(props.notationStyle)
  const isActive = props.selectedIndex === props.index
  const isBit1 = props.emphasizeSingleBit && popcount(props.index) === 1
  const className = ['cell', isActive ? 'active' : '', isBit1 ? 'bit1' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={className}
      id={`cell-${props.index}`}
      style={{
        gridColumn: (props.index % 16) + 3,
        gridRow: Math.floor(props.index / 16) + 3,
      }}
      onClick={() => props.onSelect(props.index)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
          <div class="idx">${props.index}</div>
          ${graphic}
          <div class="notation${isGlyph ? ' glyph' : ''}">${noteText}</div>
        `,
      }}
    />
  )
}
