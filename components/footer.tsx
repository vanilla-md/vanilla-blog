import { Heading, Text, themeGet } from '@primer/react';
import sx, { SxProp } from '@primer/react/lib-esm/sx';
import { ComponentProps } from '@primer/react/lib-esm/utils/types';
import styled from 'styled-components';
import MutedLink from './mutedLink';

const FooterBase = styled.footer<SxProp>`
  margin-top: ${themeGet('space.3')};
  padding-top: ${themeGet('space.3')};
  border-color: ${themeGet('colors.border.muted')};
  border-top-width: ${themeGet('borderWidths.1')};
  border-top-style: solid;
  ${sx}
`;

export type Props = {
  className?: string;
} & ComponentProps<typeof FooterBase>;

function Footer({ sx, className }: Props) {
  return (
    <FooterBase sx={sx} className={className}>
      <Heading sx={{ mb: 2, fontSize: 2 }}>License</Heading>
      <Text sx={{ fontSize: 1 }}>
        <MutedLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en">
          CC BY-NC-SA 4.0
        </MutedLink>{' '}
        (unless otherwise stated)
      </Text>
    </FooterBase>
  );
}

export default Footer;
