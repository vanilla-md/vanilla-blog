// copied from https://primer.style/react/drafts/UnderlineNav2#with-nextjs
import {
  UnderlineNav,
  UnderlineNavItemProps as PrimerUnderlineNavItemProps,
} from '@primer/react/drafts';
import { HomeIcon, BookIcon, RepoIcon, PersonIcon } from '@primer/octicons-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import profile from '../generated/profile.json';

export default function Navigation() {
  const items = [
    { navigation: 'Home', href: '/', icon: HomeIcon },
    {
      navigation: 'Repositories',
      href: '/repositories',
      icon: RepoIcon,
      counter: profile.public_repos,
    },
    {
      navigation: 'Posts',
      href: '/posts',
      icon: BookIcon,
      counter: 13,
    },
    {
      navigation: 'About',
      href: '/about',
      icon: PersonIcon,
    },
  ];
  return (
    <UnderlineNav
      aria-label="BlogNav"
      sx={{
        pl: [
          0,
          0,
          'calc(256px + 24px * 2)',
          'calc(296px + 24px * 2)',
          'calc((100vw - 1280px) / 2 + 296px + 24px * 2)',
        ],
      }}
    >
      {items.map((item) => (
        <UnderlineNavItem
          href={item.href}
          key={item.navigation}
          icon={item.icon}
          counter={item.counter}
        >
          {item.navigation}
        </UnderlineNavItem>
      ))}
    </UnderlineNav>
  );
}

type UnderlineNavItemProps = Omit<PrimerUnderlineNavItemProps, 'as' | 'href'> & {
  href: string | URL;
};

function UnderlineNavItem({ href, children, ...rest }: UnderlineNavItemProps) {
  const router = useRouter();
  const isCurrent =
    typeof href === 'string' ? router.asPath === href : router.pathname === href.pathname;
  return (
    <UnderlineNav.Item
      as={Link}
      href={String(href)}
      aria-current={isCurrent ? 'page' : undefined}
      {...rest}
    >
      {children}
    </UnderlineNav.Item>
  );
}
