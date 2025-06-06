// clothing-ui/components/ProductCard.js
import Link from 'next/link';

export default function ProductCard({ product, onDelete }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      {product.image && <img src={product.image} alt={product.name} width="200" />}
      <div style={{ marginTop: '1rem' }}>
        <Link href={`/product/${product._id}`} style={{ marginRight: '1rem' }}>View</Link>
        <Link href={`/product/edit/${product._id}`} style={{ marginRight: '1rem' }}>Edit</Link>
        <button onClick={() => onDelete(product._id)} style={{ color: 'red' }}>Delete</button>
      </div>
    </div>
  );
}
