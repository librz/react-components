import { daysMap, monthMap } from './constants'
import { DayDetails } from './interface'

export function getNumberOfDays(year: number, month: number) {
  // day starts from 1, 0th of next month is the last day of this month (this is called underflow)
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#parameters
  const lastDay = new Date(year, month + 1, 0);
  return lastDay.getDate();
}

export function getDayDetails(args: {
  index: number,
  numberOfDays: number,
  firstDay: number,
  year: number,
  month: number
}): DayDetails {
  const date = args.index - args.firstDay; 
  const day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if(prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  const _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
  // 0 means this month, 1 means next month, -1 mans prev month
  const month: 0 | -1 | 1 = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  const timestamp = new Date(args.year, args.month + month, _date).getTime();
  return {
    date: _date,
    day,
    month, 
    timestamp,
    dayString: daysMap[day]
  }
}

export function getMonthDetails(year: number, month: number): DayDetails[] {
  const monthArray: DayDetails[] = [];

  const rows = 6;
  const cols = 7;

  let currentDay = null;
  let index = 0; 

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays: getNumberOfDays(year, month),
        firstDay: (new Date(year, month)).getDay(),
        year,
        month
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
}

export function getDateFromDateString(dateValue: string) {
  const dateData = dateValue.split('-').map(d => parseInt(d, 10));
  if (dateData.length < 3) 
      return null;
  const [year, month, date] = dateData;
  return {year, month, date};
}

export function getMonthStr(month: number): string {
  return monthMap[Math.max(Math.min(11, month), 0)] || 'Month';
}

export function getDateStringFromTimestamp(ts: number) {
  const dateObject = new Date(ts);
  const month = dateObject.getMonth()+1;
  const date = dateObject.getDate();
  return dateObject.getFullYear() 
    + '-' 
    + (month < 10 ? '0' + month : month) 
    + '-' 
    + (date < 10 ? '0' + date : date);
}