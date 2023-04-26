import { loadEnvConfig } from '@next/env';
import { outputFile } from 'fs-extra';
import { Octokit } from '@octokit/core';
import type { User, RateLimit, Repository } from '@octokit/graphql-schema';
import path from 'node:path';
import mime from 'mime';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

if (!process.env.GITHUB_TOKEN) {
  throw new Error('`GITHUB_TOKEN` must be provided in `.env.local`');
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'lonr vanilla',
});

async function queryViewer() {
  const response = await octokit.graphql<{
    viewer: User;
    rateLimit: RateLimit;
  }>(`
    {
      viewer {
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
          edges {
            node {
              displayName
              provider
              url
            }
          }
          totalCount
        }
        updatedAt
        url
        itemShowcase {
          hasPinnedItems
          items(first: 6) {
            totalCount
            edges {
              node {
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
        }
        repositories(privacy: PUBLIC) {
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
    }`);
  console.log(
    `Viewer data fetched. login: ${response.viewer.login} cost: ${response.rateLimit.cost}`
  );
  return response.viewer;
}

async function saveToJSON(jsonObj: {}, filePath: string) {
  await outputFile(filePath, JSON.stringify(jsonObj, undefined, 2));
}

async function prefetch() {
  const viewer = await queryViewer();
  const avatarBlob = await (await fetch(viewer.avatarUrl)).blob();
  const avatarMime = mime.getExtension(avatarBlob.type);
  const avatarFilename =
    path.basename(new URL(viewer.avatarUrl).pathname) + (avatarMime ? '.' + avatarMime : '');
  // await outputFile(
  //   path.join('./public', avatarFilename),
  //   Buffer.from(await avatarBlob.arrayBuffer())
  // );
  viewer.avatarUrl = path.join('/', avatarFilename);
  await saveToJSON(viewer, './generated/viewer.json');
}

prefetch();

// async function getRepos() {
//   const url = `https://api.github.com/users/${config.login}/repos`;
//   const filePath = './generated/repos.json';

//   await getJSON(url, filePath);
// }

// (async () => await Promise.all([getProfile(), getRepos()]))();
