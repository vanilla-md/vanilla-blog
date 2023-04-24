import Link from '@/components/link';
import { getSortedPostsData } from '@/lib/posts';
import { GetStaticProps } from 'next';

export default function Posts({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    slug: string;
  }[];
}) {
  return (
    <>
      <div>Posts</div>
      <ul>
        {allPostsData.map(({ slug: id, date, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            {date}
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
