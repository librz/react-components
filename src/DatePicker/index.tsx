import { FC, useState, useEffect, useRef } from 'react'
import { getMonthDetails, getDateFromDateString, getDateStringFromTimestamp, getMonthStr } from './utils'
import classNames from 'classnames'
import { weekdayNames } from './constants'
import { DayDetails } from './interface'
import './index.css'

interface IProps {
  onChange?: (ts: number) => void
}

const todayTs = (function() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today.getTime()
})();

const DatePicker: FC<IProps> = ({ onChange }) => {

  const date = new Date();
  
  /* state */

  const [showPicker, setShowPicker] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [month, setMonth] = useState({
    year: date.getFullYear(),
    index: date.getMonth() // month index
  })

  const [selectedDayTs, setSelectedDayTs] = useState<number>(todayTs); // today is selected by default

  /* effects */

  useEffect(() => {
    // window.addEventListener()
    return () => {
      
    }
  }, [])

  /* functions */

  function isSelectedDay(day: { timestamp: number }) {
    return day.timestamp === selectedDayTs;
  }

  function setDate(dateData: {
    year: number,
    month: number, 
    date?: number
  }) {
    const ts = new Date(dateData.year, dateData.month-1, dateData.date).getTime();
    setSelectedDayTs(ts)
    onChange && onChange(ts)
  }

  function updateDateFromInput() {
    let dateValue = inputRef.current?.value;
    let dateData = getDateFromDateString(dateValue || "");
    if(dateData !== null) { 
      setDate(dateData)
      setMonth({
        year: dateData.year,
        index: dateData.month - 1
      })
    }
  }

  function setMonthByOffset(offset: number) {
    const newMonthIndex = month.index + offset;
    if (newMonthIndex === -1) {
      setMonth({
        year: month.year - 1,
        index: 11
      })
    } else if(newMonthIndex === 12) {
      setMonth({
        year: month.year + 1,
        index: 0
      })
    } else {
      setMonth({
        year: month.year,
        index: newMonthIndex
      })
    }
  }

  function onDateClick(day: DayDetails) {
    const { timestamp } = day;
    // update state
    setSelectedDayTs(day.timestamp)
    // set input value
    const dateString = getDateStringFromTimestamp(timestamp);
    if (inputRef.current) {
      inputRef.current.value = dateString;
    }
    // notify parent component
    if(onChange) {
      onChange(timestamp);
    }
  }

  /* view */

  function renderCalendar() {
    const monthDetails = getMonthDetails(month.year, month.index)
    console.log({ monthDetails })
    const days = monthDetails.map((day, index)=> {
      const disabled = day.month !== month.index;
      const dayClassname = classNames('day-container', {
        'disabled': disabled,
        'highlight': isSelectedDay(day) && !disabled,
      })
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
            weekdayNames.map(
              (name, idx) =>
              <div key={idx}>{name.slice(0, 1).toUpperCase()}</div>
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
            <div className='month-display'>{getMonthStr(month.index)} {month.year}</div>
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