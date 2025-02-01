import { unified, type Processor } from 'unified';
import vFileResolvePaths from './plugins/vFileResolvePaths';
import remarkResolveAssets from './plugins/remarkResolveAssets';
import vFileMatter from './plugins/vFileMatter';
import unifiedInferGitMeta from 'unified-infer-git-meta';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkAddH1 from './plugins/remarkAddH1';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkGithub from 'remark-github';
import remarkGemoji from 'remark-gemoji';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeMathjax from 'rehype-mathjax';
import rehypeStarryNight from './plugins/rehypeStarryNight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings, {
  Options as AutolinkHeadingsOptions,
} from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeAddImageSize from './plugins/rehypeAddImageSize';
import rehypeInferTitleMeta from 'rehype-infer-title-meta';
import rehypeInferDescriptionMeta from 'rehype-infer-description-meta';
import rehypeInferReadingTimeMeta from 'rehype-infer-reading-time-meta';
// import rehypeStringify from 'rehype-stringify';

import * as prod from 'react/jsx-runtime';
import rehypeReact, { Options as RehypeReactOptions } from 'rehype-react';
import { Anchor } from '@/md-components/Anchor';

import type { Root as MdastRoot } from 'mdast';
import type { Root as HastRoot } from 'hast';
import { h } from 'hastscript';
import { Image } from '@/md-components/Image';

const production = {
  components: { a: Anchor, img: Image },
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs,
};

// const p1 = unified().use(remarkParse);
// const p2 = unified().use(remarkParse).use(remarkRehype);
// const p3 = unified().use(remarkParse).use(remarkRehype).use(rehypeReact);

export interface MarkdownOptions {
  srcDir: string;
  websiteUrl: string;
  metaOnly?: boolean;
}

export const createProcessor = ({
  srcDir,
  websiteUrl,
  metaOnly = false,
}: MarkdownOptions): Processor<
  MdastRoot,
  HastRoot,
  HastRoot,
  HastRoot,
  JSX.Element
> => {
  const SKIP = () => undefined;
  return (
    unified()
      .data({ srcDir, websiteUrl })
      .use(vFileResolvePaths)
      .use(remarkResolveAssets)
      .use(vFileMatter)
      .use(unifiedInferGitMeta)
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkAddH1)
      .use(metaOnly ? SKIP : remarkGfm)
      .use(metaOnly ? SKIP : remarkGithub)
      .use(metaOnly ? SKIP : remarkMath)
      // .use(remarkMermaid, {
      //   launchOptions: {
      //     executablePath: '/usr/bin/google-chrome-stable',
      //     /* More puppeteer launch options */
      //   },
      // })
      .use(remarkGemoji)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(metaOnly ? SKIP : rehypeMathjax)
      .use(metaOnly ? SKIP : rehypeStarryNight)
      .use(metaOnly ? SKIP : rehypeSlug)
      // https://github.com/rehypejs/rehype-autolink-headings?tab=readme-ov-file#example-building-content-with-hastscript
      .use(metaOnly ? SKIP : rehypeAutolinkHeadings, {
        behavior: 'prepend',
        properties: { ariaHidden: true, tabIndex: -1, class: 'anchor' },
        content: h('span.octicon.octicon-link'),
      } as AutolinkHeadingsOptions)
      .use(rehypeExternalLinks, { rel: ['nofollow noopener noreferrer'] })
      .use(rehypeAddImageSize)
      .use(rehypeInferTitleMeta)
      .use(rehypeInferDescriptionMeta, { inferDescriptionHast: true })
      .use(rehypeInferReadingTimeMeta)
      .use(rehypeReact, { ...production } as RehypeReactOptions)
  );
};
