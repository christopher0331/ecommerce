import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Cart() {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState({})

  useEffect(() => {
    fetchCart()
    fetchProducts()
  }, [])

  function fetchCart() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => setCart(data))
  }

  function fetchProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const productMap = {}
        data.forEach(product => {
          productMap[product.id] = product
        })
        setProducts(productMap)
      })
  }

  function updateQuantity(productId, newQuantity) {
    fetch(`/api/cart?productId=${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity })
    })
    .then(res => res.json())
    .then(data => {
      setCart(data)
    })
  }

  function removeItem(productId) {
    fetch(`/api/cart?productId=${productId}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      setCart(data)
    })
  }

  const total = cart.reduce((sum, item) => sum + (products[item.productId]?.price || 0) * item.quantity, 0)

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.productId} className="cart-item">
              <Image src={products[item.productId]?.image} alt={products[item.productId]?.name} width={50} height={50} />
              <div>
                <h3>{products[item.productId]?.name}</h3>
                <p className="price">${products[item.productId]?.price.toFixed(2)}</p>
              </div>
              <div>
                <label>
                  Quantity:
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                    min="1"
                  />
                </label>
              </div>
              <button className="btn" onClick={() => removeItem(item.productId)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>
          <Link href="/checkout">
            <a className="checkout-button">Proceed to Checkout</a>
          </Link>
        </>
      )}
    </div>
  )
}
