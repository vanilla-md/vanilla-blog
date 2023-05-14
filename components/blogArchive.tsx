import {
  Box,
  Text,
  FilterList,
  Heading,
  StyledOcticon,
  SxProp,
  Timeline,
  themeGet,
} from '@primer/react';
import styled from 'styled-components';
import type { PageData } from '@/types';
import { type GroupedPosts } from '@/lib/blogManager';
import { FileIcon, FlameIcon } from '@primer/octicons-react';
import { sundayWeeksAgo, dateToYMD, pad0, months, lastDayInPreviousMonth, trim0 } from '@/utils';
import BorderBox from './borderBox';
import Link from './link';

const GridBox = styled(Box)`
  margin-top: ${themeGet('space.4')};

  display: grid;

  grid:
    'heading       yearList'
    'activityList  yearList'/
    1fr 165px;

  @media (max-width: ${themeGet('breakpoints.1')}) {
    grid:
      'heading     '
      'activityList'/
      1fr;
  }
`;

function inferYearRangeArray(groupedPosts: GroupedPosts): number[] {
  const from = Math.min(...Array.from(groupedPosts.keys()).map((year) => parseInt(year)));
  const to = new Date().getFullYear();
  return Array.from({ length: to - from + 1 }, (_, i) => to - i);
}

type RangeDate = { year: string; month: string; day: string };

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
  [from, to]: [RangeDate, RangeDate]
) {
  // `year` may be less than 4 digits. We don't pad 0s. ？？？😄
  if (parseInt(year) < parseInt(from.year) || parseInt(year) > parseInt(to.year)) {
    return false;
  }
  // Don't want more `parseInt`. '03' < '11' should just work
  if (month === undefined) {
    return true;
  }
  if ((year === from.year && month < from.month) || (year === to.year && month > to.month)) {
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
  selectedDate?: string
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

function BlogArchive({
  groupedPosts,
  selectedYear,
  selectedDate,
  onYearSelect,
}: {
  groupedPosts: GroupedPosts;
  selectedYear?: number;
  selectedDate?: string;
  onYearSelect: (year: number) => void;
}) {
  const years = inferYearRangeArray(groupedPosts);
  const [fromDate, toDate] = inferDateRange(years, selectedYear, selectedDate);
  const postsOfSelectedDate =
    selectedDate && groupedPosts.get(toDate.year)?.get(toDate.month)?.get(toDate.day);

  const timelines: JSX.Element[] = [];

  if (postsOfSelectedDate) {
    const date = dateToRangeDate(new Date(selectedDate));
    timelines.push(
      <Timeline key={`${selectedDate!}-selected`} sx={{ pb: 4 }}>
        <TimelineHeading date={date} type="selected" />
        {postsOfSelectedDate.map((post) => (
          <TimelineItem key={post.slug} date={date} post={post} />
        ))}
      </Timeline>
    );

    const selectedMonth = groupedPosts.get(toDate.year)?.get(toDate.month)!;
    const remainingDaysInMonth = Array.from(selectedMonth.entries()).filter(
      ([day]) => Number(day) < Number(toDate.day)
    );
    if (remainingDaysInMonth.length > 0) {
      timelines.push(
        <Timeline key={`${selectedDate!}-remaining`} sx={{ pb: 4 }}>
          <TimelineHeading date={{ ...toDate }} type="remaining" />
          {remainingDaysInMonth.map(([day, posts]) =>
            posts.map((post) => (
              <TimelineItem key={post.slug} date={{ ...toDate, day }} post={post} />
            ))
          )}
        </Timeline>
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
                  <TimelineItem key={post.slug} date={{ year, month, day }} post={post} />
                );
              }
            }
          }
          if (timelineItems.length > 0) {
            timelines.push(
              <Timeline key={`${year}-${month}`} sx={{ pb: 4 }}>
                <TimelineHeading date={{ year, month, day: '01' }} type="month" />
                {timelineItems}
              </Timeline>
            );
          }
        }
      }
    }
  }

  return (
    <GridBox as="section">
      <Heading sx={{ mb: 3, fontSize: 2, fontWeight: 'normal', gridArea: 'heading' }}>
        Archive
      </Heading>
      <Box sx={{ gridArea: 'activityList' }}>{timelines}</Box>
      <FilterList sx={{ gridArea: 'yearList', display: ['none', 'none', 'block'], ml: 4, px: 3 }}>
        {years.map((year) => (
          <FilterList.Item
            key={year}
            selected={year === (selectedYear ?? years[0])}
            // href={`?from=${year.from}&to=${year.to}`}
            onClick={() => onYearSelect(year)}
            sx={{ borderRadius: 2, fontSize: 0, mb: 2 }}
          >
            {year}
          </FilterList.Item>
        ))}
      </FilterList>
    </GridBox>
  );
}

export default BlogArchive;

function TimelineHeading({
  date,
  type = 'month',
}: {
  date: RangeDate;
  type?: 'selected' | 'remaining' | 'month';
}) {
  return (
    <Heading
      as="h3"
      sx={{
        fontSize: 0,
        height: '14px',
        py: 1,
        mb: 3,
        borderBottomStyle: 'solid',
        borderBottomColor: 'border.default',
        borderBottomWidth: 1,
      }}
    >
      <Text sx={{ bg: 'canvas.default', pl: 2, pr: 3 }}>
        {type === 'selected' && (
          <>
            {months[Number(date.month) - 1]} {date.day.replace(/^0/, '') + ','}
            <Text sx={{ color: 'fg.muted' }}> {date.year}</Text>
          </>
        )}
        {type === 'remaining' && (
          <>
            {months[Number(date.month) - 1]} 1 <Text sx={{ color: 'fg.muted' }}>to</Text>{' '}
            {months[Number(date.month) - 1]} {trim0(date.day) + ','}
            <Text sx={{ color: 'fg.muted' }}> {date.year}</Text>
          </>
        )}
        {type === 'month' && (
          <>
            {months[Number(date.month) - 1]}
            <Text sx={{ color: 'fg.muted' }}> {date.year}</Text>
          </>
        )}
      </Text>
    </Heading>
  );
}

const StyledFileIcon = styled(FileIcon)`
  float: left;
  margin-top: 5px;
  fill: ${themeGet('colors.success.fg')};
`;

function TimelineItem({ post, date }: { post: PageData; date: RangeDate }) {
  return (
    <Timeline.Item key={post.slug}>
      <Timeline.Badge>
        <StyledOcticon icon={FlameIcon} />
      </Timeline.Badge>
      <Timeline.Body sx={{ color: 'fg.default' }}>
        <Heading
          as="h4"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 3,
            fontSize: 2,
            fontWeight: 'normal',
          }}
        >
          <Text>Published a post</Text>
          <Text sx={{ fontSize: 0, color: 'fg.muted' }}>
            {months[Number(date.month) - 1].slice(0, 3) + ' ' + trim0(date.day)}
          </Text>
        </Heading>
        <BorderBox sx={{ padding: 3 }}>
          <StyledFileIcon />
          <Box sx={{ mx: 4 }}>
            <Heading as="h3" sx={{ fontSize: 3 }}>
              <Link href={post.relativePath.replace(/\.md$/, '')}>{post.title}</Link>
            </Heading>
            <Box sx={{ my: 2, fontSize: 1, color: 'fg.muted' }}>{post.description}</Box>
          </Box>
        </BorderBox>
      </Timeline.Body>
    </Timeline.Item>
  );
}
