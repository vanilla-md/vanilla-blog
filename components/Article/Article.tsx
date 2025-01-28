import classes from './Article.module.css';

export default function Article({ children }: { children: JSX.Element }) {
  return (
    <article className={classes.Article}>
      <div className="markdown-body">{children}</div>
    </article>
  );
}
