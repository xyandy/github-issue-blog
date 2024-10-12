import { redirect } from 'next/navigation';
import { searchIssues, IssuesAndPagination } from '@/lib/github';
import BlogPost from '@/components/BlogPost';

export const runtime = 'edge';

export default async function About() {
  let ret: IssuesAndPagination = await searchIssues('', ['about'], 1);
  if (!ret || ret.issues.length === 0) {
    redirect('/404');
  }

  return (
    <div className='container mx-auto bg-white rounded-xl'>
      <BlogPost issue={ret.issues[0]} comments={[]} showCommentButton={false} />
    </div>
  );
}
