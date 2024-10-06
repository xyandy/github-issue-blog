import type { Metadata } from 'next';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'github issue blog',
  description: 'blog using github issue',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen bg-gray-100'>
        <Header />

        <main className='flex-grow py-8'>{children}</main>

        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className='bg-white shadow-md'>
      <div className='flex justify-between items-center px-8 py-4'>
        <h1 className='text-2xl font-bold'>Dogxy Blog</h1>

        <nav className='hidden sm:flex items-center space-x-6'>
          <Link
            href='/'
            className='text-gray-500 hover:text-blue-500 hover:border-b-4 hover:border-blue-500 text-lg font-medium'
          >
            首页
          </Link>
          <Link
            href='/archive'
            className='text-gray-500 hover:text-blue-500 hover:border-b-4 hover:border-blue-500 text-lg font-medium'
          >
            归档
          </Link>
          <Link
            href='/about'
            className='text-gray-500 hover:text-blue-500 hover:border-b-4 hover:border-blue-500 text-lg font-medium'
          >
            关于
          </Link>
        </nav>

        <div className='sm:hidden'>
          <button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
            <span className='sr-only'>打开主菜单</span>
            <Menu className='block h-6 w-6' aria-hidden='true' />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className='bg-blue-500 shadow'>
      <div className='container mx-auto text-center p-4 text-white text-lg'>
        © {new Date().getFullYear()} GitHub Issue Blog
      </div>
    </footer>
  );
}
