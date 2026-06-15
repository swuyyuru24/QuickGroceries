import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { qtyOf, add, remove } = useCart()
  const qty = qtyOf(product.id)
  const discount = product.mrp > product.price

  return (
    <div className="product-card">
      <div className="product-thumb">
        <span className="product-icon">{product.icon}</span>
        {discount && (
          <span className="discount-tag">
            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="product-name">{product.name}</div>
      <div className="product-unit">{product.unit}</div>

      <div className="product-footer">
        <div className="product-price">
          ₹{product.price}
          {discount && <span className="product-mrp">₹{product.mrp}</span>}
        </div>

        {qty === 0 ? (
          <button className="add-btn" onClick={() => add(product)}>
            ADD
          </button>
        ) : (
          <div className="qty-stepper">
            <button onClick={() => remove(product.id)}>−</button>
            <span>{qty}</span>
            <button onClick={() => add(product)}>+</button>
          </div>
        )}
      </div>
    </div>
  )
}
