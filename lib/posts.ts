import { readdir } from 'node:fs/promises';
import path from 'path';
import { read } from 'to-vfile';
import { metaOnlyProcessor, processor, srcDir } from './markdown';
import { resolvePageDate } from './pageData';
import { cache } from 'react';

const postsDir = path.join(srcDir, 'posts');

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
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

export const getPostDataBySlug = cache(async (slug: string) => {
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
});
