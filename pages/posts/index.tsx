import Link from '@/components/link';
import { Box } from '@primer/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PostItem } from '@/components/postItem';
import { getSortedPostsData } from '@/lib/posts';
import type { PostData } from '@/types';
import viewer from '@/generated/viewer.json';

const name = viewer.name ?? viewer.login;

export default function Posts({ allPostsData }: { allPostsData: (PostData & { slug: string })[] }) {
  return (
    <>
      <Head>
        <title>My Blog Posts</title>
        <meta name="description" content="Read about my thoughts and experiences" />
      </Head>
      <Box as="ul" sx={{ padding: 0, margin: 0 }}>
        {allPostsData.map((postData) => (
          <PostItem key={postData.slug} {...postData} />
        ))}
      </Box>
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
