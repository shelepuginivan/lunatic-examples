// https://nuxt.com/docs/api/configuration/nuxt-config

export default {
	app: {
		head: {
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' }
			]
		}
	},
	css: ['@/assets/main.scss'],
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL ?? 'http://localhost:8000'
		}
	},
	modules: [
		'@hebilicious/vue-query-nuxt',
		'@nuxtjs/google-fonts',
		'nuxt-icon'
	],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import \'@/assets/global.scss\';\n'
				}
			}
		}
	},
	googleFonts: {
		families: {
			Montserrat: true
		}
	}
};
