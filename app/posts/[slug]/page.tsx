import { Metadata } from 'next';
import { getAllPostSlugs, getPostDataBySlug } from '@/lib/posts';
import Article from '@/components/Article';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ slug }) => ({
    slug: encodeURI(slug),
  }));
}

// postData: PageData & {
// contentHtml: string;
// };

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const postData = await getPostDataBySlug(decodeURI(params.slug));
  return {
    title: postData.title,
    description: postData.description,
    keywords: postData.tags?.join(', '),
    other: { date: postData.published },
  };
};

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const result = (await getPostDataBySlug(decodeURI(params.slug)))
    .renderedElement;
  return <Article>{result}</Article>;
}
