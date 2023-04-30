import type { Entry } from 'xast-util-feed';

export interface PostData extends Entry {
  title: string;
  published: string;
  description: string;
}
