import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/app/globals.css';
import { getAllLabels } from '@/lib/github';
import GithubLabel from '@/components/GithubLabel';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBox';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_BLOG_TITLE || 'My Blog',
  description: 'blog using github issue',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body className='flex flex-col min-h-screen bg-gray-100'>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

async function Main({ children }: { children: React.ReactNode }) {
  const labels = await getAllLabels();

  return (
    <main className='container mx-auto py-8 flex-1 flex space-x-4'>
      {/* left */}
      <div className='md:w-3/4 w-full'>{children}</div>

      {/* right */}
      <div className='md:w-1/4 hidden md:block space-y-2'>
        {/* search */}
        <div className='bg-white p-4 rounded-lg'>
          <SearchBar />
        </div>

        {/* labels */}
        <div className='bg-white p-4 rounded-lg'>
          <h1 className='text-xl font-semibold pt-1 pb-4'>Labels</h1>
          <div className='flex flex-wrap gap-2'>
            {labels.map((label: string) => (
              <Link key={label} href={`/?label=${encodeURIComponent(label)}`}>
                <GithubLabel key={label} label={label} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className='bg-blue-500 shadow-sm'>
      <div className='container mx-auto text-center p-2 text-white text-lg'>
        © {new Date().getFullYear()} GitHub Issue Blog
      </div>
    </footer>
  );
}
