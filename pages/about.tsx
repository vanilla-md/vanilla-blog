import { Heading } from '@primer/react';
import Link from '@/components/link';

export default function About() {
  return (
    <main>
      <Heading as="h1">About Page</Heading>
      <Link href="/">&larr; Go Back</Link>
    </main>
  );
}
