import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home() {
  const { data, error } = useSWR('/api/products', fetcher)

  if (error) return <div>Error loading products</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>Products</h1>
      <Link href="/product/new">Add Product</Link>
      <ul>
        {data.map(product => (
          <li key={product._id}>
            <Link href={`/product/${product._id}`}>
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    
    </div>
  )
}
