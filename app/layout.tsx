import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'github issue blog',
  description: 'blog using github issue',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <header className='bg-blue-500 text-white p-4'>
          <div className='container mx-auto'>
            <h1 className='text-2xl font-bold'>My GitHub Blog</h1>
          </div>
        </header>

        <main className='py-8'>{children}</main>

        <footer className='bg-gray-100 p-4 mt-8'>
          <div className='container mx-auto text-center'>© {new Date().getFullYear()} GitHub Issue Blog</div>
        </footer>
      </body>
    </html>
  );
  // return (
  //   <html lang='en'>
  //     <body>
  //       <header className='border-2 border-blue-500'>
  //         <MyLink />
  //       </header>
  //       <main>{children}</main>
  //       <footer></footer>
  //     </body>
  //   </html>
  // );
}
