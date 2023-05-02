import { Heading } from '@primer/react';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Me</title>
        <meta name="description" content="Learn more about the author of this blog" />
      </Head>
      <Heading as="h1">About Page</Heading>
      <p>Something</p>
    </>
  );
}
