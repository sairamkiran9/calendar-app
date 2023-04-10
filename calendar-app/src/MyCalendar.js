import './MyCalendar.css'
import { useState } from 'react';
import Calendar from 'react-calendar';


function MyCalendar() {
  const [date, setDate] = useState(null);
  const [value, setValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleDateChange = (date) => {
    setDate(date);
    setValue('');
  };

  // const handleSelect = (event) => {
  //   setShowInput(event.target.value !== '');
  // };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div className='app'>
      <h1 className='text-center'>Calendar notes</h1>
      <div className='calendar-container'>
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      
      {/* <select onChange={handleSelect}>
        <div className='calendar-container'>
          <Calendar onChange={handleDateChange} value={date} />
        </div>
      </select> */}
      <p>Selected date: {date ? date.toDateString() : 'no date selected'}</p>
      {date && <input type="text" value={value} onChange={handleInputChange} />}
      <p>{value ? `Input value: ${value}` : ""}</p>
    </div>
  );
}
/////////////////////////////////////////////////////////////////////////////////
export default MyCalendar;