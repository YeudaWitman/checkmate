import { useTranslation } from 'react-i18next'
import { useStore, calcTotals } from '../store'

export default function StepTip() {
  const { state, dispatch } = useStore()
  const { t } = useTranslation()
  const tots = calcTotals(state)

  const TIP_TYPES = [
    { value: 'none', label: t('tip.noTip') },
    { value: 'pct', label: t('tip.percentage') },
    { value: 'fixed', label: t('tip.fixed') },
  ]

  const DIST_TYPES = [
    { value: 'proportional', label: t('tip.proportional') },
    { value: 'equal', label: t('tip.equalSplit') },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Service included toggle */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>{t('tip.serviceIncludedTitle')}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
              {t('tip.serviceIncludedDesc')}
            </div>
          </div>
          <Toggle
            value={state.serviceIncluded}
            onChange={v => dispatch({ type: 'SET_SERVICE_INCLUDED', value: v })}
          />
        </div>
      </div>

      {/* Tip card */}
      {!state.serviceIncluded && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontWeight: 500 }}>{t('tip.tipTitle')}</div>

          {/* Tip type chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {TIP_TYPES.map(({ value, label }) => (
              <button
                key={value}
                className={`chip chip-${state.tip.type === value ? 'sel' : 'unsel'}`}
                onClick={() => dispatch({ type: 'SET_TIP', tip: { type: value } })}
              >
                {label}
              </button>
            ))}
          </div>

          {state.tip.type !== 'none' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <div className="lbl" style={{ marginBottom: 6 }}>
                  {state.tip.type === 'pct' ? t('tip.percentageLabel') : t('tip.amountLabel')}
                </div>
                <input
                  type="number"
                  value={state.tip.value}
                  min="0"
                  step={state.tip.type === 'pct' ? '0.5' : '1'}
                  onChange={e => dispatch({ type: 'SET_TIP', tip: { value: e.target.value } })}
                />
              </div>
              <div>
                <div className="lbl" style={{ marginBottom: 6 }}>{t('tip.distribution')}</div>
                <select
                  value={state.tip.dist}
                  onChange={e => dispatch({ type: 'SET_TIP', tip: { dist: e.target.value } })}
                >
                  {DIST_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {state.tip.type === 'pct' && state.tip.value > 0 && tots.totalSub > 0 && (
            <div style={{ fontSize: 12, color: 'var(--text3)', background: 'var(--bg3)', padding: '8px 12px', borderRadius: 8 }}>
              {t('tip.tipPreview', { pct: state.tip.value, sub: tots.totalSub.toFixed(2), tip: tots.totalTip.toFixed(2) })}
            </div>
          )}
        </div>
      )}

      {/* Discount */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>{t('tip.discountTitle')}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
              {t('tip.discountDesc')}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--text3)', fontSize: 14 }}>₪</span>
            <input
              type="number"
              value={state.discount}
              min="0"
              onChange={e => dispatch({ type: 'SET_DISCOUNT', discount: e.target.value })}
              style={{ width: 90, textAlign: 'right' }}
            />
          </div>
        </div>
      </div>

      {/* Bill preview */}
      <div className="total-card">
        <div className="lbl" style={{ marginBottom: 10 }}>{t('tip.billPreview')}</div>
        <div className="summary-row">
          <span style={{ color: 'var(--text2)' }}>{t('tip.subtotalRow')}</span>
          <span>₪{tots.totalSub.toFixed(2)}</span>
        </div>
        {tots.totalTip > 0 && (
          <div className="summary-row">
            <span style={{ color: 'var(--text2)' }}>{t('tip.tipRow')}</span>
            <span style={{ color: 'var(--green)' }}>+₪{tots.totalTip.toFixed(2)}</span>
          </div>
        )}
        {tots.discount > 0 && (
          <div className="summary-row">
            <span style={{ color: 'var(--text2)' }}>{t('tip.discountRow')}</span>
            <span style={{ color: 'var(--red)' }}>−₪{tots.discount.toFixed(2)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, marginTop: 4, borderTop: '1px solid var(--border2)' }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>{t('tip.grandTotal')}</span>
          <span className="amount-big" style={{ fontSize: 22 }}>₪{tots.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="btn-gold"
        style={{ width: '100%', padding: 12, fontSize: 15 }}
        onClick={() => dispatch({ type: 'SET_STEP', step: 3 })}
      >
        {t('tip.seeResultsBtn')} <i className="ti ti-arrow-right" style={{ marginLeft: 4 }}></i>
      </button>
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
        background: value ? 'var(--gold)' : 'var(--bg4)',
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}
      role="switch"
      aria-checked={value}
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onChange(!value)}
    >
      <div style={{
        position: 'absolute', top: 3,
        left: value ? 21 : 3,
        width: 20, height: 20, borderRadius: '50%',
        background: 'white', transition: 'left 0.2s',
      }} />
    </div>
  )
}
