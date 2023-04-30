import { Matter, Meta, PostData } from '@/types';

export function generatePageDate(matter: Matter, meta: Meta): PostData {
  return {
    title: meta.title ?? matter.title ?? '',
    published: String(meta.published ?? matter.date ?? new Date(0)),
    description: meta.description ?? '',
  };
}
