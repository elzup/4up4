import { MODE_LABELS } from '../lib/constants'
import type { Mode } from '../lib/types'

interface ModeSwitchProps {
  currentMode: Mode
  onChange: (mode: Mode) => void
}

export function ModeSwitch({ currentMode, onChange }: ModeSwitchProps) {
  return (
    <div className="mode-switch">
      <button
        type="button"
        className={currentMode === 'edges' ? 'active' : ''}
        onClick={() => onChange('edges')}
      >
        {MODE_LABELS.edges}
      </button>
      <span className="mode-separator" />
      <div className="mode-group">
        {(['symbols', 'triSplit', 'path'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            className={currentMode === mode ? 'active' : ''}
            onClick={() => onChange(mode)}
          >
            {MODE_LABELS[mode]}
          </button>
        ))}
      </div>
      <span className="mode-separator" />
      <button
        type="button"
        className={currentMode === 'dotLine' ? 'active' : ''}
        onClick={() => onChange('dotLine')}
      >
        {MODE_LABELS.dotLine}
      </button>
      <span className="mode-separator" />
      <button
        type="button"
        className={currentMode === 'aster' ? 'active' : ''}
        onClick={() => onChange('aster')}
      >
        {MODE_LABELS.aster}
      </button>
      <span className="mode-separator" />
      <button
        type="button"
        className={currentMode === 'box' ? 'active' : ''}
        onClick={() => onChange('box')}
      >
        {MODE_LABELS.box}
      </button>
      <span className="mode-separator" />
      <button
        type="button"
        className={currentMode === 'pos16' ? 'active' : ''}
        onClick={() => onChange('pos16')}
      >
        {MODE_LABELS.pos16}
      </button>
    </div>
  )
}
