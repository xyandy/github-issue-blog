import { components } from '@octokit/openapi-types';

type Issue = components['schemas']['issue'];
type Comment = components['schemas']['issue-comment'];

const apiBaseUrl = 'https://api.github.com';
const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER as string;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPO as string;
const defaultPerPage = 20;

export interface IssuesAndPagination {
  issues: Issue[];
  link: string | undefined;
}

async function githubFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${apiBaseUrl}${endpoint}`;
  const headers = {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response;
}

export async function getIssues(page = 1): Promise<IssuesAndPagination> {
  const response = await githubFetch(
    `/repos/${owner}/${repo}/issues?creator=${owner}&state=open&per_page=${defaultPerPage}&page=${page}&q=is:issue`
  );
  const data = await response.json();
  return { issues: data as Issue[], link: response.headers.get('link') || undefined };
}

export async function searchIssues(query: string, labels: string[], page = 1): Promise<IssuesAndPagination> {
  let q = `repo:${owner}/${repo} is:issue is:open`;
  if (labels && labels.length > 0) {
    q = `${q} label:${labels.join(',')}`;
  }
  if (query && query !== '') {
    q = `${q} ${query}`;
  }

  const response = await githubFetch(
    `/search/issues?q=${encodeURIComponent(q)}&page=${page}&per_page=${defaultPerPage}`
  );
  const data = await response.json();
  return {
    issues: data.items as Issue[],
    link: response.headers.get('link') || undefined,
  };
}

export async function getIssue(issueNumber: number): Promise<Issue | null> {
  try {
    const response = await githubFetch(`/repos/${owner}/${repo}/issues/${issueNumber}`);
    const data = await response.json();

    if ('pull_request' in data) {
      console.log(`${issueNumber} is a PR`);
      return null;
    }

    return data as Issue;
  } catch (error: any) {
    if (error.message.includes('404')) {
      console.log(`${issueNumber} not found`);
      return null;
    }
    throw error;
  }
}

export async function getComments(issueNumber: number): Promise<Comment[]> {
  const response = await githubFetch(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
  return response.json() as Promise<Comment[]>;
}

export async function createComment(issueNumber: number, body: string): Promise<Comment> {
  const response = await githubFetch(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  });
  return response.json() as Promise<Comment>;
}

export async function getAllLabels(): Promise<string[]> {
  let allLabels: string[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const response = await githubFetch(`/repos/${owner}/${repo}/labels?per_page=${perPage}&page=${page}`);
    const data = await response.json();
    allLabels = allLabels.concat(data.map((label: any) => label.name));

    if (data.length < perPage) {
      break;
    }
    page++;
  }

  return allLabels;
}
