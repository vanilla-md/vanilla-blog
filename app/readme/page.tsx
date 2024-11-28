import { Metadata } from 'next';
import { getReadmePageData } from '@/lib/readme';
import Article from '@/components/Article';

// https://html.spec.whatwg.org/multipage/semantics.html#standard-metadata-names
export async function generateMetadata(): Promise<Metadata> {
  const postData = await getReadmePageData();
  return {
    title: 'Readme.md',
    description: postData.description,
    generator: 'vanilla blog',
    keywords: postData.tags?.join(', '),
  };
}

export default async function About() {
  const postData = await getReadmePageData();
  return (
    <>
      <Article html={postData.contentHtml} />
    </>
  );
}
