const { exec } = require("child_process");

await Bun.build({
  entrypoints: ["./index.ts", "./tailwind.config.ts", "./theme/animations"],
  outdir: "./dist",
  minify: true,
  splitting: true,
  external: ["react", "react-dom", "next"],
  throw: false,
});

exec("bun build-css");
