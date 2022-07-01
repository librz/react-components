import { daysMap, monthMap } from './constants'

export function getNumberOfDays(year: number, month: number) {
  return 40 - new Date(year, month, 40).getDate();
}

export function getDayDetails(args: {
  index: number,
  numberOfDays: number,
  firstDay: number,
  year: number,
  month: number
}) {
  let date = args.index - args.firstDay; 
  let day = args.index%7;
  let prevMonth = args.month-1;
  let prevYear = args.year;
  if(prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  let _date = (date < 0 ? prevMonthNumberOfDays+date : date % args.numberOfDays) + 1;
  let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  let timestamp = new Date(args.year, args.month, _date).getTime();
  return {
    date: _date,
    day,
    month, 
    timestamp,
    dayString: daysMap[day]
  }
}

export function getMonthDetails(year: number, month: number) {
  const firstDay = (new Date(year, month)).getDay();
  const numberOfDays = getNumberOfDays(year, month);
  let monthArray = [];
  let rows = 6;
  let currentDay = null;
  let index = 0; 
  const cols = 7;

  for(let row=0; row<rows; row++) {
    for(let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
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