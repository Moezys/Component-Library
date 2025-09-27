import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'blue',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'blue', title: 'Blue', left: '🔵' },
          { value: 'green', title: 'Green', left: '🟢' },
          { value: 'purple', title: 'Purple', left: '🟣' },
          { value: 'red', title: 'Red', left: '🔴' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'blue';
      return React.createElement(
        'div',
        { 'data-theme': theme === 'blue' ? undefined : theme },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;