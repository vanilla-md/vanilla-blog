import type { Entry } from 'xast-util-feed';

export interface PostData extends Entry {
  title: string;
  published: string;
  modified: string;
  description: string;
  readingTime: string;
  tags: string[];
}
