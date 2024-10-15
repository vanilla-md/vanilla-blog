import { Metadata } from 'next';
import Overview from '@/components/overview';
import { getSortedPostsData } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Welcome to my personal blog',
};

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  return <Overview allPostsData={allPostsData} />;
}
