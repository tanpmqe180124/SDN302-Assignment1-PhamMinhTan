import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            name: data.name || '',
            description: data.description || '',
            price: data.price || '',
            image: data.image || '',
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Lỗi khi tải dữ liệu:', err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/product');
      } else {
        alert('Cập nhật thất bại');
      }
    } catch (err) {
      console.error('Lỗi cập nhật:', err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Đang tải sản phẩm...</p>;

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center my-6">Chỉnh sửa sản phẩm</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4"
      >
        <input
          name="name"
          type="text"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Giá sản phẩm"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="image"
          type="text"
          placeholder="Image URL (tùy chọn)"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}
