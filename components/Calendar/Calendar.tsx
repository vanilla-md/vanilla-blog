// refer to https://github.com/grubersjoe/react-activity-calendar/blob/bd9b2712846442b8f2ee09d9e45ab887d9785ef8/src/component/ActivityCalendar.tsx#L150
'use client';
import { Box, Heading, useTheme } from '@primer/react';
import React, { forwardRef, useRef } from 'react';
import { MouseEventHandler, useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import BorderBox from '../BorderBox';
import {
  addDays,
  parseYMD,
  dateToYMD,
  endOfDay,
  endOfYear,
  nextDay,
  startOfDay,
  startOfWeek,
  startOfYear,
  weekdays,
  months,
  YMDToWMDY,
  sundayWeeksAgo,
} from '@/utils';
import Tooltip, { tooltipLabelText, TooltipProps } from '../Tooltip';
import {
  GroupedPosts,
  getPostCountInPastYear,
  getPostCountInYear,
} from '@/lib/blogManager';
import classes from './Calendar.module.css';

export interface Day {
  date: string;
  count: number;
  level: number;
}

// undefined may be padded to the first week
type MaybeDay = Day | undefined;

type Week = Array<MaybeDay>;

type CalendarProps = {
  onMouseEnter?: MouseEventHandler<SVGRectElement>;
  onMouseLeave?: MouseEventHandler<SVGRectElement>;
  groupedPosts: GroupedPosts;
  selectedYear?: number;
  onDateSelect: (date: string) => void;
};

type Range = {
  from: Date;
  to: Date;
};

const halloweenPalette = [
  '#ebedf0',
  '#ffee4a',
  '#ffc501',
  '#fe9600',
  '#03001c',
];

// Moved to `_app.ts`
// const doodlePalette = ['#ebedf0', '#0a659e', '#f59a61', '#e51a4c'];

/* eslint-disable no-sparse-arrays */
// prettier-ignore
const doodleDotMap = [
  [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 2,  ,  ,  , 2,  ,  ,  , 2,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ],
  [  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 2,  ,  ,  , 2,  ,  ,  ,  ,  ,  ,  , 3, 3,  , 3, 3,  ,  ,  ,  ],
  [  ,  ,  ,  , 1,  ,  ,  ,  ,  ,  , 1,  ,  , 1,  ,  ,  ,  ,  , 2,  ,  ,  , 2,  ,  , 2, 2,  ,  , 2, 2, 2,  ,  , 2, 2, 2,  ,  ,  ,  , 3, 3, 3, 3, 3, 3, 3,  ,  ,  ],
  [  ,  ,  , 1,  ,  ,  ,  ,  ,  , 1,  ,  ,  ,  , 1,  ,  ,  ,  , 2,  , 2,  , 2,  ,  ,  , 2,  ,  ,  , 2,  ,  ,  , 2,  ,  , 2,  ,  ,  , 3, 3, 3, 3, 3, 3, 3,  ,  ,  ],
  [  ,  , 1,  ,  ,  ,  ,  ,  , 1,  ,  ,  ,  ,  ,  , 1,  ,  ,  , 2,  , 2,  , 2,  ,  ,  , 2,  ,  ,  , 2,  ,  ,  , 2,  ,  , 2,  ,  ,  ,  , 3, 3, 3, 3, 3,  ,  ,  ,  ],
  [  ,  ,  , 1,  ,  ,  ,  , 1,  ,  ,  ,  ,  ,  , 1,  ,  ,  ,  , 2,  , 2,  , 2,  ,  ,  , 2,  ,  ,  , 2,  ,  ,  , 2,  ,  , 2,  ,  ,  ,  ,  , 3, 3, 3,  ,  ,  ,  ,  ],
  [  ,  ,  ,  , 1,  ,  , 1,  ,  ,  ,  ,  ,  , 1,  ,  ,  ,  ,  ,  , 2,  , 2,  ,  ,  , 2, 2, 2,  ,  ,  , 2, 2,  , 2,  ,  , 2,  ,  ,  ,  ,  ,  , 3,  ,  ,  ,  ,  ,  ],
];
/* eslint-enable no-sparse-arrays */

function getDoodleDays(firstSunday: Date): Day[] {
  // https://stackoverflow.com/a/17428705/5783347
  // https://stackoverflow.com/questions/5501581/javascript-new-arrayn-and-array-prototype-map-weirdness
  return [...doodleDotMap[0]]
    .map((_, col) => doodleDotMap.map((row) => row[col]))
    .flat()
    .map((value, index) =>
      // value may be zero
      value !== undefined
        ? {
            date: dateToYMD(addDays(firstSunday, index)),
            count: value,
            level: value,
          }
        : undefined,
    )
    .filter((item) => item !== undefined) as Day[];
}

/**
 * normalize /overview&from=2021-12-01&to=2021-12-31
 * - from=2021-12-01&to=2021-12-31
 *    - { from: '2021-01-01', to: '2021-12-31' }
 * - from=2022-04-01&to=2022-04-04
 *    - { from: '2022-01-01', to: '2022-12-31' }
 * - <empty>
 *    - { from: '<one year age>', to: '<today>' }
 */
function normalizeRange(from?: string, to?: string): Range {
  let dateFrom: Date;
  let dateTo: Date;
  if (from === undefined && to === undefined) {
    const today = new Date();
    dateFrom = sundayWeeksAgo(today, 52);
    dateTo = endOfDay(today);
  } else {
    const date = parseYMD((to || from)!);
    dateFrom = startOfYear(date);
    dateTo = endOfYear(date);
  }
  return { from: dateFrom, to: dateTo };
}

function convertPostsToDays(GroupedPosts: GroupedPosts): Day[] {
  const result: Day[] = [];
  for (const [year, months] of GroupedPosts) {
    for (const [month, days] of months) {
      for (const [day, posts] of days) {
        result.push({
          date: [year, month, day].join('-'),
          count: posts.length,
          level: posts.length < 4 ? posts.length : 4,
        });
      }
    }
  }
  return result;
}

/** date in Day is a local YMD string */
function groupByWeeks(dataDays: Day[], range: Range) {
  // copied from https://github.com/grubersjoe/react-activity-calendar/blob/bd9b2712846442b8f2ee09d9e45ab887d9785ef8/src/util.ts#L55-L58
  const daysMap = dataDays.reduce((map, day) => {
    map.set(day.date, day);
    return map;
  }, new Map<string, Day>());

  let from = range.from;
  const to = range.to;

  const weeks: Week[] = [];

  while (startOfDay(from) <= startOfDay(to)) {
    // pad the first week
    const days: Array<MaybeDay> =
      weeks.length === 0
        ? new Array<undefined>(from.getDay()).fill(undefined)
        : [];
    while (days.length < 7 && startOfDay(from) <= startOfDay(to)) {
      const ymd = dateToYMD(from);
      days.push(
        daysMap.get(ymd) ?? {
          date: ymd,
          count: 0,
          level: 0,
        },
      );
      from = nextDay(from);
    }
    weeks.push(days);
  }
  return weeks;
}

const rectSize = 11;
const rectRadius = 2;
const rectGap = 4;
const rectStep = rectSize + rectGap;
const weekdayLabelWidth = 31;
const monthLabelHeight = rectStep;
const paletteHeight = rectStep * 2 - rectGap;

const Calendar = forwardRef<SVGSVGElement, CalendarProps>(
  (
    { groupedPosts, selectedYear, onDateSelect, onMouseEnter, onMouseLeave },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const { theme } = useTheme();
    const range = selectedYear
      ? normalizeRange(`${selectedYear}-01-01`, `${selectedYear}-12-31`)
      : normalizeRange();
    const data = convertPostsToDays(groupedPosts);
    const postsWeeks = groupByWeeks(data ?? [], range);
    const doodleWeeks = groupByWeeks(
      getDoodleDays(startOfWeek(range.from)),
      range,
    );
    const weeks = isHovered || selectedYear ? postsWeeks : doodleWeeks;

    return (
      <svg
        aria-label="Activity calendar for posts"
        ref={ref}
        width={weekdayLabelWidth + weeks.length * rectStep - rectGap}
        height={monthLabelHeight + 7 * rectStep - rectGap + paletteHeight}
        onMouseEnter={() => setIsHovered(true)}
        style={{ direction: 'ltr' }}
      >
        <g transform={`translate(${weekdayLabelWidth}, ${monthLabelHeight})`}>
          {weeks.map((week, index) => (
            <g
              transform={`translate(${index * rectStep}, 0)`}
              key={range.from.getTime() + index}
            >
              {week.map(
                (day, index) =>
                  day && (
                    <rect
                      onClick={() => onDateSelect(day.date)}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      width={rectSize}
                      height={rectSize}
                      x="0"
                      y={index * rectStep}
                      rx={rectRadius}
                      ry={rectRadius}
                      key={day.date}
                      data-count={day.count}
                      data-date={day.date}
                      data-level={day.level}
                      fill={
                        isHovered || selectedYear
                          ? theme!.colors.calendar.halloween[day.level]
                          : theme!.colors.calendar.doodle[day.level]
                      }
                    ></rect>
                  ),
              )}
            </g>
          ))}
        </g>
        <g transform={`translate(0, ${monthLabelHeight})`}>
          {weekdays.map(
            (weekday, index) =>
              index % 2 === 1 && (
                <text
                  dominantBaseline="hanging"
                  x="0"
                  y={index * rectStep}
                  fill={theme!.colors.fg.default}
                  fontSize="12px"
                  key={weekday}
                >
                  {weekday.slice(0, 3)}
                </text>
              ),
          )}
        </g>
        <g transform={`translate(${weekdayLabelWidth}, 0)`}>
          {weeks
            .reduce(
              (monthObjects, week, index, arr) => {
                // The first week may have padding undefined items
                const firstDay = week.find((day) => day !== undefined)!;
                const month = months[parseYMD(firstDay.date).getMonth()];
                // prevMonth of the first month is undefined
                // [][-1] === undefined
                const prevMonth = monthObjects[monthObjects.length - 1]?.month;
                if (month !== prevMonth && index < arr.length - 1) {
                  // If the first month label has been added above col 1, (monthObjects.length === 1)
                  // and the second month label is going to be added above col 2 (index === 1)
                  // We delete the first one to avoid overlapping
                  if (monthObjects.length === 1 && index === 1) {
                    monthObjects = [];
                  }
                  monthObjects.push({ month, index });
                }
                return monthObjects;
              },
              [] as Array<{ month: (typeof months)[number]; index: number }>,
            )
            .map(({ month, index }) => (
              <text
                dominantBaseline="hanging"
                x={index * rectStep}
                y="0"
                fill={theme!.colors.fg.default}
                fontSize="12px"
                key={month + index}
              >
                {month.slice(0, 3)}
              </text>
            ))}
        </g>
        <g
          transform={`translate(${
            weekdayLabelWidth +
            (weeks.length - halloweenPalette.length - 1) * rectStep
          }, ${monthLabelHeight + 8 * rectStep - rectGap})`}
        >
          {
            <text
              x={-rectStep + 4}
              y="1px"
              dominantBaseline="hanging"
              fill={theme!.colors.fg.default}
              fontSize="12px"
            >
              1
            </text>
          }
          {halloweenPalette.slice(1).map((color, index) => (
            <rect
              key={color}
              width={rectSize}
              height={rectSize}
              x={index * rectStep}
              y="0"
              rx={rectRadius}
              ry={rectRadius}
              fill={color}
            ></rect>
          ))}
          {
            <text
              x={(halloweenPalette.length - 1) * rectStep}
              y="1px"
              dominantBaseline="hanging"
              fill={theme!.colors.fg.default}
              fontSize="12px"
            >
              4+
            </text>
          }
        </g>
      </svg>
    );
  },
);

Calendar.displayName = 'Calendar';

const MemoizedCalendar = React.memo(Calendar);

MemoizedCalendar.displayName = 'MemoizedCalendar';

type CalendarWithTooltipProps = CalendarProps;

function CalendarWithTooltip({ ...props }: CalendarWithTooltipProps) {
  const calendarRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const groupedPosts = props.groupedPosts;
  const selectedYear = props.selectedYear;
  const postCount = selectedYear
    ? getPostCountInYear(groupedPosts, selectedYear)
    : getPostCountInPastYear(groupedPosts);

  const [tooltip, setTooltip] = useState<{
    count: number;
    date: string;
    level: number;
    direction: TooltipProps['direction'];
    x: number;
    y: number;
  } | null>(null);

  const showTooltip: MouseEventHandler<SVGRectElement> = useCallback(function (
    e,
  ) {
    const rect = e.target as SVGRectElement;
    const rectBounds = rect.getBoundingClientRect();
    const x = rectBounds.left + window.scrollX - rectBounds.width / 2 + 11;
    const y = rectBounds.bottom + window.scrollY - rectBounds.height * 2 + 6;
    flushSync(() =>
      setTooltip({
        count: Number(rect.dataset['count']!),
        date: rect.dataset['date']!,
        level: Number(rect.dataset['level']!),
        direction: 'center',
        x,
        y,
      }),
    );

    const svgBounds = calendarRef.current!.getBoundingClientRect();
    const tooltipBounds = tooltipRef.current!.getBoundingClientRect();
    let style: 'left' | 'center' | 'right' = 'center';
    if (tooltipBounds.left < svgBounds.left) {
      style = 'left';
    } else if (tooltipBounds.right > svgBounds.right) {
      style = 'right';
    }
    if (style !== 'center') {
      flushSync(() => {
        setTooltip((prev) => ({
          ...prev!,
          direction: style,
        }));
      });
    }
  }, []);

  const hideTooltip: MouseEventHandler<SVGRectElement> = useCallback(
    function () {
      setTooltip(null);
    },
    [],
  );

  return (
    <Box
      as="section"
      sx={{
        mt: 4,
      }}
    >
      <Heading as="h2" sx={{ mb: 2, fontSize: 2, fontWeight: 'normal' }}>
        {postCount === 1
          ? '1 post'
          : `${postCount === 0 ? 'No' : postCount} posts `}
        in {selectedYear ? selectedYear : 'the last year'}
      </Heading>
      <BorderBox className={classes.SVGContainer}>
        <MemoizedCalendar
          ref={calendarRef}
          {...props}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
      </BorderBox>
      <Tooltip
        ref={tooltipRef}
        direction={tooltip?.direction}
        hidden={tooltip === null}
        style={
          tooltip
            ? { display: 'inline-block', left: tooltip.x, top: tooltip.y }
            : {}
        }
      >
        <strong>{tooltip && tooltipLabelText(tooltip.count)}</strong>
        {tooltip && ` on ${YMDToWMDY(tooltip.date)}`}
      </Tooltip>
    </Box>
  );
}

export default CalendarWithTooltip;
