import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: 'src/lib/smart-table.component.tsx',
			name: 'SmartTable',
			fileName: 'smart-table',
			formats: ['es', 'umd'],
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'ramda'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					ramda: 'R',
				},
			},
		},
	},
	plugins: [dts(), react()],
	server: {
		port: 3000,
	},
})
