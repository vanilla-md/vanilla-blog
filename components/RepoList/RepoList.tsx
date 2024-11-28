'use client';
import {
  Box,
  Text,
  Heading,
  Label,
  Link,
  RelativeTime,
  themeGet,
} from '@primer/react';
import styled from 'styled-components';
import { SolidLabelGroup, SolidLabel } from '../SolidLable/SolidLabel';
import { Icon } from '../Icons/Icon';
// temporary fix
import siteData from '@/generated/siteData.json';
type Repository = (typeof siteData.repositories.nodes)[number];

const StyledRepoList = styled.ol`
  margin-top: 0;
  padding-left: 0;
`;

const StyledRepoListItem = styled.li`
  list-style: none;
  padding-top: ${themeGet('space.4')};
  padding-bottom: ${themeGet('space.4')};
  border-bottom-color: ${themeGet('colors.border.muted')};
  border-bottom-width: ${themeGet('borderWidths.1')};
  border-bottom-style: solid;
`;

export const RepoMeta = styled.p`
  margin-top: ${themeGet('space.2')};
  margin-bottom: 0;
  color: ${themeGet('colors.fg.muted')};
  font-size: ${themeGet('fontSizes.0')};
`;

export const Meta = styled.span`
  & + & {
    margin-left: ${themeGet('space.3')};
  }
`;

export const PrimaryLanguage = styled.span`
  margin-right: ${themeGet('space.3')};
`;

export const LanguageCircle = styled.span<{ languageColor: string }>`
  position: relative;
  top: 1px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid ${themeGet('colors.primer.border.contrast')};
  border-radius: 50%;
  background-color: ${(props) => props.languageColor};
`;

export default function RepoList({ repos }: { repos: Repository[] }) {
  return (
    <StyledRepoList>
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
          <StyledRepoListItem key={id}>
            <Box sx={{ display: 'inline-block', mb: 1, fontSize: 1 }}>
              <Heading as="h3" sx={{ fontSize: 3 }}>
                <Link href={url} sx={{ fontSize: 3 }}>
                  {name}
                </Link>{' '}
                {!isPrivate && (
                  <Label
                    variant="secondary"
                    sx={{
                      ml: 1,
                      mb: 1,
                      fontWeight: 'normal',
                      verticalAlign: 'middle',
                    }}
                  >
                    Public
                  </Label>
                )}
              </Heading>
              {isFork && parent && (
                <Text sx={{ mb: 1, color: 'fg.muted', fontSize: 0 }}>
                  Forked from{' '}
                  <Link muted href={parent.url}>
                    {parent.nameWithOwner}
                  </Link>
                </Text>
              )}
            </Box>

            <div>
              <Text
                as="p"
                sx={{
                  display: 'inline-block',
                  mb: 2,
                  mt: 0,
                  fontSize: 1,
                  color: 'fg.muted',
                  maxWidth: '70%',
                }}
              >
                {description}
              </Text>
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
            <RepoMeta>
              {primaryLanguage?.color && (
                <Meta>
                  <LanguageCircle
                    languageColor={primaryLanguage.color}
                  ></LanguageCircle>{' '}
                  <span>{primaryLanguage.name}</span>
                </Meta>
              )}
              {stargazerCount > 0 && (
                <Meta>
                  <Link muted href={url + '/stargazers'}>
                    <Icon iconName="star" /> {stargazerCount}
                  </Link>
                </Meta>
              )}
              {forkCount > 0 && (
                <Meta>
                  <Link muted href={url + '/network/members'}>
                    <Icon iconName="repo-forked" /> {forkCount}
                  </Link>
                </Meta>
              )}
              {licenseInfo && (
                <Meta>
                  <Icon iconName="law" />
                  <Text sx={{ ml: 1 }}>{licenseInfo.name}</Text>
                </Meta>
              )}
              <Meta>
                Updated <RelativeTime datetime={updatedAt} />
              </Meta>
            </RepoMeta>
          </StyledRepoListItem>
        ),
      )}
    </StyledRepoList>
  );
}
