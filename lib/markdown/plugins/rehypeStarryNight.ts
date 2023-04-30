// https://github.com/wooorm/starry-night#example-integrate-with-unified-remark-and-rehype
// MIT Copyright (c) 2022 Titus Wormer <tituswormer@gmail.com>
import { createStarryNight, common, type Grammar } from '@wooorm/starry-night';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import type { Root, ElementContent } from 'hast';

interface Options {
  grammars?: Grammar[];
}

export default function rehypeStarryNight(options: Options = {}) {
  const grammars = options.grammars || common;
  const starryNightPromise = createStarryNight(grammars);
  const prefix = 'language-';

  return async function (tree: Root) {
    const starryNight = await starryNightPromise;

    visit(tree, 'element', function (node, index, parent) {
      if (!parent || index === null || node.tagName !== 'pre') {
        return;
      }

      const head = node.children[0];

      if (!head || head.type !== 'element' || head.tagName !== 'code' || !head.properties) {
        return;
      }

      const classes = head.properties.className;

      if (!Array.isArray(classes)) return;

      const language = classes.find((d) => typeof d === 'string' && d.startsWith(prefix));

      if (typeof language !== 'string') return;

      const scope = starryNight.flagToScope(language.slice(prefix.length));

      // Maybe warn?
      if (!scope) return;

      const fragment = starryNight.highlight(toString(head), scope);
      const children = fragment.children as ElementContent[];

      parent.children.splice(index, 1, {
        type: 'element',
        tagName: 'div',
        properties: {
          className: [
            'highlight',
            'highlight-' + scope.replace(/^source\./, '').replace(/\./g, '-'),
          ],
        },
        children: [{ type: 'element', tagName: 'pre', properties: {}, children }],
      });
    });
  };
}
