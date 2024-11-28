import siteData from '@/generated/siteData.json';
import RepoList from '@/components/RepoList/RepoList';

export const metadata = {
  title: 'My GitHub Repositories',
  description: 'Check out my open source projects',
};

export default function Repositories() {
  return (
    <>
      {siteData.repositories.totalCount > 0 && (
        <RepoList repos={siteData.repositories.nodes} />
      )}
    </>
  );
}
