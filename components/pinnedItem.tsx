import type { Repository } from '@octokit/graphql-schema';
import { Label, Link, themeGet } from '@primer/react';
import styled from 'styled-components';
import { Icon } from './icons/icon';
import BorderBox from './borderBox';
import { RepoMeta, Meta, PrimaryLanguage, LanguageCircle } from './repoList';

type PinnedItemProps = {
  pinnedItem: Repository;
};

const PinnedItemBase = styled(BorderBox)`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-bottom: ${themeGet('space.3')};
  font-size: ${themeGet('fontSizes.1')};
  padding: ${themeGet('space.3')};
  color: ${themeGet('colors.fg.muted')};

  width: 100%;
  @media (min-width: ${themeGet('breakpoints.1')}) {
    width: calc(50% - ${themeGet('space.2')});
  }
`;

const Header = styled.header`
  & > * {
    margin-right: 0.5em;
  }
`;

const Parent = styled.p`
  margin-bottom: ${themeGet('space.2')};
  font-size: ${themeGet('fontSizes.0')};
`;

const Desc = styled.p`
  flex: 1;
  margin-top: ${themeGet('space.2')};
  margin-bottom: 0;
  font-size: ${themeGet('fontSizes.0')};
`;

// repo for now
export function PinnedItem({ pinnedItem }: PinnedItemProps) {
  const {
    isPrivate,
    name,
    isFork,
    parent,
    url,
    description,
    primaryLanguage,
    stargazerCount,
    forkCount,
  } = pinnedItem as Required<Repository>;
  return (
    <PinnedItemBase as="li">
      <Header>
        <Icon iconName="repo" />
        <Link href={url} sx={{ fontWeight: 'bold' }}>
          {name}
        </Link>
        {!isPrivate && (
          <Label variant="secondary" sx={{ fontWeight: 'normal' }}>
            Public
          </Label>
        )}
      </Header>
      {isFork && parent && (
        <Parent>
          Forked from{' '}
          <Link href={parent.url} muted>
            {parent.nameWithOwner}
          </Link>
        </Parent>
      )}
      <Desc>{description}</Desc>
      <RepoMeta>
        {primaryLanguage?.color && (
          <PrimaryLanguage>
            <LanguageCircle
              languageColor={primaryLanguage.color}
            ></LanguageCircle>{' '}
            <span>{primaryLanguage.name}</span>
          </PrimaryLanguage>
        )}
        {stargazerCount > 0 && (
          <Meta>
            <Link href={url + '/stargazers'} muted>
              <Icon iconName="star" /> {stargazerCount}
            </Link>
          </Meta>
        )}
        {forkCount > 0 && (
          <Meta>
            <Link href={url + '/network/members'} muted>
              <Icon iconName="repo-forked" /> {forkCount}
            </Link>
          </Meta>
        )}
      </RepoMeta>
    </PinnedItemBase>
  );
}
