import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'], // Build for commonJS and ESmodules
    dts: true, // Generate declaration file (.d.ts)
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: true,
    terserOptions: {
        mangle: {
            properties: {
                regex: /^_/,
            },
            keep_classnames: false,
            keep_fnames: false,
            eval: false,
        },
        compress: {
            drop_console: true,
            keep_classnames: false,
            side_effects: true,
        },
    },
});
