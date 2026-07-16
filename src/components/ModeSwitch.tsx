import { MODE_LABELS } from '../lib/constants'
import { MODE_SAMPLE_INDEX, renderModeSamples } from '../lib/modeSamples'
import type { Mode } from '../lib/types'

interface ModeSwitchProps {
  currentMode: Mode
  onChange: (mode: Mode) => void
}

interface ModeButtonProps extends ModeSwitchProps {
  mode: Mode
}

function ModeButton({ mode, currentMode, onChange }: ModeButtonProps) {
  const samples = renderModeSamples(mode)

  return (
    <button
      type="button"
      className={currentMode === mode ? 'active' : ''}
      onClick={() => onChange(mode)}
    >
      <span
        className="mode-samples"
        data-sample-count={samples.length}
        aria-hidden="true"
      >
        {samples.map((graphic, index) => (
          <span
            key={index}
            className="mode-sample"
            data-mode={mode}
            data-pattern-index={MODE_SAMPLE_INDEX}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: graphic }}
          />
        ))}
      </span>
      <span>{MODE_LABELS[mode]}</span>
    </button>
  )
}

export function ModeSwitch({ currentMode, onChange }: ModeSwitchProps) {
  return (
    <div className="mode-switch">
      <ModeButton mode="edges" currentMode={currentMode} onChange={onChange} />
      <span className="mode-separator" />
      <div className="mode-group">
        {(['symbols', 'triSplit', 'path'] as const).map((mode) => (
          <ModeButton
            key={mode}
            mode={mode}
            currentMode={currentMode}
            onChange={onChange}
          />
        ))}
      </div>
      <span className="mode-separator" />
      <ModeButton mode="dotLine" currentMode={currentMode} onChange={onChange} />
      <span className="mode-separator" />
      <ModeButton mode="aster" currentMode={currentMode} onChange={onChange} />
      <span className="mode-separator" />
      <ModeButton mode="box" currentMode={currentMode} onChange={onChange} />
      <span className="mode-separator" />
      <ModeButton mode="pos16" currentMode={currentMode} onChange={onChange} />
      <span className="mode-separator" />
      <ModeButton mode="amida" currentMode={currentMode} onChange={onChange} />
    </div>
  )
}
