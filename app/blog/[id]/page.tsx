import BlogPost from '@/components/BlogPost';
import CommentForm from '@/components/CommentForm';
import Comments from '@/components/Comments';
import { getComments, getIssue } from '@/lib/github';

interface ParamsProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: ParamsProps) {
  const issue = await getIssue(Number(params.id));
  const comments = await getComments(Number(params.id));

  return (
    <div className='container mx-auto bg-white rounded-xl'>
      <BlogPost issue={issue} comments={comments} />
      {/* <CommentForm issueNumber={issue.number} /> */}
    </div>
  );
}
