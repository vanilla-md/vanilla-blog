import Link from '@/components/link';
import { PostItem } from '@/components/postItem';
import { getSortedPostsData } from '@/lib/posts';
import { PostData } from '@/types';
import { Box } from '@primer/react';
import { GetStaticProps } from 'next';

export default function Posts({ allPostsData }: { allPostsData: (PostData & { slug: string })[] }) {
  return (
    <>
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
