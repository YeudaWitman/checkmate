import { useTranslation } from 'react-i18next'
import { useStore } from '../store'

const STEP_KEYS = ['Diners', 'Items', 'Tip & Extras', 'Results']

export default function StepTabs() {
  const { state, dispatch } = useStore()
  const { t } = useTranslation()

  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', paddingBottom: 2 }}>
      {STEP_KEYS.map((key, i) => (
        <button
          key={i}
          className={`step-tab ${i === state.step ? 'step-active' : i < state.step ? 'step-done' : 'step-todo'}`}
          onClick={() => dispatch({ type: 'SET_STEP', step: i })}
        >
          {i < state.step ? '✓ ' : ''}{t(`tabs.${key}`)}
        </button>
      ))}
    </div>
  )
}
