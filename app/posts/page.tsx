import PostItem from '@/components/PostItem/PostItem';
import { getSortedPostsData } from '@/lib/posts';
import classes from './page.module.css';

export const metadata = {
  title: 'My Blog Posts',
  description: 'Read about my thoughts and experiences',
};

export default async function Posts() {
  const allPostsData = await getSortedPostsData();
  return (
    <>
      <ul className={classes.PostList}>
        {allPostsData.map((postData) => (
          <PostItem key={postData.slug} {...postData} />
        ))}
      </ul>
    </>
  );
}
