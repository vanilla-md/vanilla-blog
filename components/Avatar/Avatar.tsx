import Link from 'next/link';
import Image from 'next/image';
import siteData from '@/generated/siteData.json';
import classes from './Avatar.module.css';

interface AvatarProps {
  href: string;
}

export default function Avatar({ href }: AvatarProps) {
  return (
    <Link href={href} className={classes.AvatarWrapper}>
      <Image
        src={siteData.avatarUrl}
        className={classes.AvatarImg}
        fill
        alt="avatar"
      />
    </Link>
  );
}
