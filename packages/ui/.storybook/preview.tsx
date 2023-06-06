import React, { useMemo } from 'react';
import type { Preview } from '@storybook/react';
import '@radix-ui/colors/blackA.css';
import '@radix-ui/colors/mauve.css';
import '@radix-ui/colors/violet.css';
import { MemoryDB, XProvider } from '@morten-olsen/x-blocks';
import { UIProvider } from '../src/provider';
import { plugins } from '../src/storybook/plugins';

const preview: Preview = {
  decorators: [
    (Story) => (
      <UIProvider>
        <Story />
      </UIProvider>
    ),
    (Story) => {
      const database = useMemo(() => new MemoryDB(), []);
      return (
        <XProvider database={database} plugins={plugins}>
          <Story />
        </XProvider>
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
