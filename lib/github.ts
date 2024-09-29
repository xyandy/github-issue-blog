import { Octokit } from '@octokit/rest';
import { components } from '@octokit/openapi-types';

type Issue = components['schemas']['issue'];
type Comment = components['schemas']['issue-comment'];

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

const owner = process.env.GITHUB_OWNER as string;
const repo = process.env.GITHUB_REPO as string;
const defaultPerPage = 100;

export async function getIssues(page = 1): Promise<Issue[]> {
  const { data } = await octokit.issues.listForRepo({
    owner,
    repo,
    creator: owner,
    state: 'open',
    per_page: defaultPerPage,
    page,
    q: 'is:issue',
    // labels: label,
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

export async function searchIssues(query: string, labels: string[], page = 1): Promise<Issue[]> {
  let q = `is:issue is:open repo:${owner}/${repo}`;
  if (query && query !== '') {
    q = `${query} ` + q;
  }
  if (labels && labels.length > 0) {
    q += ` label:${labels.join(',')}`;
  }

  const { data } = await octokit.search.issuesAndPullRequests({
    q,
    page,
    per_page: defaultPerPage,
  });
  return data.items as Issue[];
}
