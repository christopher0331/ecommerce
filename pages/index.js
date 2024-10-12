import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data))
  }, [])

  return (
    <div>
      <h1>Welcome to Semper Flags</h1>
      <p>Handcrafted metal flags by a former Marine. Show your pride with our durable and unique designs.</p>
      <h2>Featured Flags</h2>
      <div className="featured-products">
        {featuredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div>
              <Image 
                src={product.image} 
                alt={product.name} 
                layout="fill"
                objectFit="cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-flag.jpg";
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
      <div className="view-all">
        <Link href="/products">
          <a className="btn">View All Flags</a>
        </Link>
      </div>
    </div>
  )
}
