import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="header">
      <div className="container">
        <Link href="/">
          <a className="logo">Semper Flags</a>
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="sr-only">Toggle menu</span>
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link href="/"><a className={router.pathname === "/" ? "active" : ""}>Home</a></Link></li>
            <li><Link href="/products"><a className={router.pathname === "/products" ? "active" : ""}>All Flags</a></Link></li>
            <li><Link href="/cart"><a className={router.pathname === "/cart" ? "active" : ""}>Cart</a></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
