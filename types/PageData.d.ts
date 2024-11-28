import type { Entry } from 'xast-util-feed';

export interface PageData extends Entry {
  relativePath: string;
  slug: string;
  url: string;
  title: string;
  published: string;
  modified: string;
  description: string;
  readingTime: string;
  tags: string[];
  author: string;
}
