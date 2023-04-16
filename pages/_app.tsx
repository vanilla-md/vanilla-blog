import type { AppProps } from 'next/app';
import { SSRProvider, ThemeProvider, theme, BaseStyles } from '@primer/react';
import deepmerge from 'deepmerge';
import GlobalStyle from '../components/globalstyles';

const customTheme = deepmerge(theme, {
  fonts: {
    normal: 'system-ui',
    mono: 'ui-monospace',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SSRProvider>
        <ThemeProvider theme={customTheme} colorMode="auto" preventSSRMismatch>
          <BaseStyles>
            <GlobalStyle />
            <Component {...pageProps} />
          </BaseStyles>
        </ThemeProvider>
      </SSRProvider>
    </>
  );
}
