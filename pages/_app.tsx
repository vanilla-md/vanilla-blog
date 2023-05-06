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
  colorSchemes: {
    // Customize an existing scheme
    light: {
      colors: {
        calendar: {
          doodle: ['#ebedf0', '#0a659e', '#f59a61', '#e51a4c'],
          halloween: ['#ebedf0', '#ffee4a', '#ffc501', '#fe9600', '#03001c'],
        },
      },
    },
    dark: {
      colors: {
        calendar: {
          doodle: ['#161b22', '#0a659e', '#f59a61', '#e51a4c'],
          halloween: ['#161b22', '#ffee4a', '#ffc501', '#fe9600', '#03001c'],
        },
      },
    },
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
