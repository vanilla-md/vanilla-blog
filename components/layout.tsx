import { Box } from '@primer/react';
import Header from './header';
import Navigation from './navigation';
import Avatar from './avatar';
import Profile from './profile';
import Footer from './footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto auto auto auto auto 1fr',
        gridTemplateColumns: [
          'calc(100% / 6 + 36px) 1fr',
          'calc(100% / 6 + 36px) 1fr',
          '0 256px 1fr 0',
          '0 296px 1fr 0',
          '1fr 296px calc(1280px - 296px - 24px * 3) 1fr',
        ],
        columnGap: [undefined, undefined, '24px'],
      }}
    >
      <Box
        sx={{
          gridRow: ['1 / 2'],
          gridColumn: ['2 / -1', '2 / -1', '3 / -1'],
          alignSelf: 'center',
          py: '16px',
          zIndex: 2,
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{
          position: [undefined, undefined, 'sticky'],
          top: [undefined, undefined, 0],
          gridRow: ['2 / 3'],
          gridColumn: ['1 / -1'],
        }}
      >
        <Navigation />
      </Box>
      <Box
        sx={{
          gridRow: ['1 / 2', '1 / 2', '1 / 4'],
          gridColumn: ['1 / 2', '1 / 2', '2 / 3'],
          alignSelf: ['center', 'center', 'auto'],
          ml: ['16px', '16px', 0],
          mr: ['16px', '16px', 0],
          mt: [0, 0, '16px'],
          zIndex: 3,
        }}
      >
        <Avatar href="/" sx={{ width: '100%' }} />
      </Box>
      <Box
        sx={{
          display: ['none', 'none', 'block'],
          gridRow: [undefined, undefined, '4 / 5'],
          gridColumn: [undefined, undefined, '2 / 3'],
        }}
      >
        <Profile />
      </Box>
      <Box
        as="main"
        sx={{
          gridRow: ['3', '3', '3 / -1'],
          gridColumn: ['1 / 3', '1 / 3', '3 / 4'],
          py: 3,
          px: [3, 3, 0],
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          display: ['none', 'none', 'block'],
          gridRow: [undefined, undefined, '5 / 6'],
          gridColumn: [undefined, undefined, '2 / 3'],
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
