import {
  type Icon as IconFC,
  type IconProps,
  BookIcon,
  HomeIcon,
  BriefcaseIcon,
  LinkExternalIcon,
  DependabotIcon,
  MarkGithubIcon,
  OrganizationIcon,
  LocationIcon,
  LinkIcon,
  MailIcon,
  StarIcon,
  RepoIcon,
  RepoForkedIcon,
  LawIcon,
} from '@primer/octicons-react';

import OctofaceIcon from './octofaceIcon';

const importedOcticons = new Map<string, IconFC>(
  Object.entries({
    book: BookIcon,
    home: HomeIcon,
    briefcase: BriefcaseIcon,
    octoface: OctofaceIcon,
    'link-external': LinkExternalIcon,
    dependabot: DependabotIcon,
    'mark-github': MarkGithubIcon,
    organization: OrganizationIcon,
    location: LocationIcon,
    link: LinkIcon,
    mail: MailIcon,
    star: StarIcon,
    repo: RepoIcon,
    'repo-forked': RepoForkedIcon,
    law: LawIcon,
  })
);

type Props = { iconName: string } & IconProps;

export function Icon({ iconName, className, ...rest }: Props) {
  if (importedOcticons.has(iconName)) {
    const Octicon = importedOcticons.get(iconName)!;
    return <Octicon className={className} {...rest} />;
  }
  return null;
}
