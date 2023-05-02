import { PageHeader } from '@primer/react/drafts';
import siteData from '@/generated/siteData.json';

export default function Header() {
  return (
    <>
      <PageHeader sx={{ gap: 0 }}>
        <PageHeader.TitleArea>
          <PageHeader.Title sx={{ fontSize: 4 }} as="h1">
            {siteData.name ?? siteData.login}
          </PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.Description sx={{ fontSize: 3, color: 'fg.muted' }}>
          {siteData.bio}
        </PageHeader.Description>
      </PageHeader>
    </>
  );
}
