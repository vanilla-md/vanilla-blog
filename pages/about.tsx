import { Box } from '@primer/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getAboutPageDate } from '@/lib/about';
import { PageData } from '@/types';

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
      <Box
        as="article"
        sx={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'border.default',
          borderRadius: 2,
          px: 5,
          py: 4,
        }}
      >
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Box>
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
