/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


// /** @type {import('next').NextConfig} */

// const nextConfig = {
//     experimental: {
//       turbo: {
//         rules: {
//           "*.svg": {
//             loaders: ["@svgr/webpack"],
//             as: "*.js",
//           },
//         },
//       },
//     },
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.svg$/,
//         use: ["@svgr/webpack"],
//       });
//       return config;
//     },
//     output: "export",
//   };
  
//   module.exports = nextConfig;