import terser from "@rollup/plugin-terser";

export default {
  input: "./index.js",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [terser()],
};
