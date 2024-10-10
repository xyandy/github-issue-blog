import BlogPost from '@/components/BlogPost';
import CommentForm from '@/components/CommentForm';
import { getComments, getIssue } from '@/lib/github';
import { redirect } from 'next/navigation';

interface ParamsProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: ParamsProps) {
  const issue = await getIssue(Number(params.id));
  if (!issue) {
    redirect('/404');
  }

  const comments = await getComments(Number(params.id));
  return (
    <div className='container mx-auto bg-white rounded-xl'>
      <BlogPost issue={issue} comments={comments} />
      {/* <CommentForm issueNumber={issue.number} /> */}
    </div>
  );
}
