import BlogList from '@/components/BlogList';
import { searchIssues } from '@/lib/github';

interface SearchParamsProps {
  searchParams: {
    q: string;
  };
}

export default async function SearchPage({ searchParams }: SearchParamsProps) {
  const query = searchParams.q || '';
  const issues = await searchIssues(query);

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold mb-4'>Search Results for "{query}"</h1>
      <BlogList issues={issues} />
    </div>
  );
}
