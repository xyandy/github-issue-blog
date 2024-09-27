import { components } from '@octokit/openapi-types';

type Issue = components['schemas']['issue'];

interface Props {
  issue: Issue;
  content: string;
}

export default function BlogPost({ issue, content }: Props) {
  return (
    <article className='prose lg:prose-xl mx-auto'>
      <h1>{issue.title}</h1>
      <div className='flex items-center space-x-2 text-gray-500'>
        <img src={issue.user?.avatar_url} alt={issue.user?.login} className='w-8 h-8 rounded-full' />
        <span>{issue.user?.login}</span>
        <span>•</span>
        <time dateTime={issue.created_at}>{new Date(issue.created_at).toLocaleDateString()}</time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
