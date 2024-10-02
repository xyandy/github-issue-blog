import Link from 'next/link';
import { components } from '@octokit/openapi-types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type Issue = components['schemas']['issue'];
type Label = components['schemas']['label'];

interface Props {
  issues: Issue[];
}

export default async function BlogList({ issues }: Props) {
  return (
    <div className='container mx-auto p-4'>
      <div className='space-y-2'>
        {issues.map((issue: Issue) => (
          <Card key={issue.id} className='overflow-hidden'>
            <CardContent className='p-4 flex items-center'>
              <div className='flex-grow'>
                <Link
                  href={`/blog/${issue.number}`}
                  className='text-xl font-semibold hover:text-blue-500 transition-colors duration-200'
                >
                  <h1>{issue.title}</h1>
                </Link>

                <div className='flex flex-wrap gap-2 mt-2'>
                  <Badge variant='secondary' className='text-base'>
                    {new Date(issue.created_at).toISOString().split('T')[0]}
                  </Badge>

                  {(issue.labels as Label[]).map((label: Label) => (
                    <Link key={label.id} href={`/?label=${encodeURIComponent(label.name)}`}>
                      <Badge
                        variant='secondary'
                        className='text-base hover:text-blue-500 transition-colors duration-200 cursor-pointer'
                      >
                        {label.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
