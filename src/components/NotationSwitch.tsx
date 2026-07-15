import { NOTATION_STYLES } from '../lib/constants'
import type { NotationStyle } from '../lib/types'

interface NotationSwitchProps {
  notationStyle: NotationStyle
  monochrome: boolean
  emphasizeSingleBit: boolean
  onNotationChange: (value: NotationStyle) => void
  onMonochromeChange: (value: boolean) => void
  onEmphasizeSingleBitChange: (value: boolean) => void
}

export function NotationSwitch({
  notationStyle,
  monochrome,
  emphasizeSingleBit,
  onNotationChange,
  onMonochromeChange,
  onEmphasizeSingleBitChange,
}: NotationSwitchProps) {
  return (
    <div className="notation-switch">
      <span className="select-label">記法</span>
      <div className="radio-group" id="notationStyleRadio">
        {NOTATION_STYLES.map(({ value, label }) => (
          <span key={value}>
            <input
              type="radio"
              name="notationStyle"
              id={`notation-${value}`}
              value={value}
              checked={notationStyle === value}
              onChange={() => onNotationChange(value)}
            />
            <label htmlFor={`notation-${value}`}>{label}</label>
          </span>
        ))}
      </div>
      <label className="toggle">
        <input
          type="checkbox"
          checked={monochrome}
          onChange={(e) => onMonochromeChange(e.target.checked)}
        />
        <span>モノクロ</span>
      </label>
      <label className="toggle">
        <input
          type="checkbox"
          checked={emphasizeSingleBit}
          onChange={(e) => onEmphasizeSingleBitChange(e.target.checked)}
        />
        <span>1bit 枠強調</span>
      </label>
    </div>
  )
}
