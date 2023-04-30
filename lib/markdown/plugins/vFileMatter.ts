// https://github.com/remarkjs/remark-frontmatter#example-frontmatter-as-metadata
import type { Plugin } from 'unified';
import type { VFile } from 'vfile';
import { matter } from 'vfile-matter';

const vFileMatter: Plugin<Array<void>> = function vFileMatter() {
  function transformer(_: any, file: VFile) {
    matter(file);
  }

  return transformer;
};

export default vFileMatter;
