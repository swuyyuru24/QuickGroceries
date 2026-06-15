import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'quickgroceries.cart'

function loadInitial() {
  if (typeof localStorage === 'undefined') return {}
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const qty = (state[action.product.id]?.qty ?? 0) + 1
      return { ...state, [action.product.id]: { product: action.product, qty } }
    }
    case 'REMOVE': {
      const current = state[action.id]
      if (!current) return state
      if (current.qty <= 1) {
        const next = { ...state }
        delete next[action.id]
        return next
      }
      return { ...state, [action.id]: { ...current, qty: current.qty - 1 } }
    }
    case 'CLEAR':
      return {}
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable (private mode / quota) — cart stays in-memory
    }
  }, [items])

  const value = useMemo(() => {
    const lines = Object.values(items)
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const total = lines.reduce((sum, l) => sum + l.qty * l.product.price, 0)
    return {
      items,
      lines,
      count,
      total,
      qtyOf: (id) => items[id]?.qty ?? 0,
      add: (product) => dispatch({ type: 'ADD', product }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
