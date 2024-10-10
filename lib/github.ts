import { Octokit } from '@octokit/rest';
import { components } from '@octokit/openapi-types';

type Issue = components['schemas']['issue'];
type Comment = components['schemas']['issue-comment'];

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

const owner = process.env.GITHUB_OWNER as string;
const repo = process.env.GITHUB_REPO as string;
const defaultPerPage = 20;

export interface IssuesAndPagination {
  issues: Issue[];
  link: string | undefined;
}

export async function getIssues(page = 1): Promise<IssuesAndPagination> {
  const response = await octokit.issues.listForRepo({
    owner,
    repo,
    creator: owner,
    state: 'open',
    per_page: defaultPerPage,
    page,
    q: 'is:issue',
    // labels: label,
  });
  const { data, headers } = response;
  return { issues: data, link: headers['link'] };
}

export async function searchIssues(query: string, labels: string[], page = 1): Promise<IssuesAndPagination> {
  let q = `is:issue is:open repo:${owner}/${repo}`;
  if (query && query !== '') {
    q = `${query} ` + q;
  }
  if (labels && labels.length > 0) {
    q += ` label:${labels.join(',')}`;
  }

  const response = await octokit.search.issuesAndPullRequests({
    q,
    page,
    per_page: defaultPerPage,
  });
  const { data, headers } = response;
  return {
    issues: data.items as Issue[],
    link: headers['link'],
  };
}

export async function getIssue(issueNumber: number): Promise<Issue | null> {
  try {
    const { data } = await octokit.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
    });

    if (data.pull_request) {
      console.log(`${issueNumber} is a PR`);
      return null;
    }

    return data;
  } catch (error: any) {
    if (error.status === 404) {
      console.log(`${issueNumber} not found`);
      return null;
    }
    throw error;
  }
}

export async function getComments(issueNumber: number): Promise<Comment[]> {
  const { data } = await octokit.issues.listComments({
    owner,
    repo,
    issue_number: issueNumber,
  });
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

export async function getAllLabels(): Promise<string[]> {
  let allLabels: string[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const { data } = await octokit.issues.listLabelsForRepo({
      owner,
      repo,
      per_page: perPage,
      page: page,
    });
    allLabels = allLabels.concat(data.map((label) => label.name));

    if (data.length < perPage) {
      break;
    }
    page++;
  }

  return allLabels;
}
