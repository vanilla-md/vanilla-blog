namespace NodeJS {
  interface ProcessEnv {
    GITHUB_TOKEN: string;
    LOGIN: string;
  }
}

import { SiteData } from '@/types';

declare module '@/generated/siteData.json' {
  const siteData: SiteData;
  export default siteData;
}
