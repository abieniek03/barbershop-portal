/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			animation: {
				'open-modal': 'open-modal .6s ease-in-out forwards',
			},
			colors: {
				primary: '#9333ea',
				'primary-hover': '#7e22ce',
				border: '#9333ea',
				'content-hover': '#c084fc',
				'modal-bg': '#000000aa',
			},
			keyframes: {
				'open-modal': {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
		},
	},
	darkMode: 'class',
	plugins: [],
};
