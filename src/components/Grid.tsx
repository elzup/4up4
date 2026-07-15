import { fmt2bit } from '../lib/state'
import { GridCell } from './GridCell'
import type { AppState, Mode } from '../lib/types'

interface GridProps {
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

export function Grid(props: GridProps) {
  const cells = Array.from({ length: 256 }, (_, i) => i)

  return (
    <section className="grid" id="grid">
      <div
        className="grid-corner"
        style={{ gridColumn: '1 / span 2', gridRow: '1 / span 2' }}
      />

      {Array.from({ length: 4 }, (_, g) => (
        <div
          key={`top-group-${g}`}
          className="grid-header grid-header-group"
          style={{ gridColumn: `${3 + g * 4} / span 4`, gridRow: 1 }}
        >
          {fmt2bit(g)}
        </div>
      ))}

      {Array.from({ length: 16 }, (_, c) => (
        <div
          key={`top-cell-${c}`}
          className="grid-header"
          style={{ gridColumn: c + 3, gridRow: 2 }}
        >
          {fmt2bit(c & 3)}
        </div>
      ))}

      {Array.from({ length: 4 }, (_, g) => (
        <div
          key={`left-group-${g}`}
          className="grid-header grid-header-group"
          style={{ gridColumn: 1, gridRow: `${3 + g * 4} / span 4` }}
        >
          {fmt2bit(g)}
        </div>
      ))}

      {Array.from({ length: 16 }, (_, r) => (
        <div
          key={`left-cell-${r}`}
          className="grid-header"
          style={{ gridColumn: 2, gridRow: r + 3 }}
        >
          {fmt2bit(r & 3)}
        </div>
      ))}

      {cells.map((index) => (
        <GridCell key={index} index={index} {...props} />
      ))}
    </section>
  )
}
