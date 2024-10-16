import { PageData } from '@/types';
import { pad0, sundayWeeksAgo } from '@/utils';

/** groupedPosts.get('2023')?.get('05')?.get('05') */
export type GroupedPosts = Map<string, Map<string, Map<string, PageData[]>>>;

// PageData[] are newer first
export function groupPostsByDate(posts: PageData[]): GroupedPosts {
  console.log('grouping');

  const result = new Map<string, Map<string, Map<string, PageData[]>>>();
  posts.forEach((post) => {
    const date = new Date(post.published);
    const year = date.getFullYear().toString();
    const month = pad0(date.getMonth() + 1);
    const day = pad0(date.getDate());
    if (!result.has(year)) {
      result.set(year, new Map<string, Map<string, PageData[]>>());
    }
    const yearMap = result.get(year)!;
    if (!yearMap.has(month)) {
      yearMap.set(month, new Map<string, PageData[]>());
    }
    const monthMap = yearMap.get(month)!;
    if (!monthMap.has(day)) {
      monthMap.set(day, []);
    }
    monthMap.get(day)!.push(post);
  });
  return result;
}

export function getPostCountInYear(
  groupedPosts: GroupedPosts,
  year: number,
): number {
  let postCount = 0;
  for (const [, days] of groupedPosts.get(year.toString()) ?? []) {
    for (const [, posts] of days) {
      postCount += posts.length;
    }
  }
  return postCount;
}

export function getPostCountInPastYear(groupedPosts: GroupedPosts): number {
  let postCount = 0;
  const calendarStartDay = sundayWeeksAgo(new Date(), 52);
  for (const [year, months] of groupedPosts) {
    for (const [month, days] of months) {
      for (const [day, posts] of days) {
        if (new Date(`${year}-${month}-${day}`) >= calendarStartDay) {
          postCount += posts.length;
        }
      }
    }
  }
  return postCount;
}

// Not using for now
// export class BlogManager {
//   public posts: PageData[];
//   public groupedPosts: GroupedPosts;

//   constructor(posts: PageData[]) {
//     this.posts = posts;
//     this.groupedPosts = groupPostsByDate(posts);
//   }

//   getPostsByDate(date: string): PageData[] {
//     const [year, month, day] = date.split('-');
//     return this.groupedPosts.get(year)?.get(month)?.get(day) ?? [];
//   }

//   //
//   // getPostsByMonth(): PageData[] {
//   // }
// }
