import { Options, build } from "tsup";

const baseConfig: Options = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  platform: "node",
  outDir: "dist",
};

Promise.all([
  build({
    ...baseConfig,
    format: "esm",
    dts: true,
  }),
  build({
    ...baseConfig,
    format: "cjs",
  }),
]);
