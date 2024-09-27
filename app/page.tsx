// import SearchBar from './components/SearchBar';
import { getIssues } from '@/lib/github';
import BlogList from '@/components/BlogList';

interface SearchParamsProps {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const page = Number(searchParams.page) || 1;
  const issues = await getIssues(page);

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold mb-4'>Blog Posts</h1>
      {/* <SearchBar /> */}
      <BlogList issues={issues} />
    </div>
  );
}
