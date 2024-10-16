import { select } from 'unist-util-select';
// import { noCase } from 'no-case';
// import { titleCase } from 'title-case';
import type { VFile } from 'vfile';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';

export function titleFromStem(stem: string): string {
  const regex = /^(?:\d{4}-\d{2}-\d{2}-)?(.*)$/;
  const matches = stem!.match(regex);

  if (matches !== null) {
    // return titleCase(noCase(matches[1]));
    // titleCase doesn't work with CJK
    return matches[1].split('-').join(' ');
  }

  return '';
}

interface RemarkAddH1Options {
  title?: string;
}

const remarkAddH1: Plugin<[RemarkAddH1Options?], Root, Root> = (
  options = {},
) => {
  const { title = '' } = options;

  return (tree: Root, file: VFile) => {
    const heading1 = select('heading[depth="1"]', tree);

    if (!heading1) {
      tree.children.unshift({
        type: 'heading',
        depth: 1,
        children: [
          {
            type: 'text',
            value:
              title || file.data.matter?.title || titleFromStem(file.stem!),
          },
        ],
      });
    }
  };
};

export default remarkAddH1;
