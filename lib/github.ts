import { Octokit } from '@octokit/rest';
import { components } from '@octokit/openapi-types';

type Issue = components['schemas']['issue'];
type Comment = components['schemas']['issue-comment'];

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

const owner = process.env.GITHUB_OWNER as string;
const repo = process.env.GITHUB_REPO as string;
// const label = 'blog';

export async function getIssues(page = 1, perPage = 10): Promise<Issue[]> {
  const { data } = await octokit.issues.listForRepo({
    owner,
    repo,
    creator: owner,
    state: 'open',
    // labels: label,
    per_page: perPage,
    page,
  });
  return data;
}

export async function getIssue(issueNumber: number): Promise<Issue> {
  const { data } = await octokit.issues.get({
    owner,
    repo,
    issue_number: issueNumber,
  });
  return data;
}

export async function getComments(issueNumber: number): Promise<Comment[]> {
  const { data } = await octokit.issues.listComments({
    owner,
    repo,
    issue_number: issueNumber,
  });
  console.log(`data: ${data}`);
  return data;
}

export async function createComment(issueNumber: number, body: string): Promise<Comment> {
  const { data } = await octokit.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  });
  return data;
}

export async function searchIssues(query: string): Promise<Issue[]> {
  const q = `${query} is:issue is:open repo:${owner}/${repo}`;
  const { data } = await octokit.search.issuesAndPullRequests({
    q: q,
    per_page: 100,
  });
  return data.items as Issue[];
}
