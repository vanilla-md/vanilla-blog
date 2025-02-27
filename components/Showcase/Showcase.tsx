import type { ProfileItemShowcase, Repository } from '@octokit/graphql-schema';
import { Heading } from '@primer/react';
import PinnedItem from '../PinnedItem';
import classes from './Showcase.module.css';

export type ShowcaseProps = {
  itemShowcase: Required<ProfileItemShowcase>;
};

export default function Showcase({ itemShowcase }: ShowcaseProps) {
  return (
    <>
      {itemShowcase.items.totalCount > 0 && (
        <section className={classes.ShowcaseBase}>
          <Heading as="h2" className={classes.ShowcaseHeading}>
            {itemShowcase.hasPinnedItems ? 'Pinned' : 'Popular'}
          </Heading>
          <ol className={classes.ShowcaseList}>
            {itemShowcase.items.nodes?.map(
              (node) =>
                node && (
                  <PinnedItem pinnedItem={node as Repository} key={node.id} />
                ),
            )}
          </ol>
        </section>
      )}
    </>
  );
}
