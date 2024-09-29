import Link from 'next/link';
import { components } from '@octokit/openapi-types';

type Issue = components['schemas']['issue'];
type Label = components['schemas']['label'];

interface Props {
  issues: Issue[];
}

export default function BlogList({ issues }: Props) {
  return (
    <div className='space-y-4'>
      {issues.map((issue: Issue) => (
        <div key={issue.number} className='border p-4 rounded-md'>
          <Link href={`/blog/${issue.number}`} className='text-xl font-semibold hover:underline'>
            {issue.title}
          </Link>

          <div className='mt-2'>
            {(issue.labels as Label[]).map((label: Label) => (
              <span key={label.id} className='bg-gray-200 px-2 py-1 rounded-full text-sm mr-2'>
                {label.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
