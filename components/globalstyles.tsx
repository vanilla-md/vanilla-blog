import { createGlobalStyle } from 'styled-components';
import { themeGet } from '@primer/react';

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: overlay;
    background-color: ${themeGet('colors.canvas.default')};
  }

  /* rewrite github-markdown.css imported in _app.tsx */
  .markdown-body {
    font-family: system-ui;
  }
`;

export default GlobalStyle;
