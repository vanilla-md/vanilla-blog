// https://github.com/you-dont-need/You-Dont-Need-Momentjs/blob/master/README.md#add
// https://github.com/date-fns/date-fns/blob/master/src
export const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const dayTab = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
] as const;

export function startOfDay(date: Date, local = true) {
  date = new Date(date);
  local ? date.setHours(0, 0, 0, 0) : date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function endOfDay(date: Date, local = true) {
  date = new Date(date);
  local ? date.setHours(23, 59, 59, 999) : date.setUTCHours(23, 59, 59, 999);
  return date;
}

export function addDays(date: Date, days: number, local = true) {
  date = new Date(date);
  local ? date.setDate(date.getDate() + days) : date.setUTCDate(date.getUTCDate() + days);
  return date;
}

export function lastDayInPreviousMonth(date: Date, local = true) {
  date = new Date(date);
  local ? date.setDate(0) : date.setUTCDate(0);
  return date;
}

export function isSameDay(a: Date, b: Date, local = true) {
  if (local) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  } else {
    return (
      a.getUTCFullYear() === b.getUTCFullYear() &&
      a.getUTCMonth() === b.getUTCMonth() &&
      a.getUTCDate() === b.getUTCDate()
    );
  }
}

export function nextDay(date: Date, local = true) {
  return addDays(date, 1, local);
}

export function subWeeks(date: Date, weeks: number, local = true) {
  date = new Date(date);
  local ? date.setDate(date.getDate() - 7 * weeks) : date.setUTCDate(date.getUTCDate() - 7 * weeks);
  return date;
}

export function startOfWeek(date: Date, weekStartsOn = 0, local = true) {
  date = new Date(date);
  if (local) {
    date.setDate(date.getDate() - date.getDay() + weekStartsOn);
    date.setHours(0, 0, 0, 0);
  } else {
    date.setUTCDate(date.getUTCDate() - date.getUTCDay() + weekStartsOn);
    date.setUTCHours(0, 0, 0, 0);
  }
  return date;
}

export function sundayWeeksAgo(date: Date, weeks: number) {
  let sunday = startOfWeek(date);
  sunday = subWeeks(sunday, weeks);
  return sunday;
}

export function startOfYear(date: Date, local = true) {
  date = new Date(date);
  if (local) {
    date.setFullYear(date.getFullYear(), 0, 1);
    date.setHours(0, 0, 0, 0);
  } else {
    date.setUTCFullYear(date.getUTCFullYear(), 0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }
  return date;
}

export function endOfYear(date: Date, local = true) {
  date = new Date(date);
  if (local) {
    date.setFullYear(date.getFullYear() + 1, 0, 0);
    date.setHours(23, 59, 59, 999);
  } else {
    date.setUTCFullYear(date.getUTCFullYear() + 1, 0, 0);
    date.setUTCHours(23, 59, 59, 999);
  }
  return date;
}

// 2021-01-01 to Date
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#several_ways_to_create_a_date_object
export function parseYMD(ymd: string, local = true) {
  const [year, month, day] = ymd.split('-').map((str) => +str);
  return local ? new Date(year, month - 1, day) : new Date(Date.UTC(year, month - 1, day));
}

export function pad0(num: number, length = 2): string {
  // return `0${num}`.slice(-2);
  return num.toString().padStart(length, '0');
}

export function trim0(str: string): string {
  return str.replace(/^0+(?=\d)/, '');
}

export function dateToYMD(date: Date, local = true) {
  return local
    ? `${date.getFullYear()}-${pad0(date.getMonth() + 1)}-${pad0(date.getDate())}`
    : `${date.getUTCFullYear()}-${pad0(date.getUTCMonth() + 1)}-${pad0(date.getUTCDate())}`;
}

export function dateToMDY(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    // timeZone: 'UTC',
  }).format(date);
}

export function dateToWMDY(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    // timeZone: 'UTC',
  }).format(date);
}

export function YMDToWMDY(ymd: string) {
  return dateToWMDY(parseYMD(ymd));
}

export function YMDToMDY(ymd: string) {
  return dateToMDY(parseYMD(ymd));
}

export function YMDToLocalTime(ymd: string) {
  const [year, month, day] = ymd.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function compareDesc(a: Date, b: Date): number {
  const diff = a.getTime() - b.getTime();
  if (diff === 0) {
    return diff;
  }
  return diff > 0 ? 1 : -1;
}

export function compareAsc(a: Date, b: Date): number {
  return -compareDesc(a, b);
}
