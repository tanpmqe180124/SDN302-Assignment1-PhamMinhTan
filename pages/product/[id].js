import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`).then(res => setProduct(res.data));
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.image && <img src={product.image} alt={product.name} width="200" />}
      <br />
      <Link href={`/product/edit/${product._id}`}>✏️ Edit</Link>
    </>
  );
}
