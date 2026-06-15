import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Checkout from './Checkout'

const DELIVERY_FEE = 25
const FREE_DELIVERY_OVER = 199

export default function CartDrawer({ open, onClose }) {
  const { lines, total, count, add, remove, clear } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const deliveryFee = total >= FREE_DELIVERY_OVER || total === 0 ? 0 : DELIVERY_FEE
  const grandTotal = total + deliveryFee

  return (
    <>
      <div className={`drawer-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>My Cart {count > 0 && `(${count})`}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {lines.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <span>Add items to get them delivered in minutes</span>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map(({ product, qty }) => (
                <div className="cart-line" key={product.id}>
                  <span className="cart-line-icon">{product.icon}</span>
                  <div className="cart-line-info">
                    <div className="cart-line-name">{product.name}</div>
                    <div className="cart-line-unit">{product.unit}</div>
                  </div>
                  <div className="qty-stepper small">
                    <button onClick={() => remove(product.id)}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => add(product)}>+</button>
                  </div>
                  <div className="cart-line-price">₹{product.price * qty}</div>
                </div>
              ))}
            </div>

            <div className="bill-summary">
              <div className="bill-row">
                <span>Item total</span>
                <span>₹{total}</span>
              </div>
              <div className="bill-row">
                <span>Delivery fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="bill-hint">
                  Add ₹{FREE_DELIVERY_OVER - total} more for free delivery
                </div>
              )}
              <div className="bill-row total">
                <span>To pay</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <div className="drawer-footer">
              <button className="clear-btn" onClick={clear}>Clear</button>
              <button className="checkout-btn" onClick={() => setCheckoutOpen(true)}>
                Pay ₹{grandTotal}
              </button>
            </div>
          </>
        )}
      </aside>

      <Checkout
        open={checkoutOpen}
        amount={grandTotal}
        onClose={() => {
          setCheckoutOpen(false)
          onClose()
        }}
      />
    </>
  )
}
