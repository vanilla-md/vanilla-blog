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

    .markdown-body h1 .anchor .octicon-link:before,
    .markdown-body h2 .anchor .octicon-link:before,
    .markdown-body h3 .anchor .octicon-link:before,
    .markdown-body h4 .anchor .octicon-link:before,
    .markdown-body h5 .anchor .octicon-link:before,
    .markdown-body h6 .anchor .octicon-link:before {
      width: 16px;
      height: 16px;
      content: ' ';
      display: inline-block;
      background-color: currentColor;
      -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
      mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
    }
    
    .markdown-body h1 .anchor .octicon-link,
    .markdown-body h2 .anchor .octicon-link,
    .markdown-body h3 .anchor .octicon-link,
    .markdown-body h4 .anchor .octicon-link,
    .markdown-body h5 .anchor .octicon-link,
    .markdown-body h6 .anchor .octicon-link {
      visibility: visible;
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
