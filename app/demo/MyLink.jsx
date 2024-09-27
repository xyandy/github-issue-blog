'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MyLink() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href='/'>Home</Link>
      &nbsp;&nbsp;
      <Link href='/demo'>Demo</Link>
      &nbsp;&nbsp;
    </nav>
  );
}
