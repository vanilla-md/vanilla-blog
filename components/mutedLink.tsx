import { Link, themeGet } from '@primer/react';
import styled from 'styled-components';

// muted link like the one in the GitHub profile page
const MutedLink = styled(Link)`
  color: ${themeGet('colors.fg.default')};
  &:hover {
    color: ${themeGet('colors.accent.fg')};
  }
`;

export default MutedLink;
