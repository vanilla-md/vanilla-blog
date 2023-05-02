import { Heading, Link, themeGet } from '@primer/react';
import sx, { SxProp } from '@primer/react/lib-esm/sx';
import styled from 'styled-components';
import { padHttp } from '@/utils/helpers';
import { Icon } from './icon';
import siteData from '@/generated/siteData.json';
import MutedLink from './mutedLink';

const ProfileBase = styled.address<SxProp>`
  padding-top: ${themeGet('space.3')};
  font-style: normal;
  ${sx};
`;

const VCardList = styled.ul`
  margin: 0;
  padding-left: 0;
`;

const VCardListItem = styled.li`
  padding-top: 4px;
  list-style: none;
  font-style: normal;
  font-size: ${themeGet('fontSizes.1')};
`;

const VCardListIcon = styled(Icon)`
  color: ${themeGet('colors.fg.muted')};
  margin-right: 6px;
`;

export function VCard() {
  return (
    <VCardList>
      {[
        siteData.name && (
          <VCardListItem key={'github:' + siteData.login}>
            <VCardListIcon iconName="mark-github" />
            <MutedLink href={siteData.url} sx={{ fontWeight: 'bold' }}>
              @{siteData.login}
            </MutedLink>
          </VCardListItem>
        ),
        siteData.company && (
          <VCardListItem key={'company:' + siteData.company}>
            <VCardListIcon iconName="organization" />
            {siteData.company}
          </VCardListItem>
        ),
        siteData.location && (
          <VCardListItem key={'location:' + siteData.location}>
            <VCardListIcon iconName="location" />
            {siteData.location}
          </VCardListItem>
        ),
        siteData.websiteUrl && (
          <VCardListItem key={'websiteUrl:' + siteData.websiteUrl}>
            <VCardListIcon iconName="link" />
            <MutedLink href={padHttp(siteData.websiteUrl)}>{siteData.websiteUrl}</MutedLink>
          </VCardListItem>
        ),
        siteData.email && (
          <VCardListItem key={'email:' + siteData.email}>
            <VCardListIcon iconName="mail" />
            <MutedLink href={`mailto:${siteData.email}`}>{siteData.email}</MutedLink>
          </VCardListItem>
        ),
      ]}
    </VCardList>
  );
}

export default function Profile() {
  return (
    <>
      <ProfileBase>
        <Heading sx={{ mb: 2, fontSize: 2 }}>Profile</Heading>
        <VCard />
      </ProfileBase>
    </>
  );
}
