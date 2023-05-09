import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { Box } from '@primer/react';
import { getAllPostSlugs, getPostDataBySlug } from '@/lib/posts';
import type { PageData } from '@/types';
import Article from '@/components/article';

export default function Post({
  postData,
}: {
  postData: PageData & {
    contentHtml: string;
  };
}) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
        <meta name="date" content={postData.published}></meta>
        {postData.tags?.length && <meta name="keywords" content={postData.tags.join(', ')}></meta>}
      </Head>
      <Article html={postData.contentHtml} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostDataBySlug(params?.slug as string);
  return {
    props: {
      postData,
    },
  };
};
