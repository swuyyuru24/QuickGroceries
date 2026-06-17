import { getProduct } from './catalog.js'

// Pricing rules live on the server so the client can't dictate what it pays.
// These mirror the constants the cart UI uses to preview the bill.
export const DELIVERY_FEE = 25
export const FREE_DELIVERY_OVER = 199
export const PAYMENT_METHODS = ['upi', 'card', 'cod']

// In-memory store. Swap for a real database later — the interface stays the same.
const orders = new Map()
let seq = 0

function orderId() {
  seq += 1
  return 'QG' + String(seq).padStart(6, '0')
}

/**
 * Validate an order request and price it from the authoritative catalog.
 * Returns { error } on bad input, or { order } on success.
 */
export function createOrder({ items, address, payment }) {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: 'Cart is empty.' }
  }

  const lines = []
  for (const item of items) {
    const product = getProduct(item?.id)
    const qty = Number(item?.qty)
    if (!product) return { error: `Unknown product: ${item?.id}` }
    if (!Number.isInteger(qty) || qty < 1) return { error: `Invalid quantity for product ${item?.id}` }
    lines.push({ product, qty })
  }

  const a = address ?? {}
  const phone = String(a.phone ?? '').trim()
  const pincode = String(a.pincode ?? '').trim()
  if (!String(a.name ?? '').trim()) return { error: 'Name is required.' }
  if (!/^\d{10}$/.test(phone)) return { error: 'Phone must be 10 digits.' }
  if (!String(a.line ?? '').trim()) return { error: 'Address is required.' }
  if (!/^\d{6}$/.test(pincode)) return { error: 'Pincode must be 6 digits.' }

  if (!PAYMENT_METHODS.includes(payment)) return { error: 'Invalid payment method.' }

  const itemTotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)
  const deliveryFee = itemTotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE
  const amount = itemTotal + deliveryFee

  const order = {
    id: orderId(),
    items: lines.map((l) => ({ id: l.product.id, name: l.product.name, qty: l.qty, price: l.product.price })),
    itemCount: lines.reduce((n, l) => n + l.qty, 0),
    itemTotal,
    deliveryFee,
    amount,
    payment,
    address: { name: a.name.trim(), phone, line: a.line.trim(), pincode },
    etaMinutes: 11,
    createdAt: new Date().toISOString(),
  }
  orders.set(order.id, order)
  return { order }
}

export const getOrder = (id) => orders.get(id)
