import type { Metadata } from 'next';
import '@/app/globals.css';
import { getAllLabels } from '@/lib/github';
import GithubLabel from '@/components/GithubLabel';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'github issue blog',
  description: 'blog using github issue',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen bg-gray-100'>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className='bg-white shadow-md'>
      <div className='flex justify-between items-center px-8 py-3'>
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

        {/* <div className='sm:hidden'>
          <button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
            <span className='sr-only'>打开主菜单</span>
            <Menu className='block h-6 w-6' aria-hidden='true' />
          </button>
        </div> */}

        <button className='md:hidden'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
      </div>
    </header>
  );
}

async function Main({ children }: { children: React.ReactNode }) {
  const labels = await getAllLabels();
  return (
    <main className='container mx-auto py-8 flex-1 flex space-x-4'>
      {/* left */}
      <div className='md:w-3/4 w-full'>{children}</div>

      {/* right */}
      <div className='md:w-1/4 hidden md:block space-y-4'>
        <div className='bg-white p-6 rounded-lg'>
          <h1 className='text-xl font-semibold pt-1 pb-4'>标签</h1>

          <div className='flex flex-wrap gap-2'>
            {labels.map((label: string) => (
              <Link key={label} href={`/?label=${encodeURIComponent(label)}`}>
                <GithubLabel key={label} label={label} />
              </Link>
            ))}
          </div>
        </div>
        {/* <div className='bg-white p-6 rounded-lg shadow'></div> */}
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className='bg-blue-500 shadow'>
      <div className='container mx-auto text-center p-2 text-white text-lg'>
        © {new Date().getFullYear()} GitHub Issue Blog
      </div>
    </footer>
  );
}
