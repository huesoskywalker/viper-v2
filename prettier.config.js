module.exports = {
   arrowParens: 'always',
   semi: false,
   trailingComma: 'all',
   singleQuote: true,
   tabWidth: 3,
   printWidth: 99,
   plugins: ['prettier-plugin-tailwindcss'],
   tailwindConfig: './tailwind.config.ts',
   tailwindFunctions: ['cn'],
}
