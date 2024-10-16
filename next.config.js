/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    // https://nextjs.org/docs/messages/next-image-unconfigured-host
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'avatars.githubusercontent.com',
    //     port: '',
    //     pathname: '/u/**',
    //   },
    // ],
  },
  compiler: {
    styledComponents: true,
  },
  // https://nextjs.org/docs/app/building-your-application/configuring/eslint#linting-custom-directories-and-files
  eslint: {
    dirs: ['app', 'lib', 'utils', 'types'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};

export default nextConfig;
