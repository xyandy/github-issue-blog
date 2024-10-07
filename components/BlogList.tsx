import Link from 'next/link';
import { components } from '@octokit/openapi-types';
import { Card, CardContent } from '@/components/ui/card';
import GithubLabel from '@/components/GithubLabel';

type Issue = components['schemas']['issue'];
type Label = components['schemas']['label'];

interface Props {
  issues: Issue[];
}

export default async function BlogList({ issues }: Props) {
  return (
    <div className='space-y-4'>
      {issues.map((issue: Issue) => (
        <Card key={issue.id}>
          <CardContent className='p-4 flex items-center'>
            <div className='flex-grow'>
              {/* title */}
              <Link
                href={`/blog/${issue.number}`}
                className='text-xl font-semibold hover:text-blue-500 transition-colors duration-400'
              >
                <h1>{issue.title}</h1>
              </Link>

              {/* label */}
              <div className='flex flex-wrap gap-2 pt-3'>
                <GithubLabel label={new Date(issue.created_at).toISOString().split('T')[0]} />

                {(issue.labels as Label[]).map((label: Label) => (
                  <Link key={label.id} href={`/?label=${encodeURIComponent(label.name)}`}>
                    <GithubLabel label={label.name} />
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
