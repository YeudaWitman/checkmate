import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, colorFor, bgFor, initials } from '../store';

export default function StepDiners() {
  const { state, dispatch } = useStore();
  const { t } = useTranslation();
  const [name, setName] = useState('');

  function addDiner() {
    const trimmed = name.trim();
    if (!trimmed) return;
    dispatch({ type: 'ADD_DINER', name: trimmed });
    setName('');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="lbl">{t('diners.title')}</div>

      {/* Add diner form */}
      <div className="card">
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addDiner()}
            placeholder={t('diners.inputPlaceholder')}
            maxLength={30}
            autoFocus
            style={{ flex: 1 }}
          />
          <button className="btn-gold" onClick={addDiner} style={{ flexShrink: 0 }}>
            <i className="ti ti-plus" style={{ marginRight: 4 }}></i>{t('diners.addBtn')}
          </button>
        </div>
      </div>

      {/* Diner list */}
      {state.diners.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {state.diners.map((d, i) => (
            <div key={d.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px' }}>
              <div className="avatar" style={{ background: bgFor(i), color: colorFor(i) }}>
                {initials(d.name)}
              </div>
              <span style={{ flex: 1, fontWeight: 500 }}>{d.name}</span>
              <button
                className="btn-icon"
                onClick={() => dispatch({ type: 'REMOVE_DINER', id: d.id })}
                title={t('diners.removeLabel', { name: d.name })}
                aria-label={t('diners.removeLabel', { name: d.name })}
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Quick-add suggestions */}
      {state.diners.length === 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <div className="lbl" style={{ width: '100%', marginBottom: 2 }}>{t('diners.quickAdd')}</div>
          {['David', 'Maya', 'Ron', 'Yael', 'Noa', 'Avi'].map(n => (
            <button
              key={n}
              className="chip chip-unsel"
              onClick={() => dispatch({ type: 'ADD_DINER', name: n })}
            >
              + {n}
            </button>
          ))}
        </div>
      )}

      {state.diners.length >= 2 ? (
        <button
          className="btn-gold"
          style={{ width: '100%', padding: '12px', fontSize: 15 }}
          onClick={() => dispatch({ type: 'SET_STEP', step: 1 })}
        >
          {t('diners.continueBtn')} <i className="ti ti-arrow-right" style={{ marginLeft: 4 }}></i>
        </button>
      ) : (
        <p style={{ textAlign: 'center', color: 'var(--text3)', fontSize: 13, margin: 0 }}>
          {t('diners.minDinersHint')}
        </p>
      )}
    </div>
  );
}
