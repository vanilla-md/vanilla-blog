import { createGlobalStyle } from 'styled-components';
import { themeGet } from '@primer/react';

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: overlay;
    background-color: ${themeGet('colors.canvas.default')};
  }
`;

export default GlobalStyle;
