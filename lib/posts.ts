import { readdir } from 'node:fs/promises';
import path from 'path';
import { read } from 'to-vfile';
import { createMarkdownProcessor } from './markdown';
import { generatePageDate } from './pageData';

const postsDirectory = path.join(process.cwd(), './blog/posts');
const processor = createMarkdownProcessor();
const metaOnlyProcessor = createMarkdownProcessor(true);

// Used by `pages/posts/index.ts` and `scripts/genRss.ts`
export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = await readdir(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const file = await read(fullPath);

      const label = `unified: processed meta of ${fullPath}`;
      console.time(label);
      const processedFile = await metaOnlyProcessor.process(file);
      console.timeEnd(label);

      const pageData = generatePageDate(processedFile);

      // Combine the data with the slug
      return {
        slug,
        ...pageData,
      };
    })
  );
  // Sort posts by published
  return allPostsData.sort((a, b) => {
    if (a.published < b.published) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostsCount() {
  const fileNames = await readdir(postsDirectory);
  return fileNames.filter((fileName) => fileName.endsWith('.md')).length;
}

export async function getAllPostSlugs() {
  const fileNames = await readdir(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const file = await read(fullPath);

  const label = `unified: processed ${fullPath}`;
  console.time(label);
  const processedFile = await processor.process(file);
  console.timeEnd(label);

  const contentHtml = processedFile.toString();
  const pageData = generatePageDate(processedFile);

  return {
    slug: slug,
    contentHtml,
    ...pageData,
  };
}
