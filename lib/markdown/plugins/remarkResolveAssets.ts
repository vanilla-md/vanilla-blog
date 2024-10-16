import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';
import type { Plugin, Processor } from 'unified';
import type { Image, Root } from 'mdast';
import path from 'path';

const remarkResolveAssets: Plugin<
  Array<void>,
  Root,
  Root
> = function remarkResolveAssets(this: Processor) {
  return (tree: Root, file: VFile) => {
    const { srcDir } = this.data() as { srcDir: string };

    visit(tree, 'image', (image: Image) => {
      if (
        image.url.startsWith('https://') ||
        image.url.startsWith('http://') ||
        image.url.startsWith('//') ||
        image.url.startsWith('/')
      ) {
        return;
      }
      // path.resolve('/somewhere/blog/posts/post.md', '../assets/figure.png')
      // '/somewhere/blog/assets/figure.png'
      const imagePath = path.resolve(path.dirname(file.path), image.url);
      // path.relative('/somewhere/blog', '/somewhere/blog/assets/figure.png')
      // 'assets/figure.png'
      const relativeImagePath = path.relative(srcDir, imagePath);
      image.url = path.resolve('/', relativeImagePath);
    });
  };
};

export default remarkResolveAssets;
