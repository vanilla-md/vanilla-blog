import { getPostsCount } from '@/lib/posts';
import siteDate from '@/generated/siteData.json';
import { outputFile } from 'fs-extra';

const postsCount = await getPostsCount();
await outputFile(
  './generated/siteData.json',
  JSON.stringify(
    Object.assign(siteDate, { posts: { totalCount: postsCount } }),
    undefined,
    2
  )
);
