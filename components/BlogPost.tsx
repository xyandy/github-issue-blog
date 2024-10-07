import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { components } from '@octokit/openapi-types';
import 'highlight.js/styles/atom-one-light.css';
import 'github-markdown-css';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type Issue = components['schemas']['issue'];
type Comment = components['schemas']['issue-comment'];

interface Props {
  issue: Issue;
  comments: Comment[];
}

export default function BlogPost({ issue, comments }: Props) {
  const blogContent = issue.body || '';
  return (
    <div className='prose max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* blog content */}
      <div className='text-5xl pt-10 text-blue-500'>{issue.title}</div>
      <div className='flex items-center space-x-2'>
        <img src={issue.user?.avatar_url} alt={issue.user?.login} className='w-8 h-8 rounded-full' />
        <span>{issue.user?.login}</span>
        <span>•</span>
        <time dateTime={issue.created_at}>{new Date(issue.created_at).toISOString().split('T')[0]}</time>
      </div>
      <div>
        <ReactMarkdown
          className='markdown-body'
          children={blogContent}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        />
      </div>

      <CommentButton issueUrl={issue.html_url} />

      {/* comments */}
      <div className='space-y-4 pb-4'>
        {comments.map((comment: Comment) => {
          const CommentContent = comment.body || '';

          return (
            <Card key={comment.id}>
              <CardHeader className='p-0'>
                <div className='flex items-center space-x-2 bg-blue-100 h-12'>
                  <img src={comment.user?.avatar_url} alt={comment.user?.login} className='w-8 h-8 rounded-full' />
                  <span>{comment.user?.login}</span>
                  <span>•</span>
                  <time dateTime={comment.created_at}>{new Date(comment.created_at).toISOString().split('T')[0]}</time>
                </div>
              </CardHeader>

              <CardContent className='pt-0'>
                <ReactMarkdown
                  className='markdown-body'
                  children={CommentContent}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const BlueDashedTextDivider = () => {
  return (
    <div className='flex items-center my-10'>
      <div className='flex-grow border-t-4 border-blue-500 border-dashed'></div>
      <span className='flex-shrink mx-4 text-blue-500 font-bold text-lg'>Comments</span>
      <div className='flex-grow border-t-4 border-blue-500 border-dashed'></div>
    </div>
  );
};

function CommentButton({ issueUrl }: { issueUrl: string }) {
  return (
    <div className='py-12'>
      <Link
        href={issueUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='block w-full py-2 bg-blue-400 text-white rounded-md text-center hover:bg-blue-500 transition-colors no-underline'
        // className='block w-full py-2 bg-gray-100 rounded-md border border-gray-300 text-black hover:text-blue-500 text-center hover:bg-gray-200 transition-colors no-underline'
      >
        评论
      </Link>
    </div>
  );
}
