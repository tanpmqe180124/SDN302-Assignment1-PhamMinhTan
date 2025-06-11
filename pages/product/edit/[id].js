import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async e => {
    e.preventDefault();
    await axios.put(`/api/products/${id}`, form);
    router.push('/');
  };

  const handleDelete = async () => {
    await axios.delete(`/api/products/${id}`);
    router.push('/');
  };

  if (!form) return <div>Loading...</div>;

  return (
    <>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <input name="name" value={form.name} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" value={form.price} onChange={handleChange} required />
        <input name="image" value={form.image || ''} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
    </>
  );
}
