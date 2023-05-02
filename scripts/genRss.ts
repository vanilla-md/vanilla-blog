import { writeFile } from 'node:fs/promises';
import { atom } from 'xast-util-feed';
import { toXml } from 'xast-util-to-xml';
import siteData from '@/generated/siteData.json';
import { padHttp } from '@/utils/index.js';
import { getSortedPostsData } from '@/lib/posts';

const feedPath = 'feed.xml';
const name = siteData.name ?? siteData.login;

const channel = {
  title: `${name}'s Blog`,
  url: padHttp(siteData.websiteUrl ?? `${siteData.login}.github.io`),
  feedUrl: padHttp(`${siteData.websiteUrl ?? `${siteData.login}.github.io`}/${feedPath}`),
  // lang: 'en',
  author: name,
};

const data = await getSortedPostsData();

await writeFile(`./public/${feedPath}`, toXml(atom(channel, data)));

console.log(`xast-util-feed: generated public/${feedPath}`);
