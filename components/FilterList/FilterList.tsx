// https://github.com/primer/react/blob/v36.14.0/packages/react/src/deprecated/FilterList/FilterList.tsx
import { ComponentProps } from '@/types';
import { sx, SxProp, themeGet } from '@primer/react';
import React from 'react';
import styled from 'styled-components';

const FilterListBase = styled.ul<SxProp>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${sx};
`;

export type FilterListProps = ComponentProps<typeof FilterListBase>;

const FilterList = ({
  children,
  ...rest
}: React.PropsWithChildren<FilterListProps>) => {
  const items = React.Children.map(children, (child) => {
    return <li>{child}</li>;
  });

  return <FilterListBase {...rest}>{items}</FilterListBase>;
};

type StyledFilterListItemBaseProps = {
  small?: boolean;
  selected?: boolean;
} & SxProp;

const FilterListItemBase = styled.a<StyledFilterListItemBaseProps>`
  position: relative;
  display: block;
  padding: ${(props) =>
    props.small
      ? `${themeGet('space.1')(props)} 10px`
      : `${themeGet('space.2')(props)} 11px`};
  margin: ${(props) => (props.small ? '0 0 2px' : '0 0 5px 0')};
  overflow: hidden;
  font-size: ${themeGet('fontSizes.1')};
  color: ${(props) =>
    props.selected
      ? themeGet('colors.fg.onEmphasis')
      : themeGet('colors.fg.muted')};
  background-color: ${(props) =>
    props.selected ? themeGet('colors.accent.emphasis') : ''}!important;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  border-radius: ${themeGet('radii.1')};
  &:hover {
    text-decoration: none;
    background-color: ${themeGet('colors.canvas.subtle')};
  }
  &:active {
    color: ${themeGet('colors.fg.onEmphasis')};
    background-color: ${themeGet('colors.accent.emphasis')};
  }
  .count {
    float: right;
    font-weight: ${themeGet('fontWeights.bold')};
  }
  ${sx};
`;

export type FilterListItemProps = { count?: number } & ComponentProps<
  typeof FilterListItemBase
>;

const FilterListItem = ({
  children,
  count,
  ...rest
}: React.PropsWithChildren<FilterListItemProps>) => {
  return (
    <FilterListItemBase {...rest}>
      {count && <span className="count">{count}</span>}
      {children}
    </FilterListItemBase>
  );
};

FilterListItem.displayName = 'FilterList.Item';

export default Object.assign(FilterList, { Item: FilterListItem });
