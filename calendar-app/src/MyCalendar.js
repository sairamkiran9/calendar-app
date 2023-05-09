import './MyCalendar.css'
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import localforage from 'localforage';


function MyCalendar() {
  const [date, setDate] = useState(null);
  const [value, setValue] = useState('');
  const [classname, setClassName] = useState('kon');

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
    writeToDb(date.toLocaleDateString(), event.target.value);
    // readFromDb(date.toLocaleDateString());
    // viewDb();
  }

  const writeToDb = (k, v) => {
    localforage.setItem(k, v).then(function (value) {
      console.log('record stored');
    }).catch(function (err) {
      console.log(err);
    });
  }

  const clearDbByKey = () => {
    // readFromDb(date);
    localforage.removeItem(date.toLocaleDateString()).then(function () {
      console.log('Record is cleared!', date);
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

  const readFromDb = (e, key) => {
    e.preventDefault();
    console.log("readFromDb", key);
    if (key !== null) {
      key = key.toLocaleDateString();
      localforage.getItem(key).then(function (value) {
        console.log("readFromDb", key, value);
      }).catch(function (err) {
        console.log(err);
      });
    }
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

  const getKey = async (key) => {
    if (key !== null) {
      key = key.toLocaleDateString();
      localforage.getItem(key).then(function (value) {
        if (value !== null && date !== null && key === date.toLocaleDateString()) {
          console.log("getKey", key, value, user[value]);
          setClassName(user[value]);
          return user[value];
        }
        else {
          console.log("in else");
          setClassName("");
          return "";
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && date !== null) {
      const key = getKey(date);
      // const key = "konda";
      return `tile-${key}`;
    }
    return null;
  };

  return (
    <div className='app'>
      <h1 className='text-center'>MyCalendar</h1>
      <div className='calendar-container'>
        <Calendar
          onChange={handleDateChange}
          value={date}
          // tileContent={({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>konda</p> : null}
          tileClassName={tileClassName}
        />
      </div>

      <p>{date ? `On ${date.toLocaleDateString()}: ` : 'no date selected'} &nbsp;
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
      <p><button onClick={(e) => readFromDb(e, date)}> Read record</button></p>
    </div>
  );
}

export default MyCalendar;