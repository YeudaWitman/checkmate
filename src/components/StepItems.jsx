import { useState } from 'react'
import { useStore, calcTotals } from '../store'
import ItemModal from './ItemModal'

export default function StepItems() {
  const { state, dispatch } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const tots = calcTotals(state)

  function openAdd() { setEditItem(null); setShowModal(true) }
  function openEdit(item) { setEditItem(item); setShowModal(true) }
  function closeModal() { setShowModal(false); setEditItem(null) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Summary bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Subtotal', value: `₪${tots.totalSub.toFixed(2)}`, gold: true },
          { label: 'Items', value: state.items.length },
          { label: 'Diners', value: state.diners.length },
        ].map(({ label, value, gold }) => (
          <div key={label} className="total-card" style={{ padding: '10px 12px' }}>
            <div className="lbl" style={{ marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 18, fontFamily: 'Playfair Display, serif', color: gold ? 'var(--gold)' : 'var(--text)' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Add item button */}
      <button className="btn-gold" style={{ width: '100%', padding: 12, fontSize: 15 }} onClick={openAdd}>
        <i className="ti ti-plus" style={{ marginRight: 6 }}></i>Add Item
      </button>

      {/* Items list */}
      {state.items.length > 0 ? (
        <>
          <div className="lbl">Order list</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {state.items.map(item => {
              const assignedNames = item.participantIds
                .map(id => state.diners.find(d => d.id === id)?.name)
                .filter(Boolean)
              const total = item.price * item.quantity

              return (
                <div key={item.id} className="card-inner" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 3 }}>
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{item.name}</span>
                      {item.category && <span className={`tag tag-${item.category}`}>{item.category}</span>}
                      {item.quantity > 1 && (
                        <span style={{ fontSize: 11, background: 'var(--bg4)', color: 'var(--text2)', padding: '1px 6px', borderRadius: 10 }}>
                          ×{item.quantity}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: assignedNames.length ? 'var(--text2)' : 'var(--text3)' }}>
                      {assignedNames.length ? assignedNames.join(', ') : 'Unassigned'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontWeight: 600, color: 'var(--gold)', fontSize: 14 }}>₪{total.toFixed(2)}</div>
                    {item.quantity > 1 && (
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>₪{item.price.toFixed(2)} each</div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                    <button className="btn-icon" onClick={() => openEdit(item)} title="Edit item" aria-label={`Edit ${item.name}`}>
                      <i className="ti ti-pencil"></i>
                    </button>
                    <button className="btn-icon" onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })} title="Remove item" aria-label={`Remove ${item.name}`}>
                      <i className="ti ti-x"></i>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text3)' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🍽️</div>
          <div style={{ fontSize: 15 }}>No items yet</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Tap "Add Item" to start the order</div>
        </div>
      )}

      {state.items.length > 0 && (
        <button
          className="btn-gold"
          style={{ width: '100%', padding: 12, fontSize: 15 }}
          onClick={() => dispatch({ type: 'SET_STEP', step: 2 })}
        >
          Continue to Tip & Extras <i className="ti ti-arrow-right" style={{ marginLeft: 4 }}></i>
        </button>
      )}

      {showModal && <ItemModal item={editItem} onClose={closeModal} />}
    </div>
  )
}
