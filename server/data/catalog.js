// The catalog is the backend's source of truth. The frontend fetches it via
// /api/products and /api/categories instead of importing static data.
export const categories = [
  { id: 'all', name: 'All', icon: '🛒' },
  { id: 'fruits', name: 'Fruits & Veg', icon: '🥬' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'snacks', name: 'Snacks', icon: '🍪' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'staples', name: 'Atta & Staples', icon: '🌾' },
]

export const products = [
  { id: 1, name: 'Banana (Robusta)', unit: '1 dozen', price: 49, mrp: 69, category: 'fruits', icon: '🍌' },
  { id: 2, name: 'Tomato (Local)', unit: '500 g', price: 25, mrp: 35, category: 'fruits', icon: '🍅' },
  { id: 3, name: 'Onion', unit: '1 kg', price: 39, mrp: 55, category: 'fruits', icon: '🧅' },
  { id: 4, name: 'Baby Spinach', unit: '250 g', price: 29, mrp: 40, category: 'fruits', icon: '🥬' },
  { id: 5, name: 'Amul Gold Milk', unit: '500 ml', price: 34, mrp: 34, category: 'dairy', icon: '🥛' },
  { id: 6, name: 'Farm Eggs', unit: '6 pcs', price: 59, mrp: 72, category: 'dairy', icon: '🥚' },
  { id: 7, name: 'Amul Butter', unit: '100 g', price: 56, mrp: 60, category: 'dairy', icon: '🧈' },
  { id: 8, name: 'Lays Classic Salted', unit: '52 g', price: 20, mrp: 20, category: 'snacks', icon: '🥔' },
  { id: 9, name: 'Dark Fantasy Choco', unit: '75 g', price: 35, mrp: 40, category: 'snacks', icon: '🍪' },
  { id: 10, name: 'Coca-Cola', unit: '750 ml', price: 40, mrp: 45, category: 'beverages', icon: '🥤' },
  { id: 11, name: 'Real Mixed Fruit Juice', unit: '1 L', price: 110, mrp: 130, category: 'beverages', icon: '🧃' },
  { id: 12, name: 'Aashirvaad Atta', unit: '5 kg', price: 245, mrp: 280, category: 'staples', icon: '🌾' },
  { id: 13, name: 'Tata Salt', unit: '1 kg', price: 28, mrp: 30, category: 'staples', icon: '🧂' },
  { id: 14, name: 'Fortune Sunflower Oil', unit: '1 L', price: 145, mrp: 165, category: 'staples', icon: '🛢️' },
  { id: 15, name: 'Apple (Shimla)', unit: '1 kg', price: 159, mrp: 199, category: 'fruits', icon: '🍎' },
  { id: 16, name: 'Paneer (Fresh)', unit: '200 g', price: 89, mrp: 99, category: 'dairy', icon: '🧀' },
]

const byId = new Map(products.map((p) => [p.id, p]))
export const getProduct = (id) => byId.get(Number(id))
