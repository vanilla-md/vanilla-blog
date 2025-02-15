import { PropsWithChildren } from 'react';
import { BaseStyles } from '@primer/react';
import { StyledComponentsRegistry } from '../lib/registry';
import { ColorModeWithAuto, ThemeProvider } from '@/lib/theme';
import Layout from '@/components/Layout';
/* eslint-disable @typescript-eslint/no-unused-vars */
import './global.css';

const colorMode: ColorModeWithAuto = 'auto';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    // Note: the focus-visible polyfill adds additional attributes to `html`
    // that cause hydration mismatch errors
    <html
      lang="en"
      suppressHydrationWarning
      data-color-mode={colorMode}
      data-light-theme="light"
      data-dark-theme="dark"
    >
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider colorMode={colorMode}>
            <BaseStyles>
              <Layout>{children}</Layout>
            </BaseStyles>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
