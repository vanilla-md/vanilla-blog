import classes from './Article.module.css';

export default function Article({ html }: { html: string }) {
  return (
    <article className={classes.Article}>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
