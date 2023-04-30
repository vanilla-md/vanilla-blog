// 请用 TypeScript 写一个 unified.js 插件 remarkAddH1，如果 mdast 中没有 level 1 的 heading，则根据 file.data.matter.title 添加 h1 heading
import type { VFile } from 'vfile';
import type { Plugin } from 'unified';
import type { Root, Heading } from 'mdast';
import { select } from 'unist-util-select';

interface RemarkAddH1Options {
  title?: string;
}

const remarkAddH1: Plugin<[RemarkAddH1Options?], Root, Root> = (options = {}) => {
  const { title = '' } = options;

  return (tree: Root, file: VFile) => {
    const heading1 = select('heading[depth=1]', tree);

    if (!heading1) {
      tree.children.unshift({
        type: 'heading',
        depth: 1,
        children: [{ type: 'text', value: title || file.data.matter?.title || '' }],
      });
    }
  };
};

export default remarkAddH1;
