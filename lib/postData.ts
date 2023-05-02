import { basename } from 'path';
import viewer from '@/generated/viewer.json';
import { padHttp } from '@/utils';
import { toHtml } from 'hast-util-to-html';
import type { VFile } from 'vfile';
import type { Matter, Meta, PostData } from '@/types';

function getUrl(file: VFile) {
  return new URL(basename(file.basename!, file.extname), padHttp(viewer.websiteUrl)).toString();
}

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

function getModifiedTime(matter: Matter, meta: Meta): string {
  if (matter.modified) {
    return stringifyDate(matter.modified);
  }
  if (meta.modified) {
    return stringifyDate(meta.modified);
  }
  return stringifyDate(new Date(0));
}

export function generatePageDate(file: VFile): PostData {
  const { matter = {}, meta = {} } = file.data;
  return {
    title: matter.title ?? meta.title ?? '',
    url: getUrl(file),
    description: meta.description ?? '',
    descriptionHtml: toHtml(meta.descriptionHast),
    published: getPublishedTime(file, matter, meta),
    modified: getModifiedTime(matter, meta),
    readingTime: getReadingTime(meta),
    tags: matter.tags ?? [],
  };
}
