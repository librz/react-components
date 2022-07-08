export interface DayDetails {
  month: number; // month index (0 to 11)
  date: number; // day of month, starting from 1
  day: number; // weekday index (0 to 6, where 0 means sunday)
  timestamp: number; // ts for start of day
  description: string;
}