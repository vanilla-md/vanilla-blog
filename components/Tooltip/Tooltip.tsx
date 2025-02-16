// https://github.com/primer/react/blob/main/src/Tooltip.tsx

import clsx from 'clsx';
import { forwardRef, PropsWithChildren, Ref } from 'react';

import classes from './Tooltip.module.css';

export function tooltipLabelText(count: number) {
  if (count === 0) {
    return 'No posts';
  } else if (count === 1) {
    return '1 post';
  } else {
    return `${count} posts`;
  }
}

export type TooltipProps = PropsWithChildren<{
  className?: string;
  direction?: 'center' | 'right' | 'left';
}>;

const Tooltip = forwardRef(
  (
    { direction = 'center', children, className, ...rest }: TooltipProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <div
        role="tooltip"
        ref={ref}
        {...rest}
        className={clsx(className, classes.TooltipBase)}
        data-direction={direction}
        hidden
      >
        {children}
      </div>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
