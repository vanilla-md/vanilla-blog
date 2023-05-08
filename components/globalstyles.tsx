import { createGlobalStyle } from 'styled-components';
import { themeGet } from '@primer/react';

const GlobalStyle = createGlobalStyle`
  html {
    scroll-padding-top: 55px;
  }

  @media (max-width: ${themeGet('breakpoints.1')}) {
    html {
      scroll-padding-top: initial;
    }
  }

  body {
    overflow-y: overlay;
    background-color: ${themeGet('colors.canvas.default')};
    font-size: ${themeGet('fontSizes.1')}
  }

  /* rewrite github-markdown.css imported in _app.tsx */
  .markdown-body {
    font-family: system-ui;
  }
`;

export default GlobalStyle;
