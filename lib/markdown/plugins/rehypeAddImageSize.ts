import sizeOf from 'image-size';
import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { isUrlExternal } from '@/utils';

const rehypeAddImageSize = () => {
  return async (tree: Root) => {
    const imageNodes: Element[] = [];
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties && node.properties.src) {
        const src = node.properties.src;
        if (typeof src === 'string' && !isUrlExternal(src)) {
          imageNodes.push(node);
        }
      }
    });
    await Promise.all(
      imageNodes.map(async (node) => {
        const src = node.properties.src as string;
        const imagePath = join(process.cwd(), 'public', src);
        const imageBuffer = await readFile(imagePath);
        const { width, height } = sizeOf(imageBuffer);
        node.properties.width = width;
        node.properties.height = height;
        node.properties.alt = dirname(src);
      }),
    );
  };
};

export default rehypeAddImageSize;
