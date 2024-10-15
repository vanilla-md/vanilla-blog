'use client';
// copied from https://primer.style/react/drafts/UnderlineNav2#with-nextjs
import {
  UnderlineNav,
  UnderlineNavItemProps as PrimerUnderlineNavItemProps,
} from '@primer/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, BookIcon, RepoIcon } from '@primer/octicons-react';
import OctofaceIcon from './octofaceIcon';
import siteData from '@/generated/siteData.json';

export default function Navigation() {
  const items = [
    { navigation: 'Home', href: '/', icon: HomeIcon },
    {
      navigation: 'Repositories',
      href: '/repositories',
      icon: RepoIcon,
      counter: siteData.repositories.totalCount,
    },
    {
      navigation: 'Posts',
      href: '/posts',
      icon: BookIcon,
      counter: siteData.posts?.totalCount ?? 0,
    },
    {
      navigation: 'Readme',
      href: '/readme',
      icon: OctofaceIcon,
    },
  ];

  const routerPathname = usePathname();

  const isCurrent = (href: string | URL) => {
    const pathname = typeof href === 'string' ? href : href.pathname;
    if (pathname === '/posts') {
      return routerPathname.startsWith(pathname);
    }
    return pathname === routerPathname;
  };

  return (
    <UnderlineNav
      aria-label="BlogNav"
      sx={{
        pl: [
          0,
          0,
          'calc(256px + 24px * 2)',
          'calc(296px + 24px * 2)',
          'calc((100% - 1280px) / 2 + 296px + 24px * 2)',
        ],
        bg: 'canvas.default',
      }}
    >
      {items.map((item) => (
        <UnderlineNavItem
          href={item.href}
          aria-current={isCurrent(item.href) ? 'page' : undefined}
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

type UnderlineNavItemProps = Omit<
  PrimerUnderlineNavItemProps,
  'as' | 'href'
> & {
  href: string | URL;
};

function UnderlineNavItem({ href, children, ...rest }: UnderlineNavItemProps) {
  return (
    <UnderlineNav.Item as={Link} href={String(href)} {...rest}>
      {children}
    </UnderlineNav.Item>
  );
}
