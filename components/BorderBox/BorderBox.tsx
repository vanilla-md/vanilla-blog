// https://github.com/primer/react/blob/main/src/deprecated/BorderBox.tsx
import React from 'react';
import { clsx } from 'clsx';

import classes from './BorderBox.module.css';
import type { PropsWithChildren } from 'react';

export interface BorderBoxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>;
  className?: string;
}

type BorderBoxComponentProps = PropsWithChildren<BorderBoxProps>;

/**
 * A polymorphic component that applies a border box style using CSS Modules.
 */
export function BorderBox({
  as: Component = 'div',
  children,
  className,
  ...rest
}: BorderBoxComponentProps) {
  return (
    <Component className={clsx(classes.BorderBox, className)} {...rest}>
      {children}
    </Component>
  );
}

BorderBox.displayName = 'BorderBox';

export default BorderBox;
