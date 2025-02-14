import { Heading } from '@primer/react';
import { RangeDate } from './BlogArchive';
import { months, trim0 } from '@/utils';

import classes from './TimelineHeading.module.css';

export default function TimelineHeading({
  date,
  type = 'month',
}: {
  date: RangeDate;
  type?: 'selected' | 'remaining' | 'month';
}) {
  return (
    <Heading as="h3" className={classes.Heading}>
      <span className={classes.Text}>
        {type === 'selected' && (
          <>
            {months[Number(date.month) - 1]} {date.day.replace(/^0/, '') + ','}
            <span className={classes.MutedText}> {date.year}</span>
          </>
        )}
        {type === 'remaining' && (
          <>
            {months[Number(date.month) - 1]} 1{' '}
            <span className={classes.MutedText}>to</span>{' '}
            {months[Number(date.month) - 1]} {trim0(date.day) + ','}
            <span className={classes.MutedText}> {date.year}</span>
          </>
        )}
        {type === 'month' && (
          <>
            {months[Number(date.month) - 1]}
            <span className={classes.MutedText}> {date.year}</span>
          </>
        )}
      </span>
    </Heading>
  );
}
