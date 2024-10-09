'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-white shadow-md'>
      <div className='flex justify-between items-center px-8 py-3'>
        <h1 className='text-2xl font-bold'>Dogxy Blog</h1>

        {/* Desktop menu */}
        <nav className='hidden md:flex items-center space-x-6'>
          <Link href='/' className='hover:text-blue-500 hover:border-b-4 hover:border-blue-500 text-lg font-medium'>
            首页
          </Link>
          <Link
            href='/archive'
            className='hover:text-blue-500 hover:border-b-4 hover:border-blue-500 text-lg font-medium'
          >
            归档
          </Link>
          <Link
            href='/about'
            className='hover:text-blue-500 hover:border-b-4 hover:border-blue-500 text-lg font-medium'
          >
            关于
          </Link>
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
          <Link href='/' className='hover:text-blue-500 hover:border-2 hover:border-blue-500 text-lg font-medium'>
            首页
          </Link>
          <Link
            href='/archive'
            className='hover:text-blue-500 hover:border-2 hover:border-blue-500 text-lg font-medium'
          >
            归档
          </Link>
          <Link href='/about' className='hover:text-blue-500 hover:border-2 hover:border-blue-500 text-lg font-medium'>
            关于
          </Link>
        </div>
      )}
    </header>
  );
}
