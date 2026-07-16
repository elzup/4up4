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
  amidaRailMode: AppState['amidaRailMode']
  notationStyle: AppState['notationStyle']
  monochrome: boolean
  emphasizeSingleBit: boolean
  pos16ShowLine: boolean
  pos16ShowNeighborhood: boolean
  pos16ShowBoundary: boolean
  samplingPageBits: number[]
  samplingPage: number
  selectedIndex: number
  onSelect: (index: number) => void
  onSamplingPageChange: (page: number) => void
}

export function Grid(props: GridProps) {
  const allCells = Array.from({ length: 256 }, (_, i) => i)
  const pagingBits = props.samplingPageBits
  const pageCount = 1 << pagingBits.length
  const currentPage = props.samplingPage % pageCount
  const matchesPageBits = (index: number): boolean =>
    pagingBits.every((bit, order) => {
      const pageBitPosition = pagingBits.length - 1 - order
      const expected = (currentPage >> pageBitPosition) & 1
      return ((index >> bit) & 1) === expected
    })
  const cells = pagingBits.length
    ? allCells.filter(matchesPageBits)
    : allCells
  const useMatrixLayout = !pagingBits.length

  return (
    <section id="grid">
      {pagingBits.length > 0 && (
        <div className="grid-pager">
          <button
            type="button"
            onClick={() =>
              props.onSamplingPageChange((currentPage + pageCount - 1) % pageCount)
            }
          >
            前ページ
          </button>
          <span>
            {currentPage + 1} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => props.onSamplingPageChange((currentPage + 1) % pageCount)}
          >
            次ページ
          </button>
          <span className="grid-pager-note">
            {pagingBits.map((bit) => `bit${bit}`).join(', ')}
          </span>
        </div>
      )}

      <div className={useMatrixLayout ? 'grid' : 'grid-sampling'}>
        {useMatrixLayout && (
          <div
            className="grid-corner"
            style={{ gridColumn: '1 / span 2', gridRow: '1 / span 2' }}
          />
        )}

        {useMatrixLayout &&
          Array.from({ length: 4 }, (_, g) => (
            <div
              key={`top-group-${g}`}
              className="grid-header grid-header-group"
              style={{ gridColumn: `${3 + g * 4} / span 4`, gridRow: 1 }}
            >
              {fmt2bit(g)}
            </div>
          ))}

        {useMatrixLayout &&
          Array.from({ length: 16 }, (_, c) => (
            <div
              key={`top-cell-${c}`}
              className="grid-header"
              style={{ gridColumn: c + 3, gridRow: 2 }}
            >
              {fmt2bit(c & 3)}
            </div>
          ))}

        {useMatrixLayout &&
          Array.from({ length: 4 }, (_, g) => (
            <div
              key={`left-group-${g}`}
              className="grid-header grid-header-group"
              style={{ gridColumn: 1, gridRow: `${3 + g * 4} / span 4` }}
            >
              {fmt2bit(g)}
            </div>
          ))}

        {useMatrixLayout &&
          Array.from({ length: 16 }, (_, r) => (
            <div
              key={`left-cell-${r}`}
              className="grid-header"
              style={{ gridColumn: 2, gridRow: r + 3 }}
            >
              {fmt2bit(r & 3)}
            </div>
          ))}

        {cells.map((index) => (
          <GridCell key={index} index={index} {...props} useMatrixLayout={useMatrixLayout} />
        ))}
      </div>
    </section>
  )
}
