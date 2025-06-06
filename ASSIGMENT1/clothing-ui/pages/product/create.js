// clothing-ui/pages/product/create.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function CreateProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/product');
      } else {
        alert('Tạo sản phẩm thất bại');
      }
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>Create Product</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
