'use client';

import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();

  const changeLanguage = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en';
    router.push(`/${newLocale}`);
  };

  const title = process.env.NEXT_PUBLIC_BLOG_TITLE || 'My Blog';
  const desktopCss = 'hover:text-blue-500 hover:border-b-4 hover:border-blue-500 text-lg font-medium';
  const mobileCss = 'hover:text-blue-500 hover:border-b-2 hover:border-blue-500 text-lg font-medium';
  return (
    <header className='bg-white shadow-sm'>
      <div className='flex justify-between items-center px-8 py-3'>
        <h1 className='text-2xl font-medium hover:text-blue-500'>{title}</h1>

        {/* Desktop menu */}
        <nav className='hidden md:flex items-center space-x-6'>
          <Link href='/' className={desktopCss}>
            {t('home')}
          </Link>
          {/* <Link href='/archive' className={desktopCss}>
            {t('archive')}
          </Link> */}
          <Link href='/about' className={desktopCss}>
            {t('about')}
          </Link>
          <button onClick={changeLanguage} className={desktopCss}>
            {locale === 'en' ? 'English' : '中文'}
          </button>
        </nav>

        {/* Mobile menu button */}
        <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
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

      {/* Mobile menu */}
      {isOpen && (
        <div className='md:hidden flex flex-col text-center space-y-2'>
          <Link href='/' className={mobileCss}>
            {t('home')}
          </Link>
          {/* <Link href='/archive' className={mobileCss}>
            {t('archive')}
          </Link> */}
          <Link href='/about' className={mobileCss}>
            {t('about')}
          </Link>
          <button onClick={changeLanguage} className={mobileCss}>
            {locale === 'en' ? 'English' : '中文'}
          </button>
        </div>
      )}
    </header>
  );
}
