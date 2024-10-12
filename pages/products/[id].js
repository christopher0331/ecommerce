import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function ProductDetails() {
  const [product, setProduct] = useState(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }
  }, [id])

  if (!product) return <div>Loading...</div>

  return (
    <div className="product-details">
      <Image src={product.image} alt={product.name} width={400} height={400} />
      <h1>{product.name}</h1>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="description">{product.description}</p>
      <button className="btn" onClick={() => addToCart(product.id)}>Add to Cart</button>
    </div>
  )
}

function addToCart(productId) {
  fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity: 1 })
  })
  .then(res => res.json())
  .then(data => {
    alert('Product added to cart!')
  })
}
