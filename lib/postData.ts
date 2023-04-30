import { Matter, Meta, PostData } from '@/types';

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

function stringifyTime(timeLike: Date | string): string {
  return new Date(timeLike).toISOString();
}

function getPublishedTime(matter: Matter, meta: Meta): string {
  const timeFromMatter = matter.published ?? matter.date;
  if (timeFromMatter) {
    return stringifyTime(timeFromMatter);
  }
  if (meta.published) {
    return stringifyTime(meta.published);
  }
  return stringifyTime(new Date(0));
}

function getModifiedTime(matter: Matter, meta: Meta): string {
  if (matter.modified) {
    return stringifyTime(matter.modified);
  }
  if (meta.modified) {
    return stringifyTime(meta.modified);
  }
  return stringifyTime(new Date(0));
}

export function generatePageDate(matter: Matter, meta: Meta): PostData {
  return {
    title: meta.title ?? matter.title ?? '',
    published: getPublishedTime(matter, meta),
    modified: getModifiedTime(matter, meta),
    description: meta.description ?? '',
    readingTime: getReadingTime(meta),
    tags: matter.tags ?? [],
  };
}
