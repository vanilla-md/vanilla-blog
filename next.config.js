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
};

export default nextConfig;
