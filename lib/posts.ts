import { readdir } from 'node:fs/promises';
import path from 'path';
import { read } from 'to-vfile';
import { createProcessor } from './markdown';
import { resolvePageDate } from './pageData';
import siteDate from '@/generated/siteData.json';
import { padHttp } from '@/utils';

// TODO: Get these from some configuration
const websiteUrl = padHttp(siteDate.websiteUrl);
const rootDir = 'blog';
const srcDir = path.join(process.cwd(), rootDir);
const postsDir = path.join(srcDir, 'posts');

const processor = createProcessor({ srcDir, websiteUrl });
const metaOnlyProcessor = createProcessor({ srcDir, websiteUrl, metaOnly: true });

// Used by `pages/posts/index.ts` and `scripts/genRss.ts`
export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = await readdir(postsDir);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDir, fileName);
      // Read markdown file as vFile
      const file = await read(fullPath);

      const label = `unified: processed meta of ${fullPath}`;
      console.time(label);
      const processedFile = await metaOnlyProcessor.process(file);
      console.timeEnd(label);

      return resolvePageDate(processedFile);
    })
  );
  // Sort posts data by published
  return allPostsData.sort((a, b) => {
    if (a.published < b.published) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostsCount() {
  const fileNames = await readdir(postsDir);
  return fileNames.filter((fileName) => fileName.endsWith('.md')).length;
}

export async function getAllPostSlugs() {
  const fileNames = await readdir(postsDir);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostDataBySlug(slug: string) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const file = await read(fullPath);

  const label = `unified: processed ${fullPath}`;
  console.time(label);
  const processedFile = await processor.process(file);
  console.timeEnd(label);

  const pageData = resolvePageDate(processedFile);
  const contentHtml = processedFile.toString();

  return {
    ...pageData,
    contentHtml,
  };
}
