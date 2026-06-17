export default function Header({ search, onSearch, cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="brand">
          <span className="brand-logo">⚡</span>
          <div>
            <div className="brand-name">QuickGroceries</div>
            <div className="delivery-eta">Delivery in <strong>11 minutes</strong></div>
          </div>
        </div>

        <button className="cart-btn" onClick={onCartClick} aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}>
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>

      <div className="address-bar">
        📍 Home — Koramangala, Bengaluru
      </div>

      <input
        className="search"
        type="search"
        placeholder='Search "milk", "atta", "chips"…'
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  )
}
