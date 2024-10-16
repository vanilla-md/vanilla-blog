import { writeFile } from 'node:fs/promises';
import { atom } from 'xast-util-feed';
import { toXml } from 'xast-util-to-xml';
import siteData from '@/generated/siteData.json';
import { getSortedPostsData } from '@/lib/posts';
import { padHttp } from '@/utils';

// TODO: Configuration
const feedPath = 'feed.xml';
const name = siteData.name ?? siteData.login;

const websiteUrl = padHttp(
  siteData.websiteUrl ?? `${siteData.login}.github.io`,
);

const channel = {
  title: `${name}'s Blog`,
  url: websiteUrl,
  feedUrl: new URL('feed.xml', websiteUrl).href,
  // lang: 'en',
  author: name,
};

const data = await getSortedPostsData();

await writeFile(`./public/${feedPath}`, toXml(atom(channel, data)));

console.log(`xast-util-feed: generated public/${feedPath}`);
