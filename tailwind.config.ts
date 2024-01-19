import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
   content: [
      // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      // this is shadcn-ui
      container: {
         center: true,
         padding: '2rem',
         screens: {
            '2xl': '1400px',
         },
      },
      extend: {
         invert: {
            image: 'var(--invert-image)',
         },
         colors: {
            gray: colors.zinc,
            'gray-1000': 'rgb(17,17,19)',
            'gray-1100': 'rgb(10,10,11)',
            viper: {
               pink: '#FF0080',
               blue: '#003FCD',
               cyan: '#50E3C2',
               orange: '#F5A623',
               violet: '#7928CA',
               // me
               'dodger-blue': 'hsl(var(--dodger-blue))',
               'dodger-blue-hover': 'hsl(var(--dodger-blue-hover))',
               'pastel-blue': 'hsl(var(--pastel-blue))',
               'deep-blue': 'hsl(var(--deep-blue))',
               red: 'hsl(var(--error-foreground))',
               'forest-green': 'hsl(var(--forest-green))',
            },
            // me
            overlay: 'hsl(var(--overlay))',
            'invert-image': 'var(--invert-image)',
            //
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
               DEFAULT: 'hsl(var(--primary))',
               foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
               DEFAULT: 'hsl(var(--secondary))',
               foreground: 'hsl(var(--secondary-foreground))',
            },
            destructive: {
               DEFAULT: 'hsl(var(--destructive))',
               foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
               DEFAULT: 'hsl(var(--muted))',
               foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsl(var(--accent))',
               foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
               DEFAULT: 'hsl(var(--popover))',
               foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
               DEFAULT: 'hsl(var(--card))',
               foreground: 'hsl(var(--card-foreground))',
            },
         },
         boxShadow: {
            rounded: '0px 0px 5px 1px hsla(var(--shadow-rounded))',
            'outer-sky': '0px 0px 5px 6px hsla(204, 88%, 47%, 0.5)',
         },
         backgroundImage: ({ theme }) => ({
            'vp-border-gradient': `radial-gradient(at left top, ${theme(
               'colors.gray.500',
            )}, 50px, ${theme('colors.gray.700')} 60%)`,
         }),
         keyframes: ({ theme }) => ({
            'accordion-down': {
               from: { height: '0' },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: '0' },
            },
            highlight: {
               '0%': {
                  background: theme('colors.viper.pink'),
                  color: theme('colors.white'),
               },
               '40%': {
                  background: theme('colors.viper.pink'),
                  color: theme('colors.white'),
               },
            },
            loading: {
               '0%': {
                  opacity: '.2',
               },
               '20%': {
                  opacity: '1',
                  transform: 'translateX(1px)',
               },
               to: {
                  opacity: '.2',
               },
            },
            shimmer: {
               '100%': {
                  transform: 'translateX(100%)',
               },
            },
            // translateXReset: {
            //    '100%': {
            //       transform: 'translateX(0)',
            //    },
            // },
            fadeToTransparent: {
               '0%': {
                  opacity: '1',
               },
               '40%': {
                  opacity: '1',
               },
               '100%': {
                  opacity: '0',
               },
            },
            rerender: {
               '0%': {
                  ['border-color']: theme('colors.viper.pink'),
               },
               '40%': {
                  ['border-color']: theme('colors.viper.pink'),
               },
            },
            delayVisibility: {
               '0%': {
                  visibility: 'hidden',
               },
               '99%': {
                  visibility: 'hidden',
               },
               '100%': {
                  visibility: 'visible',
               },
            },
         }),
      },
      animation: {
         'accordion-down': 'accordion-down 0.1s ease-out',
         'accordion-up': 'accordion-up 0.1s ease-out',
         highlight: 'highlight 1s ease-in-out 1',
         loading: 'loading 1.4s ease-in-out 0.2s infinite',
         shimmer: 'shimmer 1.5s infinite',
         spin: 'spin 1.5s linear infinite',
         // 'translate-x-reset': 'translateXReset 1s ease-in-out 1 reverse',
         'fade-to-transparent': 'fadeToTransparent 1s ease-in-out forwards 1',
         rerender: 'rerender 1s ease-in-out 1',
         'delay-visibility': 'delayVisibility 0.5s ease-in',
      },
      transitionProperty: {
         bg: 'background-color',
      },
   },
   plugins: [require('tailwindcss-animate'), require('autoprefixer')],
   darkMode: 'class',
}
export default config
