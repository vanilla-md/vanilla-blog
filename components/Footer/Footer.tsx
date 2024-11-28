import { Heading, Text } from '@primer/react';
import MutedLink from '../Link/MutedLink';
import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.Footer}>
      <Heading as="h2" sx={{ mb: 2, fontSize: 2 }}>
        License
      </Heading>
      <Text sx={{ fontSize: 1 }}>
        <MutedLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">
          CC BY-NC-SA 4.0
        </MutedLink>{' '}
        (unless otherwise stated)
      </Text>
    </footer>
  );
}

export default Footer;
