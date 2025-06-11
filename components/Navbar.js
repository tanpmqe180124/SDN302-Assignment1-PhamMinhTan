import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link href="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link href="/product/new">Add Product</Link>
    </nav>
  );
}
