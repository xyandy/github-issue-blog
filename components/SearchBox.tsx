'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useRouter } from '@/i18n/routing';

export default function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newUrl = `/?keyword=${encodeURIComponent(keyword)}`;
      router.push(newUrl);
    }
  };

  return (
    <div>
      <h1 className='text-xl font-semibold pt-1 pb-4'>Search</h1>
      <div className='relative'>
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
        <Input
          type='search'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value.trim())}
          onKeyDown={handleKeyDown}
          className='w-full pl-10'
        />
      </div>
    </div>
  );
}
