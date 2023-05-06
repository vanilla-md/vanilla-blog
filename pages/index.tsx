import { useEffect, useMemo, useReducer, useState } from 'react';
import Head from 'next/head';
import { Box, Text } from '@primer/react';
import siteData from '@/generated/siteData.json';
import Showcase from '@/components/showcase';
import { ProfileItemShowcase } from '@octokit/graphql-schema';
import CalendarWithTooltip from '@/components/calendar';
import BlogArchive from '@/components/blogArchive';
import { getSortedPostsData } from '@/lib/posts';
import type { GetStaticProps } from 'next';
import type { PageData } from '@/types';
import { groupPostsByDate } from '@/lib/blogManager';

const itemShowcase = siteData.itemShowcase;

export default function Home({ allPostsData }: { allPostsData: PageData[] }) {
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const groupedPosts = useMemo(() => groupPostsByDate(allPostsData), [allPostsData]);

  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="Welcome to my personal blog" />
        <meta name="keywords" content="blog" />
      </Head>

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

      <Box>
        {itemShowcase.items.totalCount && (
          <Showcase
            sx={{ marginTop: 4 }}
            itemShowcase={itemShowcase as Required<ProfileItemShowcase>}
          />
        )}
      </Box>

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

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
