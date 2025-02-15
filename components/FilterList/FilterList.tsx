// https://github.com/primer/react/blob/v36.14.0/packages/react/src/deprecated/FilterList/FilterList.tsx
import React from 'react';
import { clsx } from 'clsx';

import classes from './FilterList.module.css';
import { PropsWithChildren } from 'react';

export type FilterListProps = PropsWithChildren<{
  className?: string;
}> &
  React.ComponentProps<'ul'>;

const FilterList = ({ className, children, ...rest }: FilterListProps) => {
  const items = React.Children.map(children, (child) => {
    return <li>{child}</li>;
  });

  return (
    <ul className={clsx(classes.FilterList, className)} {...rest}>
      {items}
    </ul>
  );
};

type FilterListItemProps = PropsWithChildren<{
  className?: string;
  small?: boolean;
  selected?: boolean;
  count?: number;
}> &
  React.ComponentProps<'a'>;

const FilterListItem = ({
  className,
  children,
  count,
  small,
  selected,
  ...rest
}: FilterListItemProps) => {
  return (
    <a
      className={clsx(classes.FilterListItem, className)}
      data-small={small}
      data-active={selected}
      {...rest}
    >
      {count && <span className={classes.count}>{count}</span>}
      {children}
    </a>
  );
};

FilterListItem.displayName = 'FilterList.Item';

export default Object.assign(FilterList, { Item: FilterListItem });
