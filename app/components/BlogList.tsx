import Link from 'next/link';

export default function BlogList({ issues }) {
  return (
    <div className='space-y-4'>
      {issues.map((issue) => (
        <div key={issue.number} className='border p-4 rounded-md'>
          <Link href={`/blog/${issue.number}`} className='text-xl font-semibold hover:underline'>
            {issue.title}
          </Link>
          <div className='mt-2'>
            {issue.labels.map((label) => (
              <span key={label.id} className='bg-gray-200 px-2 py-1 rounded-full text-sm mr-2'>
                {label.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
