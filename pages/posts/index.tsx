import Link from '@/components/link';
import { getSortedPostsData } from '@/lib/posts';
import { PostData } from '@/types';
import { GetStaticProps } from 'next';

export default function Posts({ allPostsData }: { allPostsData: (PostData & { slug: string })[] }) {
  return (
    <>
      <div>Posts</div>
      <ul>
        {allPostsData.map(({ slug, published, title, description }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>{title}</Link>
            <br />
            {published}
            {description}
          </li>
        ))}
      </ul>
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
