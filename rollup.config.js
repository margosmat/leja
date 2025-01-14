import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

import css from 'rollup-plugin-css-only'
import copy from 'rollup-plugin-copy'

import json from 'rollup-plugin-json';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production			
		}),
		json({
			// All JSON files will be parsed by default,
			// but you can also specifically include/exclude files
			include: 'node_modules/**',
			exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],
	   
			// for tree-shaking, properties will be declared as
			// variables, using either `var` or `const`
			preferConst: true, // Default: false
	   
			// specify indentation for the generated default export —
			// defaults to '\t'
			indent: '  ',
	   
			// ignores indent and generates the smallest code
			compact: true, // Default: false
	   
			// generate a named export for every property of the JSON object
			namedExports: true // Default: true
		  }),
		css({ output: 'public/bundle.css' }),
		copy({targets: [{ src: 'src/data/*', dest: 'public/data' }]}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),		
		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
