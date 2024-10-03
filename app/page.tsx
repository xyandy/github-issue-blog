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
    issues = await searchIssues('', [label], page);
  } else {
    issues = await getIssues(page);
  }

  return (
    <div className='container mx-auto px-4'>
      <BlogList issues={issues} />
      <Pagination page={page} label={label} />
    </div>
  );
}

function Pagination({ page, label }: { page: number; label: string }) {
  const getPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    params.set('page', pageNum.toString());
    if (label) {
      params.set('label', label);
    }
    return `?${params.toString()}`;
  };

  return (
    <div className='flex justify-center mt-8'>
      {page > 1 && (
        <a href={getPageUrl(page - 1)} className='mx-2 px-4 py-2 bg-blue-500 text-white rounded'>
          上一页
        </a>
      )}

      <span className='mx-2 px-4 py-2 bg-gray-200 rounded'>第 {page} 页</span>
      <a href={getPageUrl(page + 1)} className='mx-2 px-4 py-2 bg-blue-500 text-white rounded'>
        下一页
      </a>
    </div>
  );
}
