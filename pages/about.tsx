import { Box } from '@primer/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getAboutPageDate } from '@/lib/about';
import { PageData } from '@/types';
import Article from '@/components/article';

export default function About({
  postData,
}: {
  postData: PageData & {
    contentHtml: string;
  };
}) {
  return (
    <>
      <Head>
        <title>About Me</title>
        <meta name="description" content="Learn more about the author of this blog" />
        <meta name="date" content={postData.published}></meta>
        {postData.tags?.length && <meta name="keywords" content={postData.tags.join(', ')}></meta>}
      </Head>
      <Article html={postData.contentHtml} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postData = await getAboutPageDate();
  return {
    props: {
      postData,
    },
  };
};
