import siteData from '@/generated/siteData.json';

import classes from './Header.module.css';

export default function Header() {
  return (
    <>
      <div className={classes.PageHeader}>
        <h1 className={classes.Title}>{siteData.name ?? siteData.login}</h1>
        <div className={classes.Description}>{siteData.bio}</div>
      </div>
    </>
  );
}
