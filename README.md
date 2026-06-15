# QuickGroceries

Online app to buy groceries and get them delivered instantly — a Blinkit-style quick-commerce storefront.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build
npm run preview  # preview the production build
```

## What's built (basic version)

- ⚡ Header with delivery-ETA banner, address, and live search
- 🗂️ Scrollable category filter (Fruits, Dairy, Snacks, Beverages, Staples)
- 🛒 Product grid with prices, MRP/discount tags, and ADD / quantity steppers
- 🧾 Slide-in cart drawer with bill summary, free-delivery threshold, and checkout button
- Sticky "view cart" bar with live item count and total

## Project structure

```
src/
  data/products.js        # static catalog + categories (swap for an API later)
  context/CartContext.jsx # cart state via Context + useReducer
  components/
    Header.jsx
    Categories.jsx
    ProductCard.jsx
    CartDrawer.jsx
  App.jsx                 # search + category filtering, layout
  index.css               # all styles (Blinkit-inspired theme)
```

## Ideas to build on next

- Real backend / API for catalog and inventory
- User auth + saved addresses
- Working checkout & payment flow
- Order tracking with live ETA
- Product detail pages and search suggestions
- Persist cart to localStorage
