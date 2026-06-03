import { useTranslation } from 'react-i18next'
import { useStore, calcTotals, colorFor, bgFor, initials } from '../store'

export default function StepResults() {
  const { state, dispatch } = useStore()
  const { t } = useTranslation()
  const tots = calcTotals(state)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Hero total */}
      <div className="total-card" style={{ textAlign: 'center', padding: '24px 16px' }}>
        <div className="lbl" style={{ marginBottom: 6 }}>{t('results.totalBill')}</div>
        <div className="amount-big" style={{ fontSize: 38, display: 'block', marginBottom: 6 }}>
          ₪{tots.grandTotal.toFixed(2)}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>
          {tots.totalTip > 0
            ? t('results.dinersItemsTip', { diners: state.diners.length, items: state.items.length, tip: tots.totalTip.toFixed(2) })
            : t('results.dinersItems', { diners: state.diners.length, items: state.items.length })
          }
        </div>
      </div>

      {/* Per-diner breakdown */}
      <div className="lbl">{t('results.whoOwes')}</div>

      {state.diners.map((d, i) => {
        const sub = tots.subs[d.id] || 0
        const tip = tots.tipShare[d.id] || 0
        const disc = tots.discShare[d.id] || 0
        const final = tots.finals[d.id] || 0
        const pct = tots.grandTotal > 0 ? (final / tots.grandTotal) * 100 : 0
        const dinerItems = state.items.filter(it => it.participantIds.includes(d.id))

        return (
          <div key={d.id} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 14, padding: 16 }}>
            {/* Diner header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div className="avatar" style={{ background: bgFor(i), color: colorFor(i) }}>
                {initials(d.name)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{d.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                  {t('results.itemCount', { count: dinerItems.length })}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="amount-med" style={{ color: 'var(--gold)', fontSize: 20 }}>
                  ₪{final.toFixed(2)}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t('results.pctOfBill', { pct: pct.toFixed(1) })}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="progress-bar" style={{ marginBottom: 12 }}>
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>

            {/* Item breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {dinerItems.map(it => {
                const share = (it.price * it.quantity) / it.participantIds.length
                const isShared = it.participantIds.length > 1
                return (
                  <div key={it.id} style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                    <span style={{ flex: 1, color: 'var(--text2)' }}>
                      {it.name}{it.quantity > 1 ? ` ×${it.quantity}` : ''}
                      {isShared && (
                        <span style={{ color: 'var(--text3)', fontSize: 11, marginLeft: 4 }}>
                          {t('results.sharedSplit', { count: it.participantIds.length })}
                        </span>
                      )}
                    </span>
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>₪{share.toFixed(2)}</span>
                  </div>
                )
              })}

              {tip > 0.005 && (
                <>
                  <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
                  <div style={{ display: 'flex', fontSize: 13 }}>
                    <span style={{ flex: 1, color: 'var(--text3)' }}>{t('results.tipRow')}</span>
                    <span style={{ color: 'var(--green)' }}>+₪{tip.toFixed(2)}</span>
                  </div>
                </>
              )}
              {disc > 0.005 && (
                <div style={{ display: 'flex', fontSize: 13 }}>
                  <span style={{ flex: 1, color: 'var(--text3)' }}>{t('results.discountRow')}</span>
                  <span style={{ color: 'var(--red)' }}>−₪{disc.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* Full bill summary */}
      <div className="card">
        <div style={{ fontWeight: 500, marginBottom: 12, fontFamily: 'Playfair Display, serif', fontSize: 16 }}>
          {t('results.fullSummary')}
        </div>
        {state.items.map(it => {
          const names = it.participantIds
            .map(id => state.diners.find(d => d.id === id)?.name)
            .filter(Boolean)
            .join(', ')
          return (
            <div key={it.id} className="summary-row" style={{ fontSize: 13 }}>
              <span style={{ color: 'var(--text2)', flexShrink: 0 }}>
                {it.name}{it.quantity > 1 ? ` ×${it.quantity}` : ''}
              </span>
              <span style={{ flex: 1, color: 'var(--text3)', fontSize: 11, margin: '0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right' }}>
                {names || t('results.unassigned')}
              </span>
              <span style={{ fontWeight: 500, flexShrink: 0 }}>₪{(it.price * it.quantity).toFixed(2)}</span>
            </div>
          )
        })}
        <div style={{ height: 1, background: 'var(--border2)', margin: '8px 0' }} />
        <div className="summary-row">
          <span style={{ color: 'var(--text2)' }}>{t('results.subtotal')}</span>
          <span>₪{tots.totalSub.toFixed(2)}</span>
        </div>
        {tots.totalTip > 0 && (
          <div className="summary-row">
            <span style={{ color: 'var(--text2)' }}>{t('results.tipRow')}</span>
            <span style={{ color: 'var(--green)' }}>+₪{tots.totalTip.toFixed(2)}</span>
          </div>
        )}
        {tots.discount > 0 && (
          <div className="summary-row">
            <span style={{ color: 'var(--text2)' }}>{t('results.discountRow')}</span>
            <span style={{ color: 'var(--red)' }}>−₪{tots.discount.toFixed(2)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, marginTop: 4, borderTop: '1px solid var(--border2)' }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>{t('results.grandTotal')}</span>
          <span className="amount-big" style={{ fontSize: 22 }}>₪{tots.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Start over */}
      <button
        className="btn-ghost"
        style={{ width: '100%', padding: 12, fontSize: 14 }}
        onClick={() => dispatch({ type: 'RESET' })}
      >
        <i className="ti ti-refresh" style={{ marginRight: 6 }}></i>{t('results.startNew')}
      </button>
    </div>
  )
}
