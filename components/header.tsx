import { PageHeader } from '@primer/react/drafts';
import viewer from '@/generated/viewer.json';

export default function Header() {
  return (
    <>
      <PageHeader sx={{ gap: 0 }}>
        <PageHeader.TitleArea>
          <PageHeader.Title sx={{ fontSize: 4 }}>{viewer.name ?? viewer.login}</PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Description sx={{ fontSize: 3, color: 'fg.muted' }}>
          {viewer.bio}
        </PageHeader.Description>
      </PageHeader>
    </>
  );
}
