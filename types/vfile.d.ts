import type { VFile } from 'vfile';

// VFile.data.matter/meta set by unified plugins
// The final post meta(./meta.d.ts) is based on them
export interface Matter {
  title?: string;
  date?: string | Date;
}

export interface Meta {
  // from rehype-infer-description-meta
  /**
   * Description of this document.
   *
   * Populated by `rehype-infer-description-meta` from the HTML.
   */
  description?: string;
  /**
   * Description of this document, in hast form.
   *
   * Populated by `rehype-infer-description-meta` from the HTML.
   */
  descriptionHast?: Root | Element;
  /**
   * Estimated reading time of a document.
   *
   * Populated by `rehype-infer-reading-time-meta` from the HTML.
   */

  // from rehype-infer-reading-time-meta
  readingTime?: number | [number, number];
  /**
   * Title of this document.
   *
   * Populated by `rehype-infer-title-meta` from the HTML.
   */

  // from rehype-infer-title-meta
  title?: string;
  /**
   * Date when this content was first published.
   *
   * Populated by `unified-infer-git-meta` from Git history.
   */

  // from unified-infer-git-meta
  published?: Date;

  /**
   * Date when this content was last modified.
   *
   * Populated by `unified-infer-git-meta` from Git history.
   */
  modified?: Date;

  /**
   * Authors who contributed to this content.
   *
   * Populated by `unified-infer-git-meta` from Git history.
   */
  author?: string;
}

declare module 'vfile' {
  interface DataMap {
    // https://github.com/vfile/vfile-matter#types
    matter: Matter;
    meta: Meta;
  }
}
