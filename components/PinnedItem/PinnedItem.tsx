import type { Repository } from '@octokit/graphql-schema';
import { Label, Link } from '@primer/react';
import { Icon } from '../Icons/Icon';
import BorderBox from '../BorderBox';
import {
  RepoMeta,
  Meta,
  PrimaryLanguage,
  LanguageCircle,
} from '../RepoList/RepoList';
import classes from './PinnedIte.module.css';

type PinnedItemProps = {
  pinnedItem: Repository;
};

// repo for now
export default function PinnedItem({ pinnedItem }: PinnedItemProps) {
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
    <BorderBox as="li" className={classes.PinnedItemBase}>
      <header className={classes.Header}>
        <Icon iconName="repo" />
        <Link href={url} className={classes.RepoLink}>
          {name}
        </Link>
        {!isPrivate && (
          <Label variant="secondary" className={classes.RepoLinkLabel}>
            Public
          </Label>
        )}
      </header>
      {isFork && parent && (
        <p className={classes.Parent}>
          Forked from{' '}
          <Link href={parent.url} muted>
            {parent.nameWithOwner}
          </Link>
        </p>
      )}
      <p className={classes.Desc}>{description}</p>
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
    </BorderBox>
  );
}
