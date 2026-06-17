import { Router } from 'express'
import { createOrder, getOrder } from '../data/orders.js'

const router = Router()

router.post('/orders', (req, res) => {
  const { order, error } = createOrder(req.body ?? {})
  if (error) return res.status(400).json({ error })
  res.status(201).json(order)
})

router.get('/orders/:id', (req, res) => {
  const order = getOrder(req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found.' })
  res.json(order)
})

export default router
