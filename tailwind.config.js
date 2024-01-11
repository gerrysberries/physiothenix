/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./dist/**/*.{html,js}'],
	theme: {
		fontSize: {
			xs: ['12px', '16px'],
			sm: ['14px', '20px'],
			base: ['16px', '24px'],
			lg: ['18px', '28px'],
			xl: ['20px', '28px'],
			'2xl': ['24px', '32px'],
			'3xl': ['30px', '36px'],
			'4xl': ['40px', '45px'],
			'5xl': ['48px', '1'],
			'6xl': ['60px', '1'],
			'7xl': ['72px', '1'],
			'8xl': ['96px', '1'],
		},
		extend: {
			fontFamily: {
				mulish: ['Mulish', 'sans-serif'],
			},
			dropShadow: {
				custom: '0px 40px 40px 0px rgba(0, 0, 0, 0.25)',
			},
			colors: {
				'primary-1': '#551863',
				'primary-2': '#21174A',
				'primary-3': '#FF0000',
				secondary: '#FBB901',
				dark: '#0E0410',
				text: '#413F48',
				subtitle: '#6D6A7C',
				accent: '#EAEAEA',
				light: '#F7F7F7',
			},
			backgroundImage: {
				hero: "url('../src/assets/pullup.jpg')",
				'home-card-1': "url('../src/assets/client.png')",
				'home-card-2': "url('../src/assets/rings.jpg')",
				'home-card-3': "url('../src/assets/stretch.jpg')",
				'services-primary': "url('../src/assets/rings.jpg')",
				'services-secondary': "url('../src/assets/stretch.jpg')",
				'location-primary': "url('../src/assets/table.jpg')",
				'location-secondary': "url('../src/assets/stretch.jpg')",
			},
			screens: {
				wide: '1440px',
			},
		},
	},
	plugins: [],
};
