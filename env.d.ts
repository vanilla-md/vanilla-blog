/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    GITHUB_TOKEN: string;
    LOGIN: string;
  }
}

declare module '@/generated/siteData.json' {
  const siteData: import('@/types').SiteData;
  export default siteData;
}
