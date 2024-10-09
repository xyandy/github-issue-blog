import Link from 'next/link';

export default function Custom404() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-200'>
      <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
      <p className='text-xl text-gray-600 mb-8'>Sorry, the page does not exist</p>
      <Link href='/' className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'>
        返回主页
      </Link>
    </div>
  );
}
