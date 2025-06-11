import connectMongo from '@/lib/mongodb';
import Product from '@/models/product';

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === 'GET') {
    const products = await Product.find();
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const { name, description, price, image } = req.body;
    const product = await Product.create({ name, description, price, image });
    return res.status(201).json(product);
  }

  res.status(405).end(); // Method Not Allowed
}
