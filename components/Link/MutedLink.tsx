import React from 'react';
import { Link, LinkProps } from '@primer/react';
import clsx from 'clsx';
import classes from './MutedLink.module.css';

export function MutedLink({ className, ...rest }: LinkProps) {
  return <Link className={clsx(classes.MutedLink, className)} {...rest} />;
}

export default MutedLink;
