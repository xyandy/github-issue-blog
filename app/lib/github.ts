import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export async function getIssues(page = 1, perPage = 10) {
  const { data } = await octokit.issues.listForRepo({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    state: 'open',
    labels: 'blog',
    per_page: perPage,
    page,
  });
  return data;
}

export async function getIssue(issueNumber: number) {
  const { data } = await octokit.issues.get({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    issue_number: issueNumber,
  });
  return data;
}

export async function getComments(issueNumber: number) {
  const { data } = await octokit.issues.listComments({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    issue_number: issueNumber,
  });
  return data;
}

export async function createComment(issueNumber: number, body: string) {
  const { data } = await octokit.issues.createComment({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    issue_number: issueNumber,
    body,
  });
  return data;
}

export async function searchIssues(query: string) {
  const { data } = await octokit.search.issuesAndPullRequests({
    q: `${query} repo:${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO} label:blog`,
  });
  return data.items;
}
