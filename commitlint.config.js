module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'deps',
        'husky',
        'github',
        'ts',
        'tailwind',
        'oxc',
        'next',
        'react',
        'framer',
        'three',
        'test',
      ],
    ],
  },
}
