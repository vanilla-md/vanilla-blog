import React from 'react';
import classes from './Meta.module.css';
import { PropsWithChildren } from 'react';

type RepoMetaItemProps = PropsWithChildren;

function RepoMeta({ children }: RepoMetaItemProps) {
  return <span className={classes.Meta}>{children}</span>;
}

export default RepoMeta;
