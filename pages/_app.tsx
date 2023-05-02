import type { AppProps } from 'next/app';
import { SSRProvider, ThemeProvider, theme, BaseStyles } from '@primer/react';
import { StyleSheetManager } from 'styled-components';
import deepmerge from 'deepmerge';
import GlobalStyle from '@/components/globalstyles';
import Layout from '@/components/layout';
import Head from 'next/head';
import siteData from '@/generated/siteData.json';

import 'github-markdown-css/github-markdown.css';

const customTheme = deepmerge(theme, {
  fonts: {
    normal: 'system-ui',
    mono: 'monospace, ui-monospace',
  },
  // not working
  // breakpoints: ['768px', '1012px'],
});

const name = siteData.name ?? siteData.login;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="author" content={name} />
        <meta name="generator" content="lonr/vanilla" />
        <link rel="icon" href={siteData.avatarUrl} />
      </Head>
      <StyleSheetManager disableVendorPrefixes={process.env.NODE_ENV === 'development'}>
        <SSRProvider>
          <ThemeProvider theme={customTheme} colorMode="auto" preventSSRMismatch>
            <BaseStyles>
              <GlobalStyle />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </BaseStyles>
          </ThemeProvider>
        </SSRProvider>
      </StyleSheetManager>
    </>
  );
}
