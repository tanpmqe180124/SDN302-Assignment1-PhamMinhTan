// clothing-ui/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link href="/product/create">Add Product</Link>
    </nav>
  );
}
