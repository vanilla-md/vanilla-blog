import Head from 'next/head';
import siteData from '@/generated/siteData.json';
import { RepoList } from '@/components/repoList';
import { Repository } from '@octokit/graphql-schema';

export default function Repositories() {
  return (
    <>
      <Head>
        <title>My GitHub Repositories</title>
        <meta name="description" content="Check out my open source projects" />
      </Head>
      {siteData.repositories.totalCount > 0 && <RepoList repos={siteData.repositories.nodes} />}
    </>
  );
}
