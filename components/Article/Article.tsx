import { PropsWithChildren } from 'react';
import classes from './Article.module.css';

type ArticleProps = PropsWithChildren;

export default function Article({ children }: ArticleProps) {
  return (
    <article className={classes.Article}>
      <div className="markdown-body">{children}</div>
    </article>
  );
}
