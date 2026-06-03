import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StoreProvider, useStore } from './store'
import StepTabs from './components/StepTabs'
import StepDiners from './components/StepDiners'
import StepItems from './components/StepItems'
import StepTip from './components/StepTip'
import StepResults from './components/StepResults'

function LangToggle() {
  const { t, i18n } = useTranslation()
  const isHe = i18n.language === 'he'

  function toggle() {
    const next = isHe ? 'en' : 'he'
    i18n.changeLanguage(next)
    document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = next
  }

  return (
    <button
      onClick={toggle}
      style={{
        position: 'absolute', top: 20, right: 16,
        background: 'var(--bg3)', border: '1px solid var(--border)',
        color: 'var(--text2)', borderRadius: 8,
        padding: '4px 10px', fontSize: 12, fontWeight: 600,
        cursor: 'pointer', letterSpacing: '0.5px',
      }}
    >
      {t('lang.toggle')}
    </button>
  )
}

function AppInner() {
  const { state } = useStore()
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 12px 80px', position: 'relative' }}>
        <LangToggle />
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
            <AppSubtitle />
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

function AppSubtitle() {
  const { t } = useTranslation()
  return <>{t('appSubtitle')}</>
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  )
}
