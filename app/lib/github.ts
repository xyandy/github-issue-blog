import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

const owner = process.env.GITHUB_OWNER || 'xyandy';
const repo = process.env.GITHUB_REPO || 'github-issue-blog';

export async function getIssues(page = 1, perPage = 10) {
  const { data } = await octokit.issues.listForRepo({
    owner,
    repo,
    creator: owner,
    state: 'open',
    labels: 'blog',
    per_page: perPage,
    page,
  });
  return data;
}

export async function getIssue(issueNumber: number) {
  const { data } = await octokit.issues.get({
    owner,
    repo,
    issue_number: issueNumber,
  });
  return data;
}

export async function getComments(issueNumber: number) {
  const { data } = await octokit.issues.listComments({
    owner,
    repo,
    issue_number: issueNumber,
  });
  return data;
}

export async function createComment(issueNumber: number, body: string) {
  const { data } = await octokit.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  });
  return data;
}

export async function searchIssues(query: string) {
  const { data } = await octokit.search.issuesAndPullRequests({
    q: `${query} repo:${owner}/${repo} label:blog`,
  });
  return data.items;
}
