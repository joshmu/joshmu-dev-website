import nextConfig from 'eslint-config-next'
import tsConfig from 'eslint-config-next/typescript'

export default [
  ...nextConfig,
  {
    ...tsConfig[0],
    rules: {
      ...tsConfig[0]?.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]
