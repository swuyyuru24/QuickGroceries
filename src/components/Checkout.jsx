import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { placeOrder as submitOrder } from '../api'

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: '📱', hint: 'GPay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', hint: 'Visa, Mastercard, RuPay' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', hint: 'Pay when it arrives' },
]

export default function Checkout({ open, amount, onClose }) {
  const { lines, clear } = useCart()
  const [step, setStep] = useState('address') // address | payment | done
  const [address, setAddress] = useState({ name: '', phone: '', line: '', pincode: '' })
  const [payment, setPayment] = useState('upi')
  const [order, setOrder] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Close on Escape (except the success screen) and lock the page behind the modal.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape' && step !== 'done') reset()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, step])

  if (!open) return null

  const addressValid =
    address.name.trim() &&
    /^\d{10}$/.test(address.phone.trim()) &&
    address.line.trim() &&
    /^\d{6}$/.test(address.pincode.trim())

  function reset() {
    setStep('address')
    setOrder(null)
    setError(null)
    onClose()
  }

  async function placeOrder() {
    setSubmitting(true)
    setError(null)
    try {
      const placed = await submitOrder({
        items: lines.map((l) => ({ id: l.product.id, qty: l.qty })),
        address,
        payment,
      })
      setOrder(placed)
      clear()
      setStep('done')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="checkout-overlay" onClick={step === 'done' ? undefined : reset}>
      <div className="checkout-modal" role="dialog" aria-modal="true" aria-label="Checkout" onClick={(e) => e.stopPropagation()}>
        {step !== 'done' && (
          <div className="checkout-header">
            <h2>{step === 'address' ? 'Delivery address' : 'Payment'}</h2>
            <button className="close-btn" onClick={reset} aria-label="Close checkout">✕</button>
          </div>
        )}

        {step === 'address' && (
          <div className="checkout-body">
            <label className="field">
              <span>Full name</span>
              <input
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                placeholder="Sam Wuyyuru"
              />
            </label>
            <label className="field">
              <span>Phone (10 digits)</span>
              <input
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                placeholder="9876543210"
                inputMode="numeric"
              />
            </label>
            <label className="field">
              <span>Address</span>
              <input
                value={address.line}
                onChange={(e) => setAddress({ ...address, line: e.target.value })}
                placeholder="Flat 4B, Koramangala 5th Block"
              />
            </label>
            <label className="field">
              <span>Pincode (6 digits)</span>
              <input
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                placeholder="560095"
                inputMode="numeric"
              />
            </label>

            <button className="checkout-btn full" disabled={!addressValid} onClick={() => setStep('payment')}>
              Continue to payment
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div className="checkout-body">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                className={`pay-option ${payment === m.id ? 'active' : ''}`}
                onClick={() => setPayment(m.id)}
              >
                <span className="pay-icon">{m.icon}</span>
                <span className="pay-info">
                  <span className="pay-label">{m.label}</span>
                  <span className="pay-hint">{m.hint}</span>
                </span>
                <span className="pay-radio">{payment === m.id ? '●' : '○'}</span>
              </button>
            ))}

            {error && <p className="checkout-error">{error}</p>}
            <button className="checkout-btn full" onClick={placeOrder} disabled={submitting}>
              {submitting ? 'Placing order…' : `Place order · ₹${amount}`}
            </button>
            <button className="link-btn" onClick={() => setStep('address')}>← Back to address</button>
          </div>
        )}

        {step === 'done' && order && (
          <div className="checkout-body done">
            <div className="done-check">✅</div>
            <h2>Order placed!</h2>
            <p className="done-eta">Arriving in <strong>11 minutes</strong></p>
            <div className="done-card">
              <div className="bill-row"><span>Order ID</span><span>{order.id}</span></div>
              <div className="bill-row"><span>Items</span><span>{order.itemCount}</span></div>
              <div className="bill-row"><span>Paid via</span><span>{order.payment.toUpperCase()}</span></div>
              <div className="bill-row total"><span>Amount</span><span>₹{order.amount}</span></div>
            </div>
            <button className="checkout-btn full" onClick={reset}>Back to shopping</button>
          </div>
        )}
      </div>
    </div>
  )
}
