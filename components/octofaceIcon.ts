// https://unpkg.com/browse/@primer/styled-octicons@13.0.0/dist/icons/OctofaceIcon.js
import React from 'react';
import { compose, space, color } from 'styled-system';
import css, { SystemStyleObject } from '@styled-system/css';
import styled from 'styled-components';
import type { Icon } from '@primer/styled-octicons';

type Size = 'small' | 'medium' | 'large' | number;

const sizeMap: {
  small: 16;
  medium: 32;
  large: 64;
  [size: number]: undefined;
} = {
  small: 16,
  medium: 32,
  large: 64,
};

type BaseIconProps = {
  className?: string;
  size: Size;
  'aria-label'?: string;
  fill?: string;
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset';
};

type _RefProps = BaseIconProps & {
  svgDataByHeight: {
    [index: number]: {
      width: number;
      path: string;
    };
  };
};

function getSvgProps(_ref: _RefProps) {
  const ariaLabel = _ref['aria-label'],
    className = _ref.className,
    _ref$fill = _ref.fill,
    fill = _ref$fill === undefined ? 'currentColor' : _ref$fill,
    size = _ref.size,
    verticalAlign = _ref.verticalAlign,
    svgDataByHeight = _ref.svgDataByHeight;

  const height = sizeMap[size] || (size as number);
  const naturalHeight = closestNaturalHeight(
    Object.keys(svgDataByHeight),
    height,
  );
  const naturalWidth = svgDataByHeight[naturalHeight].width;
  const width = height * (naturalWidth / naturalHeight);
  const path = svgDataByHeight[naturalHeight].path;

  return {
    'aria-hidden': ariaLabel ? 'false' : 'true',
    'aria-label': ariaLabel,
    role: 'img',
    className: className,
    viewBox: '0 0 ' + naturalWidth + ' ' + naturalHeight,
    width: width,
    height: height,
    fill: fill,
    style: {
      display: 'inline-block',
      userSelect: 'none',
      verticalAlign: verticalAlign,
      overflow: 'visible',
    },
    dangerouslySetInnerHTML: { __html: path },
  };
}

function closestNaturalHeight(naturalHeights: string[], height: number) {
  return naturalHeights
    .map(function (naturalHeight) {
      return parseInt(naturalHeight, 10);
    })
    .reduce(function (acc, naturalHeight) {
      return naturalHeight <= height ? naturalHeight : acc;
    });
}

const _extends = Object.assign;

function OctofaceIcon(props: BaseIconProps) {
  const svgDataByHeight = {
    '16': {
      width: 16,
      path: '<path fill-rule="evenodd" d="M1.326 1.973a1.2 1.2 0 011.49-.832c.387.112.977.307 1.575.602.586.291 1.243.71 1.7 1.296.022.027.042.056.061.084A13.22 13.22 0 018 3c.67 0 1.289.037 1.861.108l.051-.07c.457-.586 1.114-1.004 1.7-1.295a9.654 9.654 0 011.576-.602 1.2 1.2 0 011.49.832c.14.493.356 1.347.479 2.29.079.604.123 1.28.07 1.936.541.977.773 2.11.773 3.301C16 13 14.5 15 8 15s-8-2-8-5.5c0-1.034.238-2.128.795-3.117-.08-.712-.034-1.46.052-2.12.122-.943.34-1.797.479-2.29zM8 13.065c6 0 6.5-2 6-4.27C13.363 5.905 11.25 5 8 5s-5.363.904-6 3.796c-.5 2.27 0 4.27 6 4.27z"></path><path d="M4 8a1 1 0 012 0v1a1 1 0 01-2 0V8zm2.078 2.492c-.083-.264.146-.492.422-.492h3c.276 0 .505.228.422.492C9.67 11.304 8.834 12 8 12c-.834 0-1.669-.696-1.922-1.508zM10 8a1 1 0 112 0v1a1 1 0 11-2 0V8z"></path>',
    },
    '24': {
      width: 24,
      path: '<path d="M7.75 11c-.69 0-1.25.56-1.25 1.25v1.5a1.25 1.25 0 102.5 0v-1.5C9 11.56 8.44 11 7.75 11zm1.27 4.5a.469.469 0 01.48-.5h5a.47.47 0 01.48.5c-.116 1.316-.759 2.5-2.98 2.5s-2.864-1.184-2.98-2.5zm7.23-4.5c-.69 0-1.25.56-1.25 1.25v1.5a1.25 1.25 0 102.5 0v-1.5c0-.69-.56-1.25-1.25-1.25z"></path><path fill-rule="evenodd" d="M21.255 3.82a1.725 1.725 0 00-2.141-1.195c-.557.16-1.406.44-2.264.866-.78.386-1.647.93-2.293 1.677A18.442 18.442 0 0012 5c-.93 0-1.784.059-2.569.17-.645-.74-1.505-1.28-2.28-1.664a13.876 13.876 0 00-2.265-.866 1.725 1.725 0 00-2.141 1.196 23.645 23.645 0 00-.69 3.292c-.125.97-.191 2.07-.066 3.112C1.254 11.882 1 13.734 1 15.527 1 19.915 3.13 23 12 23c8.87 0 11-3.053 11-7.473 0-1.794-.255-3.647-.99-5.29.127-1.046.06-2.15-.066-3.125a23.652 23.652 0 00-.689-3.292zM20.5 14c.5 3.5-1.5 6.5-8.5 6.5s-9-3-8.5-6.5c.583-4 3-6 8.5-6s7.928 2 8.5 6z"></path>',
    },
  };
  return React.createElement(
    'svg',
    getSvgProps(_extends({}, props, { svgDataByHeight: svgDataByHeight })),
  );
}

OctofaceIcon.defaultProps = {
  className: 'octicon octicon-octoface',
  size: 16,
  verticalAlign: 'text-bottom',
};

// eslint-disable-next-line import/no-namespace

const COMMON = compose(space, color);

const sx = function sx(props: { sx?: SystemStyleObject }) {
  return css(props.sx);
};

/* THIS FILE IS GENERATED. DO NOT EDIT IT. */

const StyledOctofaceIcon: Icon = styled(OctofaceIcon)(COMMON, sx);

export default StyledOctofaceIcon;
