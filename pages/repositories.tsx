import { GetStaticProps } from 'next';
import repos from '@/generated/repos.json';

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
