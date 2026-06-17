export default function Categories({ items, active, onSelect }) {
  return (
    <div className="categories">
      {items.map((c) => (
        <button
          key={c.id}
          className={`category-chip ${active === c.id ? 'active' : ''}`}
          onClick={() => onSelect(c.id)}
        >
          <span className="category-icon">{c.icon}</span>
          <span>{c.name}</span>
        </button>
      ))}
    </div>
  )
}
