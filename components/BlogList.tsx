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
        {issues.map((issue) => (
          <Card key={issue.id} className='overflow-hidden'>
            <CardContent className='p-4 flex items-center'>
              <div className='flex-grow'>
                <h2 className='text-lg font-semibold'>{issue.title}</h2>
                <p className='text-sm text-gray-500'>{new Date(issue.created_at).toLocaleDateString()}</p>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {(issue.labels as Label[]).map((label: Label) => (
                    <Badge
                      key={label.id}
                      style={{ backgroundColor: `#${label.color}`, color: getContrastColor(label.color) }}
                    >
                      {label.name}
                    </Badge>
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

function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}
