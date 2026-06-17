import { Router } from 'express'
import { products, categories } from '../data/catalog.js'

const router = Router()

router.get('/products', (req, res) => {
  const { category } = req.query
  const list = category && category !== 'all'
    ? products.filter((p) => p.category === category)
    : products
  res.json(list)
})

router.get('/categories', (req, res) => {
  res.json(categories)
})

export default router
