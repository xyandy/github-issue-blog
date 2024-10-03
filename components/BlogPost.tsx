import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-light.css';
import 'github-markdown-css';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { components } from '@octokit/openapi-types';

type Issue = components['schemas']['issue'];

interface Props {
  issue: Issue;
}

export default function BlogPost({ issue }: Props) {
  const markdownString = issue.body || '';
  return (
    <article className='prose lg:prose-xl mx-auto'>
      <h1>{issue.title}</h1>

      <div className='flex items-center space-x-2 text-gray-500'>
        <img src={issue.user?.avatar_url} alt={issue.user?.login} className='w-8 h-8 rounded-full' />
        <span>{issue.user?.login}</span>
        <span>•</span>
        <time dateTime={issue.created_at}>{new Date(issue.created_at).toLocaleDateString()}</time>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <ReactMarkdown
          className='markdown-body'
          children={markdownString}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        />
      </div>
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
