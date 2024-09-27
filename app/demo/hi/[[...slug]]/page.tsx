interface PageProps {
  params: {
    slug?: string[];
  };
}

export default function Demo2Page({ params }: PageProps) {
  console.log(`slug: ${params.slug}`);
  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Demo2 Page</h1>
      <p className='mb-4'>Current slug:</p>
      {params.slug ? (
        <ul className='list-disc pl-5'>
          {params.slug.map((segment, index) => (
            <li key={index} className='text-blue-600'>
              {segment}
            </li>
          ))}
        </ul>
      ) : (
        <p className='italic text-gray-600'>No slug provided</p>
      )}
    </div>
  );
}
