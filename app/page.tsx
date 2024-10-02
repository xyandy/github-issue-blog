// import SearchBar from './components/SearchBar';
import { getIssues, searchIssues } from '@/lib/github';
import { components } from '@octokit/openapi-types';
import BlogList from '@/components/BlogList';

export const revalidate = 30;

type Issue = components['schemas']['issue'];

interface SearchParamsProps {
  searchParams: {
    page?: string;
    label?: string;
  };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const page = Number(searchParams.page) || 1;
  const label = searchParams.label || '';

  let issues: Issue[] = [];
  if (label && label !== '') {
    issues = await searchIssues('', [label], 1);
  } else {
    issues = await getIssues(page);
  }

  const now = Date.now();
  return (
    <div className='container mx-auto px-4'>
      <BlogList issues={issues} />
    </div>
  );
}
