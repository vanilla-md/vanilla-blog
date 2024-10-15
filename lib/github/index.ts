import { Octokit } from '@octokit/core';
import type { User, RateLimit, Repository } from '@octokit/graphql-schema';
// tsx doesn't work with @next/env
// import { loadEnvConfig } from '@next/env';
// const projectDir = process.cwd();
// loadEnvConfig(projectDir);
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

if (!process.env.GITHUB_TOKEN) {
  throw new Error('`GITHUB_TOKEN` must be provided in `.env.local`');
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'lonr vanilla',
});

export async function getUserInfo() {
  const response = await octokit.graphql<{
    user: User;
    rateLimit: RateLimit;
  }>(
    `
    query getUserInfo($login: String!) {
      user(login: $login) {
        websiteUrl
        avatarUrl
        bio
        bioHTML
        company
        companyHTML
        createdAt
        email
        databaseId
        id
        location
        login
        name
        socialAccounts(first: 10) {
          nodes {
            displayName
            provider
            url
          }
          totalCount
        }
        updatedAt
        url
        itemShowcase {
          hasPinnedItems
          items(first: 6) {
            totalCount 
            nodes {
              __typename
              ... on Repository {
                isPrivate
                id
                name
                nameWithOwner
                isFork
                parent {
                  url
                  name
                  nameWithOwner
                }
                owner {
                  login
                }
                resourcePath
                url
                description
                descriptionHTML
                primaryLanguage {
                  color
                  id
                  name
                }
                stargazerCount
                forkCount
                updatedAt
              }
            }
          }
        }
        repositories(orderBy: {field: STARGAZERS, direction: DESC}, first: 10, privacy: PUBLIC) {
          nodes {
            ...RepoInfo
          }
          totalCount
        }
      }
      rateLimit {
        cost
        limit
        remaining
        resetAt
        used
        nodeCount
      }
    }
    ${repoInfoFragment}`,
    { login: process.env.LOGIN }
  );
  console.log(
    `octokit: user data fetched. login: ${response.user.login} cost: ${response.rateLimit.cost}`
  );
  return response.user;
}

const repoInfoFragment = `
  fragment RepoInfo on Repository {
    isPrivate
    id
    name
    nameWithOwner
    isTemplate
    isArchived
    isDisabled
    isFork
    parent {
      url
      name
      nameWithOwner
    }
    owner {
      login
    }
    resourcePath
    url
    description
    descriptionHTML
    primaryLanguage {
      color
      id
      name
    }
    stargazerCount
    forkCount
    licenseInfo {
      key
      name
      spdxId
      url
    }
    pushedAt
    updatedAt
    repositoryTopics(first: 10) {
      totalCount
      nodes {
        id
        resourcePath
        url
        topic {
          name
        }
      }
    }
  }`;

// Only get first 10
export async function getUserRepos() {
  const response = await octokit.graphql<{ user: User; rateLimit: RateLimit }>(
    `
    query getUserInfo($login: String!) {
      user(login: $login) {
        repositories(orderBy: {field: STARGAZERS, direction: DESC}, first: 10, privacy: PUBLIC) {
          nodes {
            ...RepoInfo
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
      rateLimit {
        cost
        limit
        remaining
        resetAt
        used
        nodeCount
      }
    }
    ${repoInfoFragment}`,
    { login: process.env.LOGIN }
  );
  return response.user.repositories;
}

function createRopeQuery(namesWithOwner: string[]) {
  return `
    query {
      ${namesWithOwner.map((nameWithOwner) => {
        const [owner, name] = nameWithOwner.split('/');
        return `
        ${nameWithOwner}: repository(name: "${name}", owner: "${owner}") {
          ...RepoFragment
        }
      `;
      })}
    }
    ${repoInfoFragment}`;
}

export async function getReposByName(namesWithOwner: string[]) {
  const query = createRopeQuery(namesWithOwner);
  let response = await octokit.graphql<Record<string, Repository>>(query);
  // make sure all repos are PUBLIC
  response = Object.fromEntries(
    Object.entries(response).filter(([, repo]) => repo.isPrivate !== true)
  );
  return response;
}
