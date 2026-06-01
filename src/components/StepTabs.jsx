import { useStore } from '../store'

const STEPS = ['Diners', 'Items', 'Tip & Extras', 'Results']

export default function StepTabs() {
  const { state, dispatch } = useStore()

  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', paddingBottom: 2 }}>
      {STEPS.map((s, i) => (
        <button
          key={i}
          className={`step-tab ${i === state.step ? 'step-active' : i < state.step ? 'step-done' : 'step-todo'}`}
          onClick={() => dispatch({ type: 'SET_STEP', step: i })}
        >
          {i < state.step ? '✓ ' : ''}{s}
        </button>
      ))}
    </div>
  )
}
