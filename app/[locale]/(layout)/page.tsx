import { redirect } from 'next/navigation';
import { getIssues, searchIssues, IssuesAndPagination } from '@/lib/github';
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

  let ret: IssuesAndPagination;
  if (label && label !== '') {
    ret = await searchIssues('', [label], page);
  } else {
    ret = await getIssues(page);
  }

  if (ret.issues.length === 0) {
    redirect('/404');
  }

  return (
    <div className='container mx-auto'>
      <BlogList issues={ret.issues} />
      <Pagination page={page} label={label} link={ret.link} />
    </div>
  );
}

function Pagination({ page, label, link }: { page: number; label: string; link: string | undefined }) {
  const getPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    params.set('page', pageNum.toString());
    if (label) {
      params.set('label', label);
    }
    return `?${params.toString()}`;
  };

  const isLastPage = (link: string | undefined) => {
    if (!link) return true;
    return !link.includes('rel="next"');
  };

  let flag = isLastPage(link);
  console.log(`BlogList, page: ${page}, isLastPage: ${flag}, link: ${link}`);

  return (
    <div className='flex justify-center mt-8'>
      {page > 1 && (
        <a href={getPageUrl(page - 1)} className='mx-2 px-4 py-2 bg-blue-500 text-white rounded'>
          上一页
        </a>
      )}

      <span className='mx-2 px-4 py-2 bg-gray-200 rounded'>第 {page} 页</span>

      {!flag && (
        <a href={getPageUrl(page + 1)} className='mx-2 px-4 py-2 bg-blue-500 text-white rounded'>
          下一页
        </a>
      )}
    </div>
  );
}
