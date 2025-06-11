import connectMongo from '@/lib/mongodb';
import Product from '@/models/product';

export default async function handler(req, res) {
  await connectMongo();
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  }

  if (req.method === 'PUT') {
    const { name, description, price, image } = req.body;
    const updated = await Product.findByIdAndUpdate(id, { name, description, price, image }, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await Product.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).end();
}
