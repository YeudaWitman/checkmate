import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore, colorFor } from '../store'

const CATEGORY_KEYS = ['food', 'drink', 'dessert', 'shared']

export default function ItemModal({ item: editItem, onClose }) {
  const { state, dispatch } = useStore()
  const { t } = useTranslation()
  const isEdit = !!editItem?.id

  const [name, setName] = useState(editItem?.name || '')
  const [price, setPrice] = useState(editItem?.price || '')
  const [qty, setQty] = useState(editItem?.quantity || 1)
  const [category, setCategory] = useState(editItem?.category || 'food')
  const [pids, setPids] = useState(editItem?.participantIds || [])
  const [notes, setNotes] = useState(editItem?.notes || '')

  function togglePid(id) {
    setPids(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function selectAll() {
    setPids(state.diners.map(d => d.id))
  }

  function save() {
    const trimName = name.trim()
    const parsedPrice = parseFloat(price)
    if (!trimName || isNaN(parsedPrice) || parsedPrice <= 0) return
    const itemData = { name: trimName, price: parsedPrice, quantity: +qty || 1, participantIds: pids, category, notes: notes.trim() }
    if (isEdit) {
      dispatch({ type: 'UPDATE_ITEM', item: { ...editItem, ...itemData } })
    } else {
      dispatch({ type: 'ADD_ITEM', item: itemData })
    }
    onClose()
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        zIndex: 100, padding: 0,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: 'var(--bg2)', borderRadius: '16px 16px 0 0',
          border: '1px solid var(--border2)', padding: 20,
          width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 500, flex: 1, margin: 0 }}>
            {isEdit ? t('modal.editItem') : t('modal.addItem')}
          </h2>
          <button className="btn-icon" onClick={onClose} aria-label={t('modal.closeLabel')}>
            <i className="ti ti-x" style={{ fontSize: 18 }}></i>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Name */}
          <div>
            <div className="lbl" style={{ marginBottom: 6 }}>{t('modal.itemName')}</div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder={t('modal.itemNamePlaceholder')} autoFocus />
          </div>

          {/* Price + Qty */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div className="lbl" style={{ marginBottom: 6 }}>{t('modal.price')}</div>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder={t('modal.pricePlaceholder')} min="0" step="0.01" />
            </div>
            <div>
              <div className="lbl" style={{ marginBottom: 6 }}>{t('modal.quantity')}</div>
              <input type="number" value={qty} onChange={e => setQty(e.target.value)} min="1" max="99" />
            </div>
          </div>

          {/* Category */}
          <div>
            <div className="lbl" style={{ marginBottom: 8 }}>{t('modal.category')}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {CATEGORY_KEYS.map(cat => (
                <button key={cat} className={`chip chip-${category === cat ? 'sel' : 'unsel'}`} onClick={() => setCategory(cat)}>
                  {t(`categories.${cat}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Assign to */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
              <div className="lbl" style={{ flex: 1, marginBottom: 0 }}>{t('modal.assignTo')}</div>
              <button
                className="btn-ghost"
                style={{ padding: '3px 10px', fontSize: 12, borderRadius: 6 }}
                onClick={selectAll}
              >
                {t('modal.allBtn')}
              </button>
              <button
                className="btn-ghost"
                style={{ padding: '3px 10px', fontSize: 12, borderRadius: 6 }}
                onClick={() => setPids([])}
              >
                {t('modal.noneBtn')}
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {state.diners.map((d, i) => (
                <button
                  key={d.id}
                  className={`chip chip-${pids.includes(d.id) ? 'sel' : 'unsel'}`}
                  onClick={() => togglePid(d.id)}
                >
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: colorFor(i), display: 'inline-block', flexShrink: 0,
                  }} />
                  {d.name}
                </button>
              ))}
            </div>
            {pids.length > 1 && (
              <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 6, marginBottom: 0 }}>
                {t('modal.perPerson', { amount: price > 0 ? ((parseFloat(price) || 0) * (parseInt(qty) || 1) / pids.length).toFixed(2) : '—' })}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <div className="lbl" style={{ marginBottom: 6 }}>{t('modal.notes')}</div>
            <input value={notes} onChange={e => setNotes(e.target.value)} placeholder={t('modal.notesPlaceholder')} />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <button className="btn-ghost" style={{ flex: 1 }} onClick={onClose}>{t('modal.cancelBtn')}</button>
          <button className="btn-gold" style={{ flex: 1 }} onClick={save}>
            {isEdit ? t('modal.saveChanges') : t('modal.addToOrder')}
          </button>
        </div>
      </div>
    </div>
  )
}
