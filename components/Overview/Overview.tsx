'use client';
import { useMemo, useState } from 'react';
import siteData from '@/generated/siteData.json';
import Showcase from '@/components/Showcase';
import { ProfileItemShowcase } from '@octokit/graphql-schema';
import CalendarWithTooltip from '@/components/Calednar/Calendar';
import BlogArchive from '@/components/BlogArchive';
import type { PageData } from '@/types';
import { groupPostsByDate } from '@/lib/blogManager';

const itemShowcase = siteData.itemShowcase;

export default function Overview({
  allPostsData,
}: {
  allPostsData: PageData[];
}) {
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const groupedPosts = useMemo(
    () => groupPostsByDate(allPostsData),
    [allPostsData],
  );

  return (
    <>
      {/* <Box
        sx={{
          border: '1px solid',
          marginTop: 2,
          borderColor: 'border.default',
          borderRadius: 2,
          minHeight: '300px',
          padding: 4,
        }}
      >
        <Text> mona/README.md</Text>
      </Box> */}

      <div>
        {itemShowcase.items.totalCount && (
          <Showcase
            itemShowcase={itemShowcase as Required<ProfileItemShowcase>}
          />
        )}
      </div>

      <CalendarWithTooltip
        groupedPosts={groupedPosts}
        selectedYear={selectedYear}
        onDateSelect={setSelectedDate}
      />
      <BlogArchive
        groupedPosts={groupedPosts}
        selectedDate={selectedDate}
        selectedYear={selectedYear}
        onYearSelect={(year: number) => {
          setSelectedYear(year);
          setSelectedDate(undefined);
        }}
      />
    </>
  );
}
