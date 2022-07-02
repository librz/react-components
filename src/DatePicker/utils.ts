import { daysMap, monthMap } from './constants'
import { DayDetails } from './interface'

export function getNumberOfDays(year: number, month: number) {
  return 40 - new Date(year, month, 40).getDate();
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
  const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  const timestamp = new Date(args.year, args.month, _date).getTime();
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
  let dateData = dateValue.split('-').map(d=>parseInt(d, 10));
  if(dateData.length < 3) 
      return null;

  let year = dateData[0];
  let month = dateData[1];
  let date = dateData[2];
  return {year, month, date};
}

export function getMonthStr(month: number): string {
  return monthMap[Math.max(Math.min(11, month), 0)] || 'Month';
}

export function getDateStringFromTimestamp(ts: number) {
  let dateObject = new Date(ts);
  let month = dateObject.getMonth()+1;
  let date = dateObject.getDate();
  return dateObject.getFullYear() 
    + '-' 
    + (month < 10 ? '0' + month : month) 
    + '-' 
    + (date < 10 ? '0' + date : date);
}