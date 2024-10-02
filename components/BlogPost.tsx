import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { components } from '@octokit/openapi-types';

type Issue = components['schemas']['issue'];

interface Props {
  issue: Issue;
}

export default function BlogPost({ issue }: Props) {
  return (
    <article className='prose lg:prose-xl mx-auto'>
      <h1>{issue.title}</h1>

      <div className='flex items-center space-x-2 text-gray-500'>
        <img src={issue.user?.avatar_url} alt={issue.user?.login} className='w-8 h-8 rounded-full' />
        <span>{issue.user?.login}</span>
        <span>•</span>
        <time dateTime={issue.created_at}>{new Date(issue.created_at).toLocaleDateString()}</time>
      </div>

      <ReactMarkdown
        className='prose prose-sm sm:prose lg:prose-lg xl:prose-xl'
        children={issue.body || ''}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
      />
    </article>
  );
}
// export default function BlogPost({ issue }: Props) {
//   return (
//     <article className='prose lg:prose-xl mx-auto'>
//       <h1>{issue.title}</h1>
//       <div className='flex items-center space-x-2 text-gray-500'>
//         <img src={issue.user?.avatar_url} alt={issue.user?.login} className='w-8 h-8 rounded-full' />
//         <span>{issue.user?.login}</span>
//         <span>•</span>
//         <time dateTime={issue.created_at}>{new Date(issue.created_at).toLocaleDateString()}</time>
//       </div>
//       <div dangerouslySetInnerHTML={{ __html: content }} />
//     </article>
//   );
// }
