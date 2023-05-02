import { GetStaticProps } from 'next';
import repos from '@/generated/repos.json';
import Head from 'next/head';

export default function Repositories({
  repos,
}: {
  repos: {
    id: number;
    full_name: string;
  }[];
}) {
  return (
    <>
      <Head>
        <title>My GitHub Repositories</title>
        <meta name="description" content="Check out my open source projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Repositories</div>
      <ul>
        {repos.map(({ id, full_name }) => (
          <li key={id}>{full_name}</li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      repos,
    },
  };
};
