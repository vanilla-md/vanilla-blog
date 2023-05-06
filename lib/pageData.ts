import { toHtml } from 'hast-util-to-html';
import type { VFile } from 'vfile';
import type { Matter, Meta } from '@/types';
import type { PageData } from '@/types';

function getReadingTime(meta: Meta): string {
  const { readingTime } = meta;
  let minute: number;
  if (readingTime === undefined) {
    minute = 0;
  } else if (typeof readingTime === 'number') {
    minute = readingTime;
  } else {
    minute = readingTime[1];
  }
  return minute > 1 ? `${Math.ceil(minute)} minutes` : `under 1 minute`;
}

function stringifyDate(timeLike: Date | string): string {
  const date = new Date(timeLike);
  if (isNaN(date.getTime())) {
    throw new Error('`date` or `published` set in front matter is invalid');
  }
  return date.toISOString();
}

// matter.date/matter.published > date from vfile.basename > meta.published
function getPublishedTime(file: VFile, matter: Matter, meta: Meta): string {
  const dateFromMatter = matter.published ?? matter.date;
  if (dateFromMatter) {
    return stringifyDate(dateFromMatter);
  }

  const dateFromFilename = parseDateFromFilename(file);
  if (dateFromFilename !== null) {
    return dateFromFilename.toISOString();
  }

  if (meta.published) {
    return stringifyDate(meta.published);
  }
  return stringifyDate(new Date(0));
}

function parseDateFromFilename(file: VFile) {
  const regex = /^(\d{4}-\d{2}-\d{2})-(?:.*)\.md$/;
  const matches = file.basename!.match(regex);

  if (matches !== null) {
    const date = new Date(matches[1]);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
}

function getModifiedTime(matter: Matter, meta: Meta): string | undefined {
  if (matter.modified) {
    return stringifyDate(matter.modified);
  }
  if (meta.modified) {
    return stringifyDate(meta.modified);
  }
  return undefined;
}

export function resolvePageDate(file: VFile): PageData {
  const { matter = {}, meta = {} } = file.data;
  const published = getPublishedTime(file, matter, meta);
  return {
    slug: file.data.slug!,
    relativePath: file.data.relativePath!,
    url: file.data.url!,
    /**
     * Title priority:
     *   1. `matter.title`
     *   2. h1 of the MKD (which `meta.title` would be inferred from)
     *   3. Slug of the filename
     *     - Which would be title cased and insert as h1 by remarkAddH1
     *     - Then `meta.title` would be inferred from the h1 added
     */
    title: matter.title ?? meta.title!,
    description: meta.description ?? '',
    descriptionHtml: toHtml(meta.descriptionHast),
    published: published,
    modified: getModifiedTime(matter, meta) ?? published,
    readingTime: getReadingTime(meta),
    tags: matter.tags ?? [],
    author: meta.author ?? '',
  };
}
