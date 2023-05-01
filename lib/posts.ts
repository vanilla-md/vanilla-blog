import fs from 'fs';
import path from 'path';
import { read } from 'to-vfile';
import { createMarkdownProcessor } from './markdown';
import { generatePageDate } from './postData';

const postsDirectory = path.join(process.cwd(), './blog/posts');
const processor = createMarkdownProcessor();
const metaOnlyProcessor = createMarkdownProcessor(true);

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const file = await read(fullPath);

      const label = `Remark: processed meta of ${fullPath}`;
      console.time(label);
      const processedFile = await metaOnlyProcessor.process(file);
      console.timeEnd(label);
      const pageData = generatePageDate(
        processedFile.data.matter ?? {},
        processedFile.data.meta ?? {}
      );

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

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
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
  const label = `Remark: processed ${fullPath}`;
  console.time(label);
  const processedFile = await processor.process(file);
  console.timeEnd(label);
  const contentHtml = processedFile.toString();
  const pageData = generatePageDate(processedFile.data.matter ?? {}, processedFile.data.meta ?? {});

  return {
    slug: slug,
    contentHtml,
    ...pageData,
  };
}
