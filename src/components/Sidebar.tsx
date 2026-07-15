import { OptionsPanel } from './OptionsPanel'
import { Preview } from './Preview'
import { Legend } from './Legend'
import type { AppState } from '../lib/types'

interface SidebarProps {
  state: AppState
  onUpdate: (update: Partial<AppState>) => void
}

export function Sidebar({ state, onUpdate }: SidebarProps) {
  return (
    <aside>
      <h2>選択中のパターン</h2>
      <Preview
        selectedIndex={state.selectedIndex}
        currentMode={state.currentMode}
        currentSymbolSet={state.currentSymbolSet}
        highlightDuplicates={state.highlightDuplicates}
        polygonVariant={state.polygonVariant}
        asterFillMode={state.asterFillMode}
        asterFillColor={state.asterFillColor}
        asterCross={state.asterCross}
        boxEdgeColor={state.boxEdgeColor}
        notationStyle={state.notationStyle}
        monochrome={state.monochrome}
      />
      <OptionsPanel
        currentMode={state.currentMode}
        currentSymbolSet={state.currentSymbolSet}
        highlightDuplicates={state.highlightDuplicates}
        polygonVariant={state.polygonVariant}
        asterFillMode={state.asterFillMode}
        asterFillColor={state.asterFillColor}
        asterCross={state.asterCross}
        boxEdgeColor={state.boxEdgeColor}
        onSymbolSetChange={(value) => onUpdate({ currentSymbolSet: value })}
        onHighlightDuplicatesChange={(value) =>
          onUpdate({ highlightDuplicates: value })
        }
        onPolygonVariantChange={(value) => onUpdate({ polygonVariant: value })}
        onAsterFillModeChange={(value) => onUpdate({ asterFillMode: value })}
        onAsterFillColorChange={(value) => onUpdate({ asterFillColor: value })}
        onAsterCrossChange={(value) => onUpdate({ asterCross: value })}
        onBoxEdgeColorChange={(value) => onUpdate({ boxEdgeColor: value })}
      />
      <Legend
        currentMode={state.currentMode}
        currentSymbolSet={state.currentSymbolSet}
      />
    </aside>
  )
}
