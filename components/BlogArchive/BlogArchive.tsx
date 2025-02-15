'use client';

import { Heading, Timeline } from '@primer/react';
import { type GroupedPosts } from '@/lib/blogManager';
import { sundayWeeksAgo, pad0, lastDayInPreviousMonth } from '@/utils';
import classes from './BlogArchive.module.css';

import type { JSX } from 'react';
import FilterList from '../FilterList/FilterList';
import TimelineHeading from './TimelineHeading';
import TimelineItem from './TimelineItem';
import type { PropsWithChildren } from 'react';

function inferYearRangeArray(groupedPosts: GroupedPosts): number[] {
  const from = Math.min(...groupedPosts.keys().map((year) => parseInt(year)));
  const to = new Date().getFullYear();
  return Array.from({ length: to - from + 1 }, (_, i) => to - i);
}

export type RangeDate = { year: string; month: string; day: string };

function rangeDateToDate(rangeDate: RangeDate) {
  const { year, month, day } = rangeDate;
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

function dateToRangeDate(date: Date) {
  return {
    year: String(date.getFullYear()),
    month: String(date.getMonth() + 1),
    day: String(date.getDate()),
  };
}

// TODO: [Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) to help
function isDateMaybeInRange(
  { year, month, day }: { year: string; month?: string; day?: string },
  [from, to]: [RangeDate, RangeDate],
) {
  // `year` may be less than 4 digits. We don't pad 0s. ？？？😄
  if (
    parseInt(year) < parseInt(from.year) ||
    parseInt(year) > parseInt(to.year)
  ) {
    return false;
  }
  // Don't want more `parseInt`. '03' < '11' should just work
  if (month === undefined) {
    return true;
  }
  if (
    (year === from.year && month < from.month) ||
    (year === to.year && month > to.month)
  ) {
    return false;
  }
  if (day === undefined) {
    return true;
  }
  if (
    (year === from.year && month === from.month && day < from.day) ||
    (year === to.year && month === to.month && day > to.day)
  ) {
    return false;
  }
  return true;
}

function inferDateRange(
  years: number[],
  selectedYear?: number,
  selectedDate?: string,
): [RangeDate, RangeDate] {
  if (!selectedYear && !selectedDate) {
    return [
      { year: String(years.at(-1)!), month: '01', day: '01' },
      {
        year: String(new Date().getFullYear()),
        month: pad0(new Date().getMonth() + 1),
        day: pad0(new Date().getDate()),
      },
    ];
  }
  if (selectedYear && selectedDate) {
    const [year, month, day] = selectedDate.split('-');
    return [
      { year, month: '01', day: '01' },
      { year, month, day },
    ];
  }
  if (!selectedYear && selectedDate) {
    const [year, month, day] = selectedDate.split('-');
    const calendarStartDay = sundayWeeksAgo(new Date(), 52);
    return [
      {
        year: String(calendarStartDay.getFullYear()),
        month: pad0(calendarStartDay.getMonth() + 1),
        day: pad0(calendarStartDay.getDate()),
      },
      { year, month, day },
    ];
  }
  return [
    { year: String(selectedYear), month: '01', day: '01' },
    { year: String(selectedYear), month: '12', day: '31' },
  ];
}

type BlogArchiveProps = PropsWithChildren<{
  groupedPosts: GroupedPosts;
  selectedYear?: number;
  selectedDate?: string;
  onYearSelect: (year: number) => void;
}>;

function BlogArchive({
  groupedPosts,
  selectedYear,
  selectedDate,
  onYearSelect,
}: BlogArchiveProps) {
  const years = inferYearRangeArray(groupedPosts);
  const [fromDate, toDate] = inferDateRange(years, selectedYear, selectedDate);
  const postsOfSelectedDate =
    selectedDate &&
    groupedPosts.get(toDate.year)?.get(toDate.month)?.get(toDate.day);

  const timelines: JSX.Element[] = [];

  if (postsOfSelectedDate) {
    const date = dateToRangeDate(new Date(selectedDate));
    timelines.push(
      <Timeline key={`${selectedDate!}-selected`} className={classes.Timeline}>
        <TimelineHeading date={date} type="selected" />
        {postsOfSelectedDate.map((post) => (
          <TimelineItem key={post.slug} date={date} post={post} />
        ))}
      </Timeline>,
    );

    const selectedMonth = groupedPosts.get(toDate.year)!.get(toDate.month)!;
    const remainingDaysInMonth = Array.from(selectedMonth.entries()).filter(
      ([day]) => Number(day) < Number(toDate.day),
    );
    if (remainingDaysInMonth.length > 0) {
      timelines.push(
        <Timeline
          key={`${selectedDate!}-remaining`}
          className={classes.Timeline}
        >
          <TimelineHeading date={{ ...toDate }} type="remaining" />
          {remainingDaysInMonth.map(([day, posts]) =>
            posts.map((post) => (
              <TimelineItem
                key={post.slug}
                date={{ ...toDate, day }}
                post={post}
              />
            )),
          )}
        </Timeline>,
      );
    }
  }

  if (postsOfSelectedDate) {
    const lastDay = lastDayInPreviousMonth(rangeDateToDate(toDate));
    toDate.year = lastDay.getFullYear().toString();
    toDate.month = pad0(lastDay.getMonth() + 1);
    toDate.day = pad0(lastDay.getDate());
  }

  for (const [year, months] of groupedPosts) {
    if (isDateMaybeInRange({ year }, [fromDate, toDate])) {
      for (const [month, days] of months) {
        // month === toDate.month already processed postsOfSelectedDate
        if (isDateMaybeInRange({ year, month }, [fromDate, toDate])) {
          const timelineItems: JSX.Element[] = [];
          for (const [day, posts] of days) {
            if (isDateMaybeInRange({ year, month, day }, [fromDate, toDate])) {
              for (const post of posts) {
                timelineItems.push(
                  <TimelineItem
                    key={post.slug}
                    date={{ year, month, day }}
                    post={post}
                  />,
                );
              }
            }
          }
          if (timelineItems.length > 0) {
            timelines.push(
              <Timeline key={`${year}-${month}`} className={classes.Timeline}>
                <TimelineHeading
                  date={{ year, month, day: '01' }}
                  type="month"
                />
                {timelineItems}
              </Timeline>,
            );
          }
        }
      }
    }
  }

  return (
    <section className={classes.Archive}>
      <Heading as="h2" className={classes.Heading}>
        Archive
      </Heading>
      <div className={classes.activityList}>{timelines}</div>
      <FilterList className={classes.YearList}>
        {years.map((year) => (
          <FilterList.Item
            className={classes.YearListItem}
            key={year}
            selected={year === (selectedYear ?? years[0])}
            // href={`?from=${year.from}&to=${year.to}`}
            onClick={() => onYearSelect(year)}
          >
            {year}
          </FilterList.Item>
        ))}
      </FilterList>
    </section>
  );
}

export default BlogArchive;
