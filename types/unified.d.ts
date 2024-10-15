// https://github.com/unifiedjs/unified?tab=readme-ov-file#processordatakey-value
// https://github.com/unifiedjs/unified?tab=readme-ov-file#data
declare module 'unified' {
  interface Data {
    srcDir: string;
    websiteUrl: string;
  }
}

export {};
