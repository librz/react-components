import { FC, useState, useEffect, useRef } from 'react'
import { getMonthDetails, getDateFromDateString, getDateStringFromTimestamp, getMonthStr } from './utils'
import './index.css'

interface IProps {
  onChange?: (ts: number) => void
}

// start of today in milliseconds
const todayTs = (function () {
  const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
  const nowTs = Date.now();
  return nowTs - (nowTs % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);
})()

const DatePicker: FC<IProps> = ({ onChange }) => {

  /* state */

  const date = new Date();

  const [showPicker, setShowPicker] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [year, setYear] = useState<number>(date.getFullYear());

  const [month, setMonth] = useState<number>(date.getMonth());

  const [selectedDay, setSelectedDay] = useState<number>(todayTs);

  const [monthDetails, setMonthDetails] = useState(getMonthDetails(date.getFullYear(), date.getMonth()));

  /* effects */

  useEffect(() => {
    // window.addEventListener()
    return () => {
      
    }
  }, [])

  /* functions */

  function isCurrentDay(day: { timestamp: number }) {
    return day.timestamp === todayTs;
  }

  function isSelectedDay(day: { timestamp: number }) {
    return day.timestamp === selectedDay;
  }

  function setDate(dateData: {
    year: number,
    month: number, 
    date?: number
  }) {
    let selectedDay = new Date(dateData.year, dateData.month-1, dateData.date).getTime();
    setSelectedDay(selectedDay)
    onChange && onChange(selectedDay)
  }

  function updateDateFromInput() {
    let dateValue = inputRef.current?.value;
    let dateData = getDateFromDateString(dateValue || "");
    if(dateData !== null) { 
      setDate(dateData)
      setYear(dateData.year)
      setMonth(dateData.month - 1)
      setMonthDetails(getMonthDetails(dateData.year, dateData.month - 1))
    }
  }

  function setDateToInput(timestamp: number) {
    let dateString = getDateStringFromTimestamp(timestamp);
    if (inputRef.current) {
      inputRef.current.value = dateString;
    }
  }

  function setYearByOffset(offset: number) {
    const _year = year + offset;
    const _month = month;
    setYear(_year);
    setMonthDetails(getMonthDetails(_year, _month))
  }

  function setMonthByOffset(offset: number) {
    let _year = year;
    let _month = month + offset;
    if(month === -1) {
        _month = 11;
        _year--;
    } else if(month === 12) {
        _month = 0;
        _year++;
    }
    setYear(_year)
    setMonth(_month)
    setMonthDetails(getMonthDetails(_year, _month))
  }

  function onDateClick(day: { timestamp: number }) {
    setSelectedDay(day.timestamp)
    setDateToInput(day.timestamp)
    if(onChange) {
      onChange(day.timestamp);
    }
  }

  /* view */

  function renderCalendar() {
    let days = monthDetails.map((day, index)=> {
      return (
        <div 
          className={
            'c-day-container ' 
            + (day.month !== 0 ? ' disabled' : '') 
            + (isCurrentDay(day) ? ' highlight' : '') 
            + (isSelectedDay(day) ? ' highlight-green' : '')
          } 
          key={index}
        >
          <div className='cdc-day'>
            <span onClick={() => onDateClick(day)}>
              {day.date}
            </span>
          </div>
        </div>
      )
    })

    return (
      <div className='c-container'>
        <div className='cc-head'>
          {
            ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(
              (d,i) =>
              <div key={i} className='cch-name'>{d}</div>
            )
          }
        </div>
        <div className='cc-body'>
          {days}
        </div>
      </div>
    )
  }

	return (
		<div className="MyDatePicker">
      <div className="mdp-input" onClick={() => { setShowPicker(true) }}>
        <input 
          type="date" 
          ref={inputRef}
          onChange={updateDateFromInput}
        />
      </div>
      {
        showPicker &&
        <div className="mdp-container">
          <div className='mdpc-head'>
            <div className='mdpch-button'>
              <div className='mdpchb-inner' onClick={()=> setYearByOffset(-1)}>
                <span className='mdpchbi-left-arrows' />
              </div>
            </div>
            <div className='mdpch-button'>
              <div className='mdpchb-inner' onClick={()=> setMonthByOffset(-1)}>
                <span className='mdpchbi-left-arrow' />
              </div>
            </div>
            <div className='mdpch-container'>
              <div className='mdpchc-year'>{year}</div>
              <div className='mdpchc-month'>{getMonthStr(month)}</div>
            </div>
            <div className='mdpch-button'>
              <div className='mdpchb-inner' onClick={()=> setMonthByOffset(1)}>
                <span className='mdpchbi-right-arrow' />
              </div>
            </div>
            <div className='mdpch-button' onClick={()=> setYearByOffset(1)}>
              <div className='mdpchb-inner'>
                <span className='mdpchbi-right-arrows' />
              </div>
            </div>
          </div>
          <div className='mdpc-body'>
            {renderCalendar()}
          </div>
        </div>
      }
    </div>
	)
}

export default DatePicker