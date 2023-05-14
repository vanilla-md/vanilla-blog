import { Maybe } from './util';

export interface SiteData {
  websiteUrl: Maybe<string>;
  avatarUrl: string;
  bio: string;
  bioHTML: string;
  company: Maybe<string>;
  companyHTML: string;
  createdAt: string;
  email: string;
  databaseId: number;
  id: string;
  location: string;
  login: string;
  name: Maybe<string>;
  socialAccounts: SocialAccountConnection;
  updatedAt: string;
  url: string;
  itemShowcase: ProfileItemShowcase;
  repositories: RepositoryConnection;
  posts: Maybe<PostConnection>;
}

export interface SocialAccountConnection {
  nodes: SocialAccount[];
  totalCount: number;
}

export type SocialAccount = {
  displayName: string;
  provider: string;
  url: string;
};

export interface ProfileItemShowcase {
  hasPinnedItems: boolean;
  items: PinnableItemConnection;
}

export interface PinnableItemConnection {
  totalCount: number;
  nodes: PinnableItem[];
}

export interface PinnableItem {
  __typename: string;
  isPrivate: boolean;
  id: string;
  name: string;
  nameWithOwner: string;
  isFork: boolean;
  parent: Maybe<Parent>;
  owner: Owner;
  resourcePath: string;
  url: string;
  description: string;
  descriptionHTML: string;
  primaryLanguage: Maybe<Language>;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
}

export interface Owner {
  login: string;
}

export interface Language {
  color: string;
  id: string;
  name: string;
}

export interface RepositoryConnection {
  nodes: Repository[];
  totalCount: number;
}

export interface Repository {
  isPrivate: boolean;
  id: string;
  name: string;
  nameWithOwner: string;
  isTemplate: boolean;
  isArchived: boolean;
  isDisabled: boolean;
  isFork: boolean;
  parent: Maybe<Parent>;
  owner: Owner;
  resourcePath: string;
  url: string;
  description: string;
  descriptionHTML: string;
  primaryLanguage: Language;
  stargazerCount: number;
  forkCount: number;
  licenseInfo: Maybe<License>;
  pushedAt: string;
  updatedAt: string;
  repositoryTopics: RepositoryTopicConnection;
}

export interface Parent {
  url: string;
  name: string;
  nameWithOwner: string;
}

export interface License {
  key: string;
  name: string;
  spdxId: string;
  url: string;
}

export interface RepositoryTopicConnection {
  totalCount: number;
  nodes: RepositoryTopic[];
}

export interface RepositoryTopic {
  id: string;
  resourcePath: string;
  url: string;
  topic: Topic;
}

export interface Topic {
  name: string;
}

export interface PostConnection {
  totalCount: number;
}
