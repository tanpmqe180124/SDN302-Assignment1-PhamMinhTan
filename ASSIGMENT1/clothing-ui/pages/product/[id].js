// clothing-ui/pages/product/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error('Lỗi khi lấy dữ liệu sản phẩm:', err));
    }
  }, [id]);

  if (!product) return <p style={{ textAlign: 'center' }}>Đang tải...</p>;

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
        <h1>{product.name}</h1>
        {product.image && (
          <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
        )}
        <p><strong>Giá:</strong> ${product.price}</p>
        <p><strong>Mô tả:</strong> {product.description}</p>
      </div>
    </div>
  );
}
