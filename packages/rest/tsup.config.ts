import { defineConfig } from 'tsup';

export default defineConfig(options => {
  return {
    minify: !options.watch,
    entry: ['src/index.ts'],
    sourcemap: true,
    clean: true,
    dts: true,
    format: ['cjs', 'esm'],
    outExtension({ format }) {
      return {
        js: `.${format}.js`,
        dts: `.${format}.d.ts`,
      };
    },
  };
});
