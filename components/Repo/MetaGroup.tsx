import React from 'react';
import classes from './MetaGroup.module.css';
import { PropsWithChildren } from 'react';

type RepoMetaGroupProps = PropsWithChildren;

function RepoMetaGroup({ children }: RepoMetaGroupProps) {
  return <p className={classes.RepoMetaGroup}>{children}</p>;
}

export default RepoMetaGroup;
