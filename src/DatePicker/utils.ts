import { monthNames, weekdayNames } from './constants'
import { DayDetails } from './interface'

export function getNumberOfDays(year: number, month: number) {
  // day starts from 1, 0th of next month is the last day of this month (this is called underflow)
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#parameters
  const lastDay = new Date(year, month + 1, 0);
  return lastDay.getDate();
}

export function getDayDetails(year: number, month: number, index: number): DayDetails {
  const numberOfDays = getNumberOfDays(year, month);
  
  const day = index % 7; // weekday index (0 to 6)
  
  const dateOffset = (function() {
    // weekday index (0-6) for first day of the month
    const firstWeekdayIndex = (new Date(year, month)).getDay();
    return index - firstWeekdayIndex;
  })();
  
  const date: number = (function() {
    if (dateOffset < 0) {
      let prevMonth = month - 1;
      let prevYear = year;
      if(prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
      return prevMonthNumberOfDays + dateOffset + 1
    }  else {
      return dateOffset % numberOfDays + 1;
    }
  })()
  
  const monthOffset: 0 | -1 | 1 = (function() {
    // 0 means this month, 1 means next month, -1 means prev month
    if (dateOffset < 0) return -1
    else if (dateOffset >= numberOfDays) return 1
    else return 0
  })()

  const timestamp = new Date(year, month + monthOffset, date).getTime();
  return {
    month: month + monthOffset,
    date,
    day,
    timestamp,
    description: `${monthNames[month + monthOffset]} ${date} ${weekdayNames[day]}`
  }
}

export function getMonthDetails(year: number, month: number): DayDetails[] {
  const monthArray: DayDetails[] = [];
  let index = 0; 
  for(let row = 0; row < 6; row++) { // 6 rows
    for(let col = 0; col < 7; col++) { // 7 cols
      const currentDay = getDayDetails(year, month, index);
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
  return monthNames[Math.max(Math.min(11, month), 0)] || 'Month';
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