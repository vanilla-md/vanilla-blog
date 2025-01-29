// https://github.com/shuding/nextra/blob/main/packages/nextra/src/client/mdx-components/anchor.tsx
// MIT License
// Copyright (c) 2020 Shu Ding

import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, FC } from 'react';

const EXTERNAL_URL_RE = /^https?:\/\//;

export const Anchor: FC<ComponentPropsWithoutRef<'a'>> = ({
  href = '',
  ...props
}) => {
  props = {
    ...props,
    className: clsx('x', props.className),
  };
  if (EXTERNAL_URL_RE.test(href)) {
    const { children } = props;
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }
  const ComponentToUse = href.startsWith('#') ? 'a' : Link;
  return <ComponentToUse href={href} {...props} />;
};
