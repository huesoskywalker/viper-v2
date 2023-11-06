import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
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
         colors: {
            gray: colors.zinc,
            'gray-1000': 'rgb(17,17,19)',
            'gray-1100': 'rgb(10,10,11)',
            viper: {
               pink: '#FF0080',
               blue: '#0070F3',
               cyan: '#50E3C2',
               orange: '#F5A623',
               violet: '#7928CA',
            },
            // this is shadcn
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
            //   this is next.js
         },
         backgroundImage: ({ theme }) => ({
            'vc-border-gradient': `radial-gradient(at left top, ${theme(
               'colors.gray.500',
            )}, 50px, ${theme('colors.gray.800')} 50%)`,
         }),
         // shadcn-ui
         keyframes: {
            'accordion-down': {
               from: { height: '0' },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: '0' },
            },
            // next.js
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
            translateXReset: {
               '100%': {
                  transform: 'translateX(0)',
               },
            },
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
         },
         // =========
         // next.js
         // ============
         // keyframes: ({ theme }) => ({
         //    // next.js
         //    rerender: {
         //       '0%': {
         //          ['border-color']: theme('colors.viper.pink'),
         //       },
         //       '40%': {
         //          ['border-color']: theme('colors.viper.pink'),
         //       },
         //    },
         //    highlight: {
         //       '0%': {
         //          background: theme('colors.viper.pink'),
         //          color: theme('colors.white'),
         //       },
         //       '40%': {
         //          background: theme('colors.viper.pink'),
         //          color: theme('colors.white'),
         //       },
         //    },
         //    loading: {
         //       '0%': {
         //          opacity: '.2',
         //       },
         //       '20%': {
         //          opacity: '1',
         //          transform: 'translateX(1px)',
         //       },
         //       to: {
         //          opacity: '.2',
         //       },
         //    },
         //    shimmer: {
         //       '100%': {
         //          transform: 'translateX(100%)',
         //       },
         //    },
         //    translateXReset: {
         //       '100%': {
         //          transform: 'translateX(0)',
         //       },
         //    },
         //    fadeToTransparent: {
         //       '0%': {
         //          opacity: '1',
         //       },
         //       '40%': {
         //          opacity: '1',
         //       },
         //       '100%': {
         //          opacity: '0',
         //       },
         //    },
         // }),
      },
      // shadcn
      animation: {
         'accordion-down': 'accordion-down 0.2s ease-out',
         'accordion-up': 'accordion-up 0.2s ease-out',
      },
   },
   plugins: [require('tailwindcss-animate')],
}
export default config
