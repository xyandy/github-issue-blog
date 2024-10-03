import { getIssues } from '@/lib/github';
import { components } from '@octokit/openapi-types';
import Link from 'next/link';

type Issue = components['schemas']['issue'];

export const revalidate = 3600;

export default async function Archives() {
  const issues = await getIssues();
  const groupedIssues = groupIssuesByYear(issues);

  return (
    <div className='container mx-auto px-4 py-8'>
      <ul className='timeline timeline-vertical'></ul>
    </div>
  );
}

function groupIssuesByYear(issues: Issue[]): Record<string, Issue[]> {
  return issues.reduce((acc, issue) => {
    const year = new Date(issue.created_at).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(issue);
    return acc;
  }, {} as Record<string, Issue[]>);
}
