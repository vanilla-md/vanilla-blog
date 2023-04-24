import { outputFile } from 'fs-extra';
import config from '../vanilla.config.json';

if (!config.login) {
  throw new Error('`login` must be provided in `vanilla.config.json`');
}

async function getJSON(url: string, filePath: string) {
  const res = await fetch(url);
  const profile = await res.json();

  await outputFile(filePath, JSON.stringify(profile, undefined, 2));
}

async function getProfile() {
  const url = `https://api.github.com/users/${config.login}`;
  const filePath = './generated/profile.json';
  await getJSON(url, filePath);
}

async function getRepos() {
  const url = `https://api.github.com/users/${config.login}/repos`;
  const filePath = './generated/repos.json';

  await getJSON(url, filePath);
}

(async () => await Promise.all([getProfile(), getRepos()]))();
