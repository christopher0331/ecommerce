import Head from 'next/head'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>E-commerce Store</title>
        <meta name="description" content="Our e-commerce store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <footer>
        <p>&copy; 2023 Our E-commerce Store. All rights reserved.</p>
      </footer>
    </>
  )
}
