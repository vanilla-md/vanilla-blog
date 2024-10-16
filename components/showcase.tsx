import type { ProfileItemShowcase, Repository } from '@octokit/graphql-schema';
import { Heading, themeGet } from '@primer/react';
import sx, { SxProp } from '@primer/react/lib-esm/sx';
import { ComponentProps } from '@primer/react/lib-esm/utils/types';
import styled from 'styled-components';
import { PinnedItem } from './pinnedItem';

const ShowcaseBase = styled.section<SxProp>`
  margin-top: ${themeGet('space.4')};
  ${sx};
`;

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

export type ShowcaseProps = {
  className?: string;
  itemShowcase: Required<ProfileItemShowcase>;
} & ComponentProps<typeof ShowcaseBase>;

export default function Showcase({
  sx,
  className,
  itemShowcase,
}: ShowcaseProps) {
  return (
    <>
      {itemShowcase.items.totalCount > 0 && (
        <ShowcaseBase sx={sx} className={className}>
          <Heading as="h2" sx={{ mb: 2, fontSize: 2, fontWeight: 'normal' }}>
            {itemShowcase.hasPinnedItems ? 'Pinned' : 'Popular'}
          </Heading>
          <List>
            {itemShowcase.items.nodes?.map(
              (node) =>
                node && (
                  <PinnedItem pinnedItem={node as Repository} key={node.id} />
                ),
            )}
          </List>
        </ShowcaseBase>
      )}
    </>
  );
}
