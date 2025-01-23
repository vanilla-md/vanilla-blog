import { Heading } from '@primer/react';
import { padHttp } from '@/utils/helpers';
import { Icon } from '../Icons/Icon';
import siteData from '@/generated/siteData.json';
import MutedLink from '../Link/MutedLink';
import classes from './Profile.module.css';

const VCardListIcon = ({ iconName }: { iconName: string }) => (
  <Icon className={classes.VCardListIcon} iconName={iconName} />
);

const VCardListItem = ({
  iconName,
  children,
}: {
  iconName: string;
  children: React.ReactNode;
}) => (
  <li className={classes.VCardListItem}>
    <VCardListIcon iconName={iconName} />
    {children}
  </li>
);

export function VCard() {
  return (
    <ul className={classes.VCardList}>
      {[
        siteData.name && (
          <VCardListItem
            iconName="mark-github"
            key={'github:' + siteData.login}
          >
            <MutedLink href={siteData.url} sx={{ fontWeight: 'bold' }}>
              @{siteData.login}
            </MutedLink>
          </VCardListItem>
        ),
        siteData.company && (
          <VCardListItem
            iconName="organization"
            key={'company:' + siteData.company}
          >
            {siteData.company}
          </VCardListItem>
        ),
        siteData.location && (
          <VCardListItem
            iconName="location"
            key={'location:' + siteData.location}
          >
            {siteData.location}
          </VCardListItem>
        ),
        siteData.websiteUrl && (
          <VCardListItem
            iconName="link"
            key={'websiteUrl:' + siteData.websiteUrl}
          >
            <MutedLink href={padHttp(siteData.websiteUrl)}>
              {siteData.websiteUrl}
            </MutedLink>
          </VCardListItem>
        ),
        siteData.email && (
          <VCardListItem iconName="mail" key={'email:' + siteData.email}>
            <MutedLink href={`mailto:${siteData.email}`}>
              {siteData.email}
            </MutedLink>
          </VCardListItem>
        ),
      ]}
    </ul>
  );
}

export default function Profile() {
  return (
    <>
      <address className={classes.ProfileBase}>
        <Heading as="h2" className={classes.ProfileHeading}>
          Profile
        </Heading>
        <VCard />
      </address>
    </>
  );
}
