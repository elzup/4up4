import { describe, expect, it } from 'vitest'
import { MODES } from './constants'
import {
  MODE_SAMPLE_INDEX,
  MODE_SAMPLE_PRESETS,
  renderModeSamples,
} from './modeSamples'

describe('mode samples', () => {
  it('uses 01-10-00-11 as the representative pattern', () => {
    expect(MODE_SAMPLE_INDEX).toBe(0b01100011)
  })

  it('registers an option preset for every mode', () => {
    expect(Object.keys(MODE_SAMPLE_PRESETS).sort()).toEqual([...MODES].sort())
    expect(MODE_SAMPLE_PRESETS.symbols.map((preset) => preset.currentSymbolSet))
      .toEqual([0, 1, 2, 3])
    expect(
      MODE_SAMPLE_PRESETS.triSplit.map((preset) => preset.polygonVariant),
    ).toEqual(['normal', 'rhombus'])
    expect(MODE_SAMPLE_PRESETS.pos16[0]).toMatchObject({ pos16ShowLine: true })
    expect(MODE_SAMPLE_PRESETS.amida[0]).toMatchObject({
      amidaRailMode: 'colored',
    })
  })

  it.each(MODES)('renders the %s mode sample', (mode) => {
    expect(renderModeSamples(mode).every((sample) => sample.includes('<svg')))
      .toBe(true)
  })
})
