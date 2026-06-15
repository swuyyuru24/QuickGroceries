import { useMemo, useState } from 'react'
import { products } from './data/products'
import { useCart } from './context/CartContext'
import Header from './components/Header'
import Categories from './components/Categories'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

export default function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [cartOpen, setCartOpen] = useState(false)
  const { count, total } = useCart()

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return products.filter((p) => {
      const matchCategory = category === 'all' || p.category === category
      const matchSearch = !q || p.name.toLowerCase().includes(q)
      return matchCategory && matchSearch
    })
  }, [search, category])

  return (
    <div className="app">
      <Header
        search={search}
        onSearch={setSearch}
        cartCount={count}
        onCartClick={() => setCartOpen(true)}
      />

      <Categories active={category} onSelect={setCategory} />

      <main className="catalog">
        {visible.length === 0 ? (
          <p className="no-results">No products found for “{search}”.</p>
        ) : (
          <div className="product-grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      {count > 0 && !cartOpen && (
        <button className="cart-bar" onClick={() => setCartOpen(true)}>
          <span>{count} item{count > 1 ? 's' : ''} · ₹{total}</span>
          <span>View cart →</span>
        </button>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
