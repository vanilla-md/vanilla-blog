import type { Repository } from '@octokit/graphql-schema';
import { Label, Link } from '@primer/react';
import { Icon } from '../Icons/Icon';
import BorderBox from '../BorderBox';
import classes from './PinnedIte.module.css';
import { PrimaryLanguage, RepoMeta, RepoMetaGroup } from '../Repo';

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
      <RepoMetaGroup>
        {primaryLanguage?.name && (
          <PrimaryLanguage
            name={primaryLanguage.name}
            color={primaryLanguage?.color ?? undefined}
          />
        )}
        {stargazerCount > 0 && (
          <RepoMeta>
            <Link href={url + '/stargazers'} muted>
              <Icon iconName="star" /> {stargazerCount}
            </Link>
          </RepoMeta>
        )}
        {forkCount > 0 && (
          <RepoMeta>
            <Link href={url + '/network/members'} muted>
              <Icon iconName="repo-forked" /> {forkCount}
            </Link>
          </RepoMeta>
        )}
      </RepoMetaGroup>
    </BorderBox>
  );
}
