'use client';

import { theme, ThemeProvider as PrimerThemeProvider } from '@primer/react';
import { ColorModeWithAuto, Theme } from '@primer/react/lib-esm/ThemeProvider';
import deepmerge from 'deepmerge';

const customTheme: Theme = deepmerge(theme, {
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

export function ThemeProvider({
  colorMode,
  children,
}: {
  colorMode?: ColorModeWithAuto;
  children: React.ReactNode;
}) {
  return (
    <PrimerThemeProvider theme={customTheme} colorMode={colorMode}>
      {children}
    </PrimerThemeProvider>
  );
}
