'use client';

import { Heading, RelativeTime } from '@primer/react';
import { CalendarIcon, ClockIcon, PencilIcon } from '@primer/octicons-react';
import { Link } from '../Link';
import { SolidLabel, SolidLabelGroup } from '../SolidLabel';
import { isSameDay } from '@/utils';
import type { PageData } from '@/types';

import classes from './PostItem.module.css';

export default function PostItem({
  slug,
  title,
  published,
  modified,
  description,
  readingTime,
  tags,
}: PageData) {
  return (
    <li className={classes.PostItem}>
      <Heading as="h3" className={classes.Title}>
        <Link href={`/posts/${slug}`}>{title}</Link>
      </Heading>
      <div>
        <p className={classes.Description}>{description}</p>
      </div>
      {tags.length > 0 && (
        <div className={classes.LabelsBox}>
          <SolidLabelGroup>
            {tags.map((tag) => (
              <SolidLabel key={tag} size="large">
                {tag}
              </SolidLabel>
            ))}
          </SolidLabelGroup>
        </div>
      )}
      <div className={classes.Meta}>
        <span className={classes.TextMarginRight}>
          <CalendarIcon /> Published <RelativeTime datetime={published} />
        </span>
        {!isSameDay(new Date(published), new Date(modified)) && (
          <span className={classes.TextMarginRight}>
            <PencilIcon /> Modified <RelativeTime datetime={modified} />
          </span>
        )}
        <span>
          <ClockIcon /> Reading Time: {readingTime}
        </span>
      </div>
    </li>
  );
}
