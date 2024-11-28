import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  Link as PrimerLink,
  LinkProps as PrimerLinkProps,
} from '@primer/react';
import { forwardRef } from 'react';

type Props = Omit<NextLinkProps, 'as' | 'href'> & Omit<PrimerLinkProps, 'as'>;

const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, ...props }, ref) => (
    <PrimerLink href={href ?? ''} as={NextLink} {...props} ref={ref}>
      {children}
    </PrimerLink>
  ),
);

Link.displayName = 'TextLink';

export default Link;
