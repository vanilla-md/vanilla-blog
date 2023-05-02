import { writeFile } from 'node:fs/promises';
import { rss } from 'xast-util-feed';
import { toXml } from 'xast-util-to-xml';
import viewer from '@/generated/viewer.json';
import { padHttp } from '@/utils/index.js';
import { getSortedPostsData } from '@/lib/posts';

const feedPath = 'feed.xml';
const name = viewer.name ?? viewer.login;

const channel = {
  title: `${name}'s Blog`,
  url: padHttp(viewer.websiteUrl ?? `${viewer.login}.github.io`),
  feedUrl: padHttp(`${viewer.websiteUrl ?? `${viewer.login}.github.io`}/feedPath`),
  // lang: 'en',
  author: name,
};

const data = await getSortedPostsData();

await writeFile(`./public/${feedPath}`, toXml(rss(channel, data)));

console.log(`xast-util-feed: generated public/${feedPath}`);
