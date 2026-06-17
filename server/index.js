import express from 'express'
import products from './routes/products.js'
import orders from './routes/orders.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api', products)
app.use('/api', orders)

app.listen(PORT, () => {
  console.log(`QuickGroceries API listening on http://localhost:${PORT}`)
})
