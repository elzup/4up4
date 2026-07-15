import { describe, expect, it } from 'vitest'
import { pos16Detail, pos16Notation, pos16Svg } from './pos16'

describe('pos16Svg', () => {
  it('returns svg string', () => {
    const svg = pos16Svg(0, 40)
    expect(svg).toContain('<svg')
    expect(svg).toContain('</svg>')
  })

  it('renders background blocks for 16 positions', () => {
    const svg = pos16Svg(0, 40)
    expect(svg.match(/<rect/g)?.length).toBeGreaterThanOrEqual(16)
  })

  it('renders dot markers for 16 positions', () => {
    const svg = pos16Svg(0b00010010, 40)
    expect(svg.match(/<circle/g)?.length).toBeGreaterThanOrEqual(10)
  })

  it('renders directed line with arrow', () => {
    const svg = pos16Svg(0b00010010, 40)
    expect(svg).toContain('<line')
    expect(svg).toContain('<polygon')
  })

  it('renders loop marker when start equals end', () => {
    const svg = pos16Svg(0b00000000, 40)
    expect(svg).not.toContain('<line')
    expect(svg).toContain('stroke-dasharray')
  })

  it('uses monochrome palette when enabled', () => {
    const svg = pos16Svg(0b00010010, 40, true)
    expect(svg).toContain('#e4e4e7')
    expect(svg).not.toContain('#22d3ee')
  })

  it('renders distinguishable start and end markers', () => {
    const svg = pos16Svg(0b00010010, 40)
    // 開始位置は円リング、終了位置は塗り潰し円
    expect(svg).toContain('fill="none"')
    expect(svg).toContain('fill="#22d3ee"')
  })

  it('highlights 3x3 neighborhood around start and end', () => {
    // start=5(中央付近), end=10(中央付近) で両方の近傍が複数マスに広がる
    const svg = pos16Svg(0b01011010, 40)
    // 明暗を強調: ベース・近傍・重畳の3色が使われる
    expect(svg).toContain('#18181b')
    expect(svg).toContain('#52525b')
    expect(svg).toContain('#a1a1aa')
  })
})

describe('pos16Notation', () => {
  it('formats start and end as 4-bit groups', () => {
    expect(pos16Notation(0b00000000)).toBe('0000-0000')
    expect(pos16Notation(0b11111111)).toBe('1111-1111')
    expect(pos16Notation(0b00010010)).toBe('0001-0010')
  })
})

describe('pos16Detail', () => {
  it('returns start→end detail', () => {
    expect(pos16Detail(0b00010010)).toBe('1→2')
    expect(pos16Detail(0b11111111)).toBe('15→15')
  })
})
