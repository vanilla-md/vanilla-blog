// https://github.com/primer/react/blob/main/src/Placeholder.tsx

import { Box } from '@primer/react';
import React from 'react';

/** Private component used to render placeholders in storybook and documentation examples  */
export const Placeholder: React.FC<
  React.PropsWithChildren<{
    id?: string | undefined;
    width?: number | string;
    height: number | string;
    label?: string;
  }>
> = ({ width, height, id, label }) => {
  return (
    <Box
      id={id}
      sx={{
        width: width ?? '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        bg: 'canvas.inset',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'border.subtle',
      }}
    >
      {label}
    </Box>
  );
};
