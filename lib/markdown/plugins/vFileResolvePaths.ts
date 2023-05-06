import path from 'node:path';
import { VFile } from 'vfile';
import { slash } from '@/utils';
import type { Plugin, Processor } from 'unified';

const vFileResolvePaths: Plugin<Array<void>> = function vFileResolvePaths(this: Processor) {
  return (_: any, file: VFile) => {
    const { srcDir, websiteUrl } = this.data() as { srcDir: string; websiteUrl: string };
    const relativePath = path.relative(srcDir, file.path);
    const relativePathWithoutExtname = relativePath.slice(0, -file.extname!.length);
    // TODO: Is it better to prepend a dirname?
    file.data.slug = file.stem!;
    file.data.relativePath = slash(relativePath);
    file.data.url = new URL(slash(relativePathWithoutExtname), websiteUrl).href;
  };
};

export default vFileResolvePaths;
