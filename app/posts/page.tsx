import { Box } from '@primer/react';
import { PostItem } from '@/components/postItem';
import { getSortedPostsData } from '@/lib/posts';

export const metadata = {
  title: 'My Blog Posts',
  description: 'Read about my thoughts and experiences',
};

export default async function Posts() {
  const allPostsData = await getSortedPostsData();
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
