'use client';

import { Box, Text, Heading, RelativeTime } from '@primer/react';
import { CalendarIcon, ClockIcon, PencilIcon } from '@primer/octicons-react';
import { Link } from '../Link';
import { SolidLabel, SolidLabelGroup } from '../SolidLable';
import { isSameDay } from '@/utils';
import type { PageData } from '@/types';

export default function PostItem({
  slug,
  title,
  published,
  modified,
  description,
  readingTime,
  tags,
}: PageData) {
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
      <div>
        <Text
          as="p"
          title={description}
          sx={{ fontSize: 1, maxWidth: '70%', mt: 0, mb: 2, color: 'fg.muted' }}
        >
          {description}
        </Text>
      </div>
      {tags.length > 0 && (
        <Box sx={{ my: 1, verticalAlign: 'middle' }}>
          <SolidLabelGroup>
            {tags.map((tag) => (
              <SolidLabel key={tag} size="large">
                {tag}
              </SolidLabel>
            ))}
          </SolidLabelGroup>
        </Box>
      )}
      <Box sx={{ mt: 2, fontSize: 0, color: 'fg.muted' }}>
        <Text sx={{ mr: 3 }}>
          <CalendarIcon /> Published <RelativeTime datetime={published} />
        </Text>
        {!isSameDay(new Date(published), new Date(modified)) && (
          <Text sx={{ mr: 3 }}>
            <PencilIcon /> Modified <RelativeTime datetime={modified} />
          </Text>
        )}
        <span>
          <ClockIcon /> Reading Time: {readingTime}
        </span>
      </Box>
    </Box>
  );
}
