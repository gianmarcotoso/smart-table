import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: 'src/lib/index.ts',
			fileName: `index`,
			formats: ['es'],
		},
		rollupOptions: {
			external: ['react', 'react/jsx-runtime', 'react-dom', 'ramda'],
			output: {
				sourcemapExcludeSources: true,
				globals: {
					react: 'React',
					'react/jsx-runtime': 'react/jsx-runtime',
					'react-dom': 'ReactDOM',
					ramda: 'R',
				},
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
