// https://github.com/primer/react/blob/main/src/deprecated/BorderBox.tsx
import { Box, BoxProps, themeGet } from '@primer/react';
import styled from 'styled-components';

export type BorderBoxProps = BoxProps;

const BorderBox = styled(Box)`
  border-width: ${themeGet('borderWidths.1')};
  border-style: solid;
  border-color: ${themeGet('colors.border.default')};
  border-radius: ${themeGet('radii.2')};
`;

export default BorderBox;
