'use client';

import Header from '../Header';
import Navigation from '../Navigation/Navigation';
import Avatar from '../Avatar';
import Profile from '../Profile';
import Footer from '../Footer';
import classes from './Layout.module.css';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={classes.LayoutContainer}>
      <div className={classes.HeaderBox}>
        <Header />
      </div>
      <div className={classes.NavBox}>
        <Navigation />
      </div>
      <div className={classes.AvatarBox}>
        <Avatar href="/" />
      </div>
      <div className={classes.ProfileBox}>
        <Profile />
      </div>
      <main className={classes.MainBox}>{children}</main>
      <div className={classes.FooterBox}>
        <Footer />
      </div>
    </div>
  );
}
