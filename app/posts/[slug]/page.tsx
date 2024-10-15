import { Metadata } from 'next';
import { getAllPostSlugs, getPostDataBySlug } from '@/lib/posts';
import Article from '@/components/article';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ slug }) => ({
    slug: encodeURI(slug),
  }));
}

// postData: PageData & {
// contentHtml: string;
// };

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const postData = await getPostDataBySlug(decodeURI(params.slug));
  return {
    title: postData.title,
    description: postData.description,
    keywords: postData.tags?.join(', '),
    other: { date: postData.published },
  };
};

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostDataBySlug(decodeURI(params.slug));
  return <Article html={postData.contentHtml} />;
}
