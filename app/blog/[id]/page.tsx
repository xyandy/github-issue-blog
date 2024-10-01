import BlogPost from '@/components/BlogPost';
import CommentForm from '@/components/CommentForm';
import Comments from '@/components/Comments';
import { getComments, getIssue } from '@/lib/github';
import { markdownToHtml } from '@/lib/markdown';

interface ParamsProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: ParamsProps) {
  const issue = await getIssue(Number(params.id));
  const comments = await getComments(Number(params.id));
  const content = await markdownToHtml(issue.body || '');
  return (
    <div className='container mx-auto px-4'>
      <BlogPost issue={issue} content={content} />
      <Comments comments={comments} />
      {/* <CommentForm issueNumber={issue.number} /> */}
    </div>
  );
}
