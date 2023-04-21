import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: ['src/lib/smart-table.component.tsx', 'src/lib/smart-table-config.context.tsx'],
			fileName: `smart-table`,
			formats: ['es'],
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'ramda'],
			output: {
				sourcemapExcludeSources: true,
			},
		},
		sourcemap: true,
		target: 'esnext',
		minify: false,
	},
	plugins: [dts(), react()],
	server: {
		port: 3000,
	},
})
