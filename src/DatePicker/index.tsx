import { FC, useState, useEffect, useRef } from 'react'
import { getMonthDetails, getDateFromDateString, getDateStringFromTimestamp, getMonthStr } from './utils'
import classNames from 'classnames'
import './index.css'

interface IProps {
  onChange?: (ts: number) => void
}

let todayTs = (function() {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  return now - (now % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60)
})()

// const todayTimestamp = (function() {
//   const now = new Date();
//   const offset = 60 * 60 * 1000 * now.getHours() 
//     + 60 * 1000 * now.getMinutes() 
//     + 1000 * now.getSeconds();
//   return now.getTime() - offset;
// })()

// console.log("todayTimestamp", todayTimestamp)

const DatePicker: FC<IProps> = ({ onChange }) => {

  const date = new Date();
  
  /* state */

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
    const days = monthDetails.map((day, index)=> {
      const dayClassname = classNames('day-container', {
        'disabled': day.month !== 0,
        'highlight': isSelectedDay(day),
      })
      if (isCurrentDay(day)) {
        console.log(`${day.timestamp} is current day ${todayTs}`)
      }
      return (
        <div key={index} className={dayClassname}>
          <div className='day' onClick={() => onDateClick(day)}>
            {day.date}
          </div>
        </div>
      )
    })

    return (
      <div className='calendar'>
        <div>
          {
            ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(
              (d,i) =>
              <div key={i} className='cch-name'>{d.slice(0, 1)}</div>
            )
          }
        </div>
        <div>
          {days}
        </div>
      </div>
    )
  }

	return (
		<div className="datepicker">
      <div className="dateinput" onClick={() => { setShowPicker(true) }}>
        <input 
          type="date" 
          ref={inputRef}
          onChange={updateDateFromInput}
        />
      </div>
      {
        showPicker &&
        <div className="datepanel">
          <div className='datepanel-head'>
            <div className='month-display'>{getMonthStr(month)} {year}</div>
            <div className='month-changer'>
              <div onClick={()=> setMonthByOffset(-1)}>
                <span />
              </div>
              <div onClick={()=> setMonthByOffset(1)}>
                <span />
              </div>
            </div>
          </div>
          {renderCalendar()}
        </div>
      }
    </div>
	)
}

export default DatePicker