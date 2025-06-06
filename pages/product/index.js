// clothing-ui/pages/product/index.js
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // Lấy dữ liệu từ API
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      fetchProducts(); // load lại danh sách
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>Product List</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}
