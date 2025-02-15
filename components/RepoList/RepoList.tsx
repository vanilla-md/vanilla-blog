'use client';
import { Heading, Label, Link, RelativeTime } from '@primer/react';
import { SolidLabelGroup, SolidLabel } from '../SolidLabel';
import { Icon } from '../Icons/Icon';
// temporary fix
import siteData from '@/generated/siteData.json';
type Repository = (typeof siteData.repositories.nodes)[number];

import classes from './RepoList.module.css';
import { RepoMeta } from '../Repo';
import PrimaryLanguage from '../Repo/PrimaryLanguage';
import RepoMetaGroup from '../Repo/MetaGroup';
import { PropsWithChildren } from 'react';

type RepoListProps = PropsWithChildren<{
  repos: Repository[];
}>;

export default function RepoList({ repos }: RepoListProps) {
  return (
    <ol className={classes.RepoList}>
      {repos.map(
        ({
          isPrivate,
          id,
          name,
          isFork,
          parent,
          url,
          description,
          primaryLanguage,
          stargazerCount,
          forkCount,
          licenseInfo,
          updatedAt,
          repositoryTopics,
        }) => (
          <li className={classes.RepoListItem} key={id}>
            <div className={classes.Header}>
              <Heading as="h3" className={classes.Heading}>
                <Link href={url} className={classes.Heading}>
                  {name}
                </Link>{' '}
                {!isPrivate && (
                  <Label variant="secondary" className={classes.Label}>
                    Public
                  </Label>
                )}
              </Heading>
              {isFork && parent && (
                <span className={classes.Forked}>
                  Forked from{' '}
                  <Link muted href={parent.url}>
                    {parent.nameWithOwner}
                  </Link>
                </span>
              )}
            </div>

            <div>
              <p className={classes.Description}>{description}</p>
            </div>
            {repositoryTopics.totalCount > 0 && (
              <SolidLabelGroup as="div">
                {repositoryTopics.nodes.map((topicNode) => (
                  <SolidLabel key={topicNode.id} size="large">
                    {topicNode.topic.name}
                  </SolidLabel>
                ))}
              </SolidLabelGroup>
            )}
            <RepoMetaGroup>
              {primaryLanguage?.name && (
                <PrimaryLanguage
                  name={primaryLanguage.name}
                  color={primaryLanguage.color}
                />
              )}
              {stargazerCount > 0 && (
                <RepoMeta>
                  <Link muted href={url + '/stargazers'}>
                    <Icon iconName="star" /> {stargazerCount}
                  </Link>
                </RepoMeta>
              )}
              {forkCount > 0 && (
                <RepoMeta>
                  <Link muted href={url + '/network/members'}>
                    <Icon iconName="repo-forked" /> {forkCount}
                  </Link>
                </RepoMeta>
              )}
              {licenseInfo && (
                <RepoMeta>
                  <Icon iconName="law" />
                  <span className={classes.LicenseName}>
                    {licenseInfo.name}
                  </span>
                </RepoMeta>
              )}
              <RepoMeta>
                Updated <RelativeTime datetime={updatedAt} />
              </RepoMeta>
            </RepoMetaGroup>
          </li>
        ),
      )}
    </ol>
  );
}
