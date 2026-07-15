import { describe, expect, it } from 'vitest'
import { renderSymbolPreview, symbolGridHtml, symbolNotation } from './symbols'

describe('symbolGridHtml', () => {
  it('returns svg string with 4 cells', () => {
    const svg = symbolGridHtml({ a: 0, b: 1, c: 2, d: 3 }, 0, 40)
    expect(svg).toContain('<svg')
    expect(svg.match(/<svg/g)?.length).toBe(1)
  })

  it('renders different symbol sets', () => {
    const set0 = symbolGridHtml({ a: 3, b: 0, c: 0, d: 0 }, 0, 40)
    const set1 = symbolGridHtml({ a: 3, b: 0, c: 0, d: 0 }, 1, 40)
    const set2 = symbolGridHtml({ a: 3, b: 0, c: 0, d: 0 }, 2, 40)
    const set3 = symbolGridHtml({ a: 3, b: 0, c: 0, d: 0 }, 3, 40)
    expect(set0).not.toBe(set1)
    expect(set1).not.toBe(set2)
    expect(set2).not.toBe(set3)
  })

  it('renders all symbol values for each set', () => {
    for (let set = 0; set < 4; set++) {
      for (let v = 0; v < 4; v++) {
        const svg = symbolGridHtml({ a: v, b: v, c: v, d: v }, set, 40)
        expect(svg).toContain('<svg')
      }
    }
  })
})

describe('symbolNotation', () => {
  it('formats state as space-separated 2-bit groups', () => {
    expect(symbolNotation({ a: 0, b: 1, c: 2, d: 3 })).toBe('00 01 10 11')
  })
})

describe('renderSymbolPreview', () => {
  it('returns svg for preview', () => {
    const svg = renderSymbolPreview(1, 0)
    expect(svg).toContain('<svg')
    expect(svg).toContain('width="18"')
  })

  it('renders all symbol values for preview', () => {
    for (let set = 0; set < 4; set++) {
      for (let v = 0; v < 4; v++) {
        const svg = renderSymbolPreview(v, set)
        expect(svg).toContain('<svg')
      }
    }
  })
})
