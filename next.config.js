// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = {
//   future: {
//     webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
//     // Looks like backward compatibility approach.
//   },
//   webpack(config) {
//     config.resolve.fallback = {
//       ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
//       // by next.js will be dropped. Doesn't make much sense, but how it is
//       fs: false, // the solution
//     };

//     return config;
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

module.exports = nextConfig;
