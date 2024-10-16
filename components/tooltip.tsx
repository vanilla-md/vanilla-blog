// https://github.com/primer/react/blob/main/src/Tooltip.tsx

import { sx, SxProp, themeGet } from '@primer/react';
import { ComponentProps } from '@primer/react/lib-esm/utils/types';
import clsx from 'clsx';
import { forwardRef, Ref } from 'react';
import styled from 'styled-components';

export function tooltipLabelText(count: number) {
  if (count === 0) {
    return 'No posts';
  } else if (count === 1) {
    return '1 post';
  } else {
    return `${count} posts`;
  }
}

const TooltipBase = styled.div<SxProp>`
  /* display: inline-block; */
  text-decoration: none;
  position: absolute;
  z-index: 1000000;
  padding: ${themeGet('space.2')} ${themeGet('space.3')};
  font: normal normal 12px/1.5 ${themeGet('fonts.normal')};
  -webkit-font-smoothing: subpixel-antialiased;
  color: ${themeGet('colors.fg.onEmphasis')};
  text-align: center;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: break-word;
  white-space: pre;
  pointer-events: none;
  content: attr(aria-label);
  background: ${themeGet('colors.neutral.emphasisPlus')};
  border-radius: ${themeGet('radii.2')};

  &::after {
    display: inline-block;
    text-decoration: none;
    position: absolute;
    z-index: 1000001;
    width: 0px;
    height: 0px;
    color: ${themeGet('colors.neutral.emphasisPlus')};
    pointer-events: none;
    content: '';
    border: 6px solid transparent;
    border-top-color: ${themeGet('colors.neutral.emphasisPlus')};
    bottom: -11px;
  }

  &.center {
    transform: translate(-50%, calc(-100% - 6px));
    &::after {
      left: calc(50% - 6px);
    }
  }

  &.left {
    transform: translate(-15%, calc(-100% - 6px));
    &::after {
      left: calc(15% - 6px);
    }
  }

  &.right {
    transform: translate(-85%, calc(-100% - 6px));
    /* transform: translateX(15%); */
    &::after {
      right: calc(15% - 6px);
    }
  }
  ${sx};
`;

TooltipBase.displayName = 'TooltipBase (styled)';

export type TooltipProps = {
  direction?: 'center' | 'right' | 'left';
} & ComponentProps<typeof TooltipBase>;

const Tooltip = forwardRef(
  (
    { direction = 'center', children, className, ...rest }: TooltipProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const classes = clsx(className, direction);
    return (
      <TooltipBase
        role="tooltip"
        ref={ref}
        {...rest}
        className={classes}
        hidden
      >
        {children}
      </TooltipBase>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
