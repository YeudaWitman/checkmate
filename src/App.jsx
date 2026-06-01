import { StoreProvider, useStore } from './store'
import StepTabs from './components/StepTabs'
import StepDiners from './components/StepDiners'
import StepItems from './components/StepItems'
import StepTip from './components/StepTip'
import StepResults from './components/StepResults'

function AppInner() {
  const { state } = useStore()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 12px 80px' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', padding: '28px 0 22px' }}>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 28, fontWeight: 600,
            color: 'var(--gold)', letterSpacing: '-0.5px',
          }}>
            CheckMate
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 3 }}>
            Restaurant bill splitter
          </div>
        </header>

        <StepTabs />

        <main>
          {state.step === 0 && <StepDiners />}
          {state.step === 1 && <StepItems />}
          {state.step === 2 && <StepTip />}
          {state.step === 3 && <StepResults />}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  )
}
