import { Label, LabelGroup, themeGet } from '@primer/react';
import styled from 'styled-components';

export const SolidLabelGroup = styled(LabelGroup)`
  display: flex;
  align-items: center;
  margin: ${themeGet('space.1')} 0;
  font-size: ${themeGet('fontSizes.0')};
  height: 30px;
`;

export const SolidLabel = styled(Label)`
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
