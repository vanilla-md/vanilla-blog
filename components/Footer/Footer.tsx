import { Heading } from '@primer/react';
import MutedLink from '../Link/MutedLink';
import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.Footer}>
      <Heading as="h2" className={classes.FooterHeading}>
        License
      </Heading>
      <span className={classes.LinkContainer}>
        <MutedLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">
          CC BY-NC-SA 4.0
        </MutedLink>{' '}
        (unless otherwise stated)
      </span>
    </footer>
  );
}

export default Footer;
