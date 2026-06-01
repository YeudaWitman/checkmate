import { createContext, useContext, useReducer } from 'react'

const COLORS = ['#C9974A','#5A9DE0','#4CAF78','#E05A5A','#C87AE8','#E87A4A','#4ACAC9','#E0C05A']
const BG_COLORS = ['#2A1F0A','#0A1F2A','#0A2A14','#2A0A0A','#1F0A2A','#2A180A','#0A2A2A','#2A200A']

export const colorFor = i => COLORS[i % COLORS.length]
export const bgFor = i => BG_COLORS[i % BG_COLORS.length]
export const initials = name => name.trim().split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2)
export const fmt = n => '₪' + (+n).toFixed(2)
export const fmt2 = n => '₪' + parseFloat((+n).toFixed(2)).toLocaleString()

const initialState = {
  step: 0,
  diners: [],
  items: [],
  tip: { type: 'pct', value: 10, dist: 'proportional' },
  discount: 0,
  serviceIncluded: false,
  nextDinerId: 1,
  nextItemId: 1,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step }

    case 'ADD_DINER':
      return {
        ...state,
        diners: [...state.diners, { id: state.nextDinerId, name: action.name }],
        nextDinerId: state.nextDinerId + 1,
      }

    case 'REMOVE_DINER':
      return {
        ...state,
        diners: state.diners.filter(d => d.id !== action.id),
        items: state.items.map(it => ({
          ...it,
          participantIds: it.participantIds.filter(p => p !== action.id),
        })),
      }

    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, { ...action.item, id: state.nextItemId }],
        nextItemId: state.nextItemId + 1,
      }

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(it => it.id === action.item.id ? action.item : it),
      }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(it => it.id !== action.id) }

    case 'SET_TIP':
      return { ...state, tip: { ...state.tip, ...action.tip } }

    case 'SET_DISCOUNT':
      return { ...state, discount: action.discount }

    case 'SET_SERVICE_INCLUDED':
      return { ...state, serviceIncluded: action.value }

    case 'RESET':
      return { ...initialState }

    default:
      return state
  }
}

export function calcTotals(state) {
  const { diners, items, tip, discount, serviceIncluded } = state
  const subs = {}
  diners.forEach(d => (subs[d.id] = 0))

  items.forEach(item => {
    const ids = item.participantIds
    if (!ids.length) return
    const share = (item.price * item.quantity) / ids.length
    ids.forEach(id => { if (subs[id] !== undefined) subs[id] += share })
  })

  const totalSub = Object.values(subs).reduce((a, b) => a + b, 0)

  let totalTip = 0
  if (!serviceIncluded) {
    if (tip.type === 'pct') totalTip = totalSub * tip.value / 100
    else if (tip.type === 'fixed') totalTip = +tip.value
  }

  const tipShare = {}
  diners.forEach(d => {
    if (tip.dist === 'equal') {
      tipShare[d.id] = diners.length ? totalTip / diners.length : 0
    } else {
      tipShare[d.id] = totalSub > 0 ? (subs[d.id] / totalSub) * totalTip : 0
    }
  })

  const discountAmt = +discount || 0
  const discShare = {}
  diners.forEach(d => {
    discShare[d.id] = totalSub > 0 ? (subs[d.id] / totalSub) * discountAmt : 0
  })

  const finals = {}
  diners.forEach(d => {
    finals[d.id] = subs[d.id] + tipShare[d.id] - discShare[d.id]
  })

  const grandTotal = totalSub + totalTip - discountAmt

  return { subs, tipShare, discShare, finals, totalSub, totalTip, discount: discountAmt, grandTotal }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}
