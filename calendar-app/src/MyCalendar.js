import './MyCalendar.css'
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import localforage from 'localforage';


function MyCalendar() {
  const [date, setDate] = useState(null);
  const [value, setValue] = useState('');

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

  useEffect(() => {
    // console.log(`Selected date is ${date}`);
  }, [date]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    writeToDb(date.toString(), event.target.value);
    readFromDb(date.toString());
    viewDb();
  }

  const writeToDb = (k, v) => {
    localforage.setItem(k, v).then(function (value) {
      console.log('record stored');
    }).catch(function (err) {
      console.log(err);
    });
  }

  const clearDbByKey = () => {
    readFromDb(date.toString());
    localforage.removeItem(date.toString()).then(function () {
      console.log('Record is cleared!',date);
    }).catch(function (err) {
      console.log(err);
    });
  }

  const clearDb = () => {
    localforage.clear().then(function () {
      console.log('Database is now empty.');
    }).catch(function (err) {
      console.log(err);
    });
  }

  const readFromDb = (key) => {
    localforage.getItem(key).then(function (value) {
      console.log(key, value);
    }).catch(function (err) {
      console.log(err);
    });
  }

  const sizeOfDb = () => {
    localforage.length().then(function (numberOfKeys) {
      console.log('Current size of Db:', numberOfKeys);
    }).catch(function (err) {
      console.log(err);
    });
  }

  const viewDb = () => {
    localforage.iterate(function (value, key, iterationNumber) {
      console.log([key, value]);
    }).then(function () {
      console.log('Iteration has completed');
    }).catch(function (err) {
      console.log(err);
    });
  }

  return (
    <div className='app'>
      <h1 className='text-center'>MyCalendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={handleDateChange} value={date} />
      </div>

      <p>{date ? `On ${date.toString()}: ` : 'no date selected'} &nbsp;
        {
          date &&
          <select onChange={handleInputChange}>
            <option value="">Select an option</option>
            <option value="note"> Add Note</option>
            <option value="1">User1</option>
            <option value="2">User2</option>
            <option value="3">User3</option>
            <option value="4">User4</option>
          </select>
        }
      </p>
      <p>{value ? `Selected: ${user[value]}` : ""}</p>
      <p><button onClick={viewDb}>show data</button></p>
      <p><button onClick={clearDb}> Reset </button></p>
      <p><button onClick={clearDbByKey}> Clear record</button></p>
    </div>
  );
}

export default MyCalendar;