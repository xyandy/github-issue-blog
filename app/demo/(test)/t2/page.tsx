'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <h1 className='text-red-500'>T2</h1>
      <button type='button' onClick={() => router.push('/demo')}>
        GoBackDemo
      </button>
    </div>
  );
}
