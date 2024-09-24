'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className='mb-4'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search blog posts...'
        className='w-full p-2 border rounded'
      />
      <button type='submit' className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>
        Search
      </button>
    </form>
  );
}
