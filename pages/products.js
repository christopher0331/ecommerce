import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      <h1>All Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div>
              <Image 
                src={product.image} 
                alt={product.name} 
                layout="fill"
                objectFit="cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
            </div>
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <Link href={`/products/${product.id}`}>
              <a className="btn">View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
