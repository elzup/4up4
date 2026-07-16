import { CORNER_NAMES } from '../lib/constants'
import type { AppState, Mode } from '../lib/types'
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
  pos16Detail,
  pos16Notation,
  pos16Svg,
  styleNotation,
  symbolGridHtml,
  symbolNotation,
  triSplitNotation,
  triSplitSvg,
} from '../lib/renderers'
import { stateFromIndex } from '../lib/state'

interface PreviewProps {
  selectedIndex: number
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
  pos16ShowLine: boolean
  pos16ShowNeighborhood: boolean
  pos16ShowBoundary: boolean
}

export function Preview(props: PreviewProps) {
  const state = stateFromIndex(props.selectedIndex)
  let graphic: string
  let note: string
  let label: string
  let detail: string

  switch (props.currentMode) {
    case 'edges':
      graphic = glyphSvg(state.a, state.b, state.c, state.d, 160)
      note = edgeNotation(state)
      label = '辺の状態'
      detail = `上${state.a} 右${state.b} 下${state.c} 左${state.d}`
      break
    case 'symbols':
      graphic = symbolGridHtml(state, props.currentSymbolSet, 160)
      note = symbolNotation(state)
      label = 'セル配置'
      detail = `左上${state.a} 右上${state.b} 左下${state.c} 右下${state.d}`
      break
    case 'path': {
      const { svg, separators } = pathSvg(
        state,
        160,
        props.highlightDuplicates,
        props.monochrome,
      )
      graphic = svg
      note = pathNotation(state, separators)
      label = '通過座標'
      detail = [state.a, state.b, state.c, state.d]
        .map((v) => CORNER_NAMES[v])
        .join(' → ')
      break
    }
    case 'dotLine':
      graphic = dotLineSvg(props.selectedIndex, 160, props.monochrome)
      note = dotLineNotation(props.selectedIndex)
      label = '構成'
      {
        const dotBits = (props.selectedIndex >> 4) & 0x0f
        const lineStart = (props.selectedIndex >> 2) & 3
        const lineEnd = props.selectedIndex & 3
        const dotNames = ['左上', '右上', '左下', '右下']
          .filter((_, idx) => (dotBits >> (3 - idx)) & 1)
          .join(' ') || 'なし'
        detail = `点:${dotNames} / 線:${CORNER_NAMES[lineStart]}→${CORNER_NAMES[lineEnd]}`
      }
      break
    case 'aster': {
      const { svg, directions } = asterSvg(props.selectedIndex, 160, {
        fillMode: props.asterFillMode,
        fillColor: props.asterFillColor,
        cross: props.asterCross,
        monochrome: props.monochrome,
      })
      graphic = svg
      note = asterNotation(props.selectedIndex)
      label = '放射方向'
      detail = directions.length ? directions.join(' ') : 'なし'
      break
    }
    case 'box':
      graphic = boxSvg(props.selectedIndex, 160, props.boxEdgeColor, props.monochrome)
      note = boxNotation(props.selectedIndex)
      label = '各マスの選択隅'
      {
        const armNames = ['上', '右', '下', '左']
        detail = armNames
          .map((n, k) => `${n}:${CORNER_NAMES[(props.selectedIndex >> (6 - k * 2)) & 3]}`)
          .join(' ')
      }
      break
    case 'triSplit':
      graphic = triSplitSvg(props.selectedIndex, 160, props.polygonVariant)
      note = triSplitNotation(props.selectedIndex)
      label = '象限の塗り状態'
      {
        const qs: string[] = []
        const qNames = ['左上', '右上', '左下', '右下']
        for (let q = 0; q < 4; q++) {
          const highBit = 7 - q * 2
          const lowBit = 6 - q * 2
          qs.push(
            `${qNames[q]}:${(props.selectedIndex >> highBit) & 1}${(props.selectedIndex >> lowBit) & 1}`,
          )
        }
        detail = qs.join(' ')
      }
      break
    case 'pos16':
      graphic = pos16Svg(props.selectedIndex, 160, {
        monochrome: props.monochrome,
        showLine: props.pos16ShowLine,
        showNeighborhood: props.pos16ShowNeighborhood,
        showBoundary: props.pos16ShowBoundary,
      })
      note = pos16Notation(props.selectedIndex)
      label = '4x4 位置→位置'
      detail = pos16Detail(props.selectedIndex)
      break
    default:
      graphic = ''
      note = ''
      label = ''
      detail = ''
  }

  const styledNote = styleNotation(props.selectedIndex, note, props.notationStyle)
  const isGlyph = notationIsGlyph(props.notationStyle)

  return (
    <>
      <div
        className="preview-box"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: graphic }}
      />
      <div className="info-row">
        <span className="label">10進数</span>
        <span>{props.selectedIndex}</span>
      </div>
      <div className="info-row">
        <span className="label">2進数</span>
        <span>{props.selectedIndex.toString(2).padStart(8, '0')}</span>
      </div>
      <div className="info-row">
        <span className="label">16進数</span>
        <span>
          {props.selectedIndex.toString(16).toUpperCase().padStart(2, '0')}
        </span>
      </div>
      <div className="info-row">
        <span className="label">記法</span>
        <span id="infoNote" className={isGlyph ? 'glyph' : ''}>
          {styledNote}
        </span>
      </div>
      <div className="info-row">
        <span className="label" id="infoLabel">
          {label}
        </span>
        <span id="infoDetail">{detail}</span>
      </div>
    </>
  )
}
