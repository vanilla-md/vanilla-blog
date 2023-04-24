import { PageHeader } from '@primer/react/drafts';
import Link from './link';

export default function Header() {
  return (
    <>
      <PageHeader sx={{ gap: 0 }}>
        <PageHeader.TitleArea>
          <PageHeader.Title sx={{ fontSize: 4 }}>Blog</PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Description sx={{ fontSize: 3, color: 'fg.muted' }}>
          Welcome to my blog.
        </PageHeader.Description>
      </PageHeader>
    </>
  );
}
