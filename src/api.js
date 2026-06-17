// Thin wrapper around the backend API. Paths are same-origin (/api/...) and
// proxied to the Express server by Vite in dev.
async function request(path, options) {
  const res = await fetch(path, options)
  const body = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(body?.error || `Request failed (${res.status})`)
  }
  return body
}

export const getProducts = () => request('/api/products')
export const getCategories = () => request('/api/categories')

export const placeOrder = (payload) =>
  request('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
