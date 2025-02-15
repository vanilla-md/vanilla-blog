import { Label, LabelGroup, themeGet } from '@primer/react';
import styled from 'styled-components';

import { clsx } from 'clsx';
import classes from './SolidLabel.module.css';

// TODO: LabelGroup not accepting className
export const SolidLabelGroup = styled(LabelGroup)`
  display: flex;
  align-items: center;
  margin: ${themeGet('space.1')} 0;
  font-size: ${themeGet('fontSizes.0')};
  height: 30px;
`;

export const SolidLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof Label>) => {
  return <Label {...props} className={clsx(classes.SolidLabel, className)} />;
};
