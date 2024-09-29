// import SearchBar from './components/SearchBar';
import { getIssues, searchIssues } from '@/lib/github';
import { components } from '@octokit/openapi-types';
import BlogList from '@/components/BlogList';

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
    issues = await searchIssues('', [label]);
  } else {
    issues = await getIssues(page);
  }

  return (
    <div className='container mx-auto px-4'>
      <BlogList issues={issues} />
    </div>
  );
}
