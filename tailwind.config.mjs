/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				purple: {
					DEFAULT: '#7A5AF8',
					'25': '#FAFAFF',
					'50': '#F4F3FF',
					'100': '#EBE9FE',
					'200': '#D9D6FE',
					'300': '#BDB4FE',
					'400': '#9B8AFB',
					'500': '#7A5AF8',
					'600': '#6938EF',
					'700': '#5925DC',
					'800': '#4A1FB8',
					'900': '#3E1C96',
					'950': '#27115F'
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
