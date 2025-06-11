import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CreateProduct() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/products', form);
    router.push('/');
  };

  return (
    <>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" value={form.price} onChange={handleChange} required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (optional)" />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
