import { Heading, Link, themeGet } from '@primer/react';
import sx, { SxProp } from '@primer/react/lib-esm/sx';
import styled from 'styled-components';
import { padHttp } from '@/utils/helpers';
import { Icon } from './icon';
import viewer from '@/generated/viewer.json';

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

const VCardListLink = styled(Link)`
  color: ${themeGet('colors.fg.default')};
  &:hover {
    color: ${themeGet('colors.accent.fg')};
  }
`;

export function VCard() {
  return (
    <VCardList>
      {[
        viewer.name && (
          <VCardListItem key={'github:' + viewer.login}>
            <VCardListIcon iconName="mark-github" />
            <VCardListLink href={viewer.url} sx={{ fontWeight: 'bold' }}>
              @{viewer.login}
            </VCardListLink>
          </VCardListItem>
        ),
        viewer.company && (
          <VCardListItem key={'company:' + viewer.company}>
            <VCardListIcon iconName="organization" />
            {viewer.company}
          </VCardListItem>
        ),
        viewer.location && (
          <VCardListItem key={'location:' + viewer.location}>
            <VCardListIcon iconName="location" />
            {viewer.location}
          </VCardListItem>
        ),
        viewer.websiteUrl && (
          <VCardListItem key={'websiteUrl:' + viewer.websiteUrl}>
            <VCardListIcon iconName="link" />
            <VCardListLink href={padHttp(viewer.websiteUrl)}>{viewer.websiteUrl}</VCardListLink>
          </VCardListItem>
        ),
        viewer.email && (
          <VCardListItem key={'email:' + viewer.email}>
            <VCardListIcon iconName="mail" />
            <VCardListLink href={`mailto:${viewer.email}`}>{viewer.email}</VCardListLink>
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
