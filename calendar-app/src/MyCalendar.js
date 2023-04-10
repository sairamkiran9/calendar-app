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

  const user = {
    1: "Kiran",
    2: "Rowdy",
    3: "Nikhila",
    4: "Keerthi"
  };
  

  const handleInputChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div className='app'>
      <h1 className='text-center'>MyCalendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={handleDateChange} value={date} />
      </div>

      <p>{date ? `On ${date.toDateString()}: ` : 'no date selected'} &nbsp;
        {
          date &&
          <select onChange={handleInputChange}>
            <option value="">Select an option</option>
            <option value="note"> Add Note</option>
            <option value="1">Kiran</option>
            <option value="2">Rowdy</option>
            <option value="3">Nikhila</option>
            <option value="4">Keerthi</option>
          </select>
        }
      </p>
      <p>{value ? `Selected: ${user[value]}` : ""}</p>
    </div>
  );
}
/////////////////////////////////////////////////////////////////////////////////
export default MyCalendar;