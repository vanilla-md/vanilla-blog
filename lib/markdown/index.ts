import { padHttp } from '@/utils';
import path from 'path';
import { createProcessor } from './processor';
import siteData from '@/generated/siteData.json';

// TODO: Get these from some configuration
const websiteUrl = padHttp(
  siteData.websiteUrl ?? `${siteData.login}.github.io`,
);
const blogRoot = 'blog';
const srcDir = path.join(process.cwd(), blogRoot);

const processor = createProcessor({ srcDir, websiteUrl });
const metaOnlyProcessor = createProcessor({
  srcDir,
  websiteUrl,
  metaOnly: true,
});

export * from './processor';
export { processor, metaOnlyProcessor, srcDir };
