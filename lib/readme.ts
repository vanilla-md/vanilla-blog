import { cache } from 'react';
import path from 'path';
import { read } from 'to-vfile';
import { processor, srcDir } from './markdown';
import { resolvePageDate } from './pageData';

export const getReadmePageData = cache(async () => {
  const fullPath = path.join(srcDir, `README.md`);
  const file = await read(fullPath);

  const label = `unified: processed ${fullPath}`;
  console.time(label);
  const processedFile = await processor.process(file);
  console.timeEnd(label);

  const pageData = resolvePageDate(processedFile);
  const renderedElement = processedFile.result;

  return {
    ...pageData,
    renderedElement,
  };
});
