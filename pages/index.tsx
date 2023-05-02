import Head from 'next/head';
import { Box, Text } from '@primer/react';
import viewer from '@/generated/viewer.json';
import Showcase from '@/components/showcase';
import { ProfileItemShowcase } from '@octokit/graphql-schema';

const itemShowcase = viewer.itemShowcase;

export default function Home() {
  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="Welcome to my personal blog" />
        <meta name="keywords" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        {
          /* {itemShowcase ?? (
          <Showcase
            sx={{ marginTop: 4 }}
            itemShowcase={itemShowcase as Required<ProfileItemShowcase>}
          />
        )} */

          <Showcase
            sx={{ marginTop: 4 }}
            itemShowcase={itemShowcase as Required<ProfileItemShowcase>}
          />
        }
        foo
      </Box>
      <Box
        sx={{
          border: '1px solid',
          marginTop: 2,
          borderColor: 'border.default',
          borderRadius: '12px',
          minHeight: '300px',
          padding: 4,
        }}
      >
        <Text> mona/README.md</Text>
      </Box>
    </>
  );
}
