import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
    ],
  },

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
      'react': react,
      'react-hooks': reactHooks,
    },

    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lucide-react',
              message: 'Please import icons from \'@/design-tokens/icons\' instead of directly from \'lucide-react\' to maintain design system consistency.',
              allowTypeImports: true,
            },
          ],
          patterns: [
            {
              group: ['lucide-react'],
              message: 'Please import icons from \'@/design-tokens/icons\' instead of directly from \'lucide-react\'.',
              allowTypeImports: true,
            },
          ],
        },
      ],

      'no-restricted-syntax': [
        'warn',
        {
          selector: 'Literal[value=/bg-(green|red|blue|yellow|purple|pink|indigo|gray)-(100|200|300|400|500|600|700|800|900)/]',
          message: 'Avoid hardcoded color classes. Use semantic tokens instead: bg-region-north, bg-error, bg-success, bg-warning, bg-accent.',
        },
        {
          selector: 'Literal[value=/text-(green|red|blue|yellow|purple|pink|indigo|gray)-(100|200|300|400|500|600|700|800|900)/]',
          message: 'Avoid hardcoded color classes. Use semantic tokens instead: text-region-north, text-error, text-success, text-warning, text-accent, text-foreground.',
        },
        {
          selector: 'Literal[value=/border-(green|red|blue|yellow|purple|pink|indigo|gray)-(100|200|300|400|500|600|700|800|900)/]',
          message: 'Avoid hardcoded color classes. Use semantic tokens instead: border-error, border-success, border-warning, border-accent, border-border.',
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: [
      'src/design-tokens/icons.ts',
      'src/components/ui/icon.tsx',
    ],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];
