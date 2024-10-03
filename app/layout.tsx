import type { Metadata } from 'next';
import '@/app/globals.css';
import Link from 'next/link';

function Header() {
  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Dogxy Blog</h1>
          <nav>
            <ul className='hidden md:flex space-x-6'>
              <li>
                <Link href='/' className='text-gray-700 hover:text-blue-500 text-lg font-medium relative group'>
                  首页
                  <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out'></span>
                </Link>
              </li>
              <li>
                <Link href='/archives' className='text-gray-700 hover:text-blue-500 text-lg font-medium relative group'>
                  归档
                  <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out'></span>
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-gray-700 hover:text-blue-500 text-lg font-medium relative group'>
                  关于
                  <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out'></span>
                </Link>
              </li>
            </ul>
          </nav>
          {/* 保留原有的移动端菜单按钮 */}
        </div>
      </div>
    </header>
  );
}

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

        <footer className='bg-gray-100 p-4'>
          <div className='container mx-auto text-center'>© {new Date().getFullYear()} GitHub Issue Blog</div>
        </footer>
      </body>
    </html>
  );
}
