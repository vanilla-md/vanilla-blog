import { Box, Heading, LabelGroup, RelativeTime } from '@primer/react';
import { CalendarIcon, ClockIcon, PencilIcon } from '@primer/octicons-react';
import Link from './link';
import SolidLabel from './solidLabel';
import { PostData } from '@/types';
import { isSameDay } from '@/utils';

type PostItemProps = PostData & { slug: string };

export function PostItem({
  slug,
  title,
  published,
  modified,
  description,
  readingTime,
  tags,
}: PostItemProps) {
  return (
    <Box
      as="li"
      sx={{
        listStyle: 'none',
        py: 4,
        borderBottomColor: 'border.muted',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Heading as="h3" sx={{ fontSize: 3 }}>
          <Link href={`/posts/${slug}`}>{title}</Link>
        </Heading>
      </Box>
      <Box>
        <Box
          as="p"
          title={description}
          sx={{ fontSize: 1, maxWidth: '70%', mt: 0, mb: 2, color: 'fg.muted' }}
        >
          {description}
        </Box>
      </Box>
      <Box sx={{ my: 1, verticalAlign: 'middle' }}>
        <LabelGroup sx={{ lineHeight: 1.8 }}>
          {tags.map((tag) => (
            <SolidLabel key={tag} size="large">
              {tag}
            </SolidLabel>
          ))}
        </LabelGroup>
      </Box>
      <Box sx={{ mt: 2, fontSize: 0, color: 'fg.muted' }}>
        <Box as="span" sx={{ mr: 3 }}>
          <CalendarIcon /> Published <RelativeTime datetime={published} />
        </Box>
        {!isSameDay(new Date(published), new Date(modified)) && (
          <Box as="span" sx={{ mr: 3 }}>
            <PencilIcon /> Modified <RelativeTime datetime={modified} />
          </Box>
        )}
        <Box as="span">
          <ClockIcon /> Reading Time: {readingTime}
        </Box>
      </Box>
    </Box>
  );
}
