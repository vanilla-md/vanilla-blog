// https://github.com/shuding/nextra/blob/main/packages/nextra/src/client/mdx-components/image.tsx
// MIT License
// Copyright (c) 2020 Shu Ding

import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import { forwardRef } from 'react';

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof props.src === 'object' &&
    !('blurDataURL' in props.src)
  ) {
    console.warn(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `[nextra] Failed to load blur image "${(props.src as any).src}" due missing "src.blurDataURL" value.
This is Turbopack bug, which will not occurs on production (since Webpack is used for "next build" command).`,
    );
    props = {
      ...props,
      placeholder: 'empty',
    };
  }

  const ComponentToUse = typeof props.width === 'number' ? NextImage : 'img';
  return (
    // @ts-expect-error -- fixme
    <ComponentToUse
      {...props}
      style={{ height: 'auto', ...props.style }}
      ref={ref}
    />
  );
});

Image.displayName = 'Image';
