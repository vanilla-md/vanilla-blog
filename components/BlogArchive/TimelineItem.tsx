import { FileIcon, FlameIcon } from '@primer/octicons-react';
import { Heading, Link, Timeline } from '@primer/react';

import type { PageData } from '@/types';
import type { RangeDate } from './BlogArchive';
import { months, trim0 } from '@/utils';

import classes from './TimelineItem.module.css';
import BorderBox from '../BorderBox';

export default function TimelineItem({
  post,
  date,
}: {
  post: PageData;
  date: RangeDate;
}) {
  return (
    <Timeline.Item key={post.slug}>
      <Timeline.Badge>
        <FlameIcon />
      </Timeline.Badge>
      <Timeline.Body>
        <Heading as="h4" className={classes.TimelineItemHeading}>
          <span>Published a post</span>
          <span className={classes.TimelineItemHeadingDate}>
            {months[Number(date.month) - 1].slice(0, 3) + ' ' + trim0(date.day)}
          </span>
        </Heading>
        <BorderBox className={classes.TimelinePost}>
          <FileIcon className={classes.FileIcon} />
          <div className={classes.PostContainer}>
            <Heading as="h3" className={classes.PostTitle}>
              <Link href={post.relativePath.replace(/\.md$/, '')}>
                {post.title}
              </Link>
            </Heading>
            <div className={classes.PostDescription}>{post.description}</div>
          </div>
        </BorderBox>
      </Timeline.Body>
    </Timeline.Item>
  );
}
