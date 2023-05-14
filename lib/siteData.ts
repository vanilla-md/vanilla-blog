import { User } from '@octokit/graphql-schema';
import { getUserInfo } from './github';
import { padHttp } from '@/utils';
import mime from 'mime';
import { outputFile } from 'fs-extra';
import path from 'path';

// Temporary solution
export type SiteData = User & {
  posts?: {
    totalCount: number;
  };
};

export async function resolveSiteData(): Promise<SiteData> {
  const viewer = await getUserInfo();

  // Save avatar and update the `avatarUrl`
  const avatarBlob = await (await fetch(viewer.avatarUrl)).blob();
  const avatarMime = mime.getExtension(avatarBlob.type);
  const avatarFilename =
    path.basename(new URL(viewer.avatarUrl).pathname) + (avatarMime ? '.' + avatarMime : '');
  await outputFile(
    path.join('./public/images', avatarFilename),
    Buffer.from(await avatarBlob.arrayBuffer())
  );
  viewer.avatarUrl = path.join('/images/', avatarFilename);

  return viewer;
}

// async function getRepos() {
//   const url = `https://api.github.com/users/${config.login}/repos`;
//   const filePath = './generated/repos.json';

//   await getJSON(url, filePath);
// }

// (async () => await Promise.all([getProfile(), getRepos()]))();
