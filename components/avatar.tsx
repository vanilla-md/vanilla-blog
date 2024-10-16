import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import sx from '@primer/react/lib-esm/sx';
import { ComponentProps } from '@primer/react/lib-esm/utils/types';
import siteData from '@/generated/siteData.json';

const StyledAvatarImg = styled(Image)`
  border-radius: 50%;
  box-shadow: 0 0 0 1px #1b1f2426;
`;

const AvatarWrapper = styled(Link)`
  display: inline-block;
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  ${sx};
`;

type AvatarProps = {} & ComponentProps<typeof AvatarWrapper>;

export default function Avatar({ sx, className, href }: AvatarProps) {
  return (
    <AvatarWrapper
      sx={{ verticalAlign: 'middle', ...sx }}
      href={href}
      className={className}
    >
      <StyledAvatarImg src={siteData.avatarUrl} fill alt="avatar" />
    </AvatarWrapper>
  );
}
