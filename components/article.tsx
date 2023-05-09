import { Box } from '@primer/react';

export default function Article({ html }: { html: string }) {
  return (
    <Box
      as="article"
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'border.default',
        borderRadius: 2,
        px: 5,
        py: 4,
      }}
    >
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
    </Box>
  );
}
