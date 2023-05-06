export function padHttp(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  } else {
    return `https://${url}`;
  }
}

// Copied from vitepress/src/node/utils/slash.ts
// MIT License Copyright (c) 2019-present, Yuxi (Evan) You
export function slash(p: string): string {
  return p.replace(/\\/g, '/');
}
