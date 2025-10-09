import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Basic environment
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks
    },
    rules: {
      // keep similar rules as before
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    }
  }
];