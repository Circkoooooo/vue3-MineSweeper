import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno, presetWebFonts } from 'unocss'
import UnocssIcons from '@unocss/preset-icons'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@/': `${resolve(__dirname, 'src')}/`,
		},
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		Unocss({
			presets: [
				UnocssIcons({
					prefix: 'i-',
					extraProperties: {
						display: 'inline-block',
						width: '1.5rem',
						height: '1.5rem',
					},
				}),
				presetWebFonts({
					fonts: {
						sans: 'DM Sans',
						serif: 'DM Serif Display',
						mono: 'DM Mono',
					},
				}),
				presetAttributify({
					/* preset options */
				}),
				presetUno(),
				// ...custom presetsc
			],
		}),
	],
})
