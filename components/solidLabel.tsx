import { Label, themeGet } from '@primer/react';
import styled from 'styled-components';

const SolidLabel = styled(Label)`
  font-weight: ${themeGet('fontWeights.semibold')};
  color: ${themeGet('colors.accent.fg')};
  border: 1px solid ${themeGet('colors.topicTag.border')};
  background-color: ${themeGet('colors.accent.subtle')};

  &:hover {
    cursor: pointer;
    color: ${themeGet('colors.fg.onEmphasis')};
    background-color: ${themeGet('colors.accent.emphasis')};
  }
`;
export default SolidLabel;
