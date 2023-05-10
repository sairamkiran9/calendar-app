import './MyCalendar.css'
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import localforage from 'localforage';


function MyCalendar() {
  const [selectedDate, setselectedDate] = useState(null);
  const [value, setValue] = useState('');
  const [classList, setClassList] = useState({});

  const handleDateChange = (selectedDate) => {
    setselectedDate(selectedDate);
    setValue('');
  };

  const user = {
    1: "Kiran",
    2: "Rowdy",
    3: "Nikhila",
    4: "Keerthi",
    5: "Keerthana"
  };

  useEffect(() => {
    // Call your function here
    viewDb();
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    const curValue = event.target.value;
    const currDate = selectedDate.toLocaleDateString();
    setValue(curValue);
    writeToDb(currDate, curValue);
    setClassList(prevList => {
      // console.log("setclasslist", prevList, currDate, curValue);
      return { ...prevList, [currDate]: curValue };
    });
  }

  const writeToDb = (k, v) => {
    localforage.setItem(k, v).then(function (value) {
      console.log('record stored');
    }).catch(function (err) {
      console.log(err);
    });
  }

  const clearDbByKey = () => {
    localforage.removeItem(selectedDate.toLocaleDateString()).then(function () {
      console.log('Record is cleared!', selectedDate);
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
      setClassList(prevList => {
        // console.log("setclasslist", prevList, currDate, curValue);
        return { ...prevList, [key]: value };
      });
    }).then(function () {
      console.log('Iteration has completed');
    }).catch(function (err) {
      console.log(err);
    });
  }

  const tileClassName = ({ date, view }) => {
    const curDate = date.toLocaleDateString();
    if (view === 'month' && curDate in classList) {
      console.log("classList", classList);
      return `tile-${user[classList[curDate]]}`;
    }
    return '';
  };

  const buttonStyle = {
    backgroundColor: '#804859',
    color: 'white',
    padding: '10px',
    borderRadius: '50px',
    borderColor: "transparent",
    margin: "5px"
  };

  return (
    <div className='myapp'>
      <h1 className='main-title'>MyCalendar</h1>
      <div className='main-container'>
        <div className='calendar-container'>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
          />
        </div>
        <div>

          <p className='view-container'>{selectedDate ? <span className='date-label'> On {selectedDate.toLocaleDateString()}: </span> : ''} &nbsp;
            {
              selectedDate &&
              <select className='select-container' onChange={handleInputChange}>
                <option value="">Select an option</option>
                <option value="note"> Add Note</option>
                <option value="1">User1</option>
                <option value="2">User2</option>
                <option value="3">User3</option>
                <option value="4">User4</option>
                <option value="5">User5</option>
              </select>
            }
          </p>

          <ul className='label-container'>
            <li className='tile-Kiran label'> user1 </li>
            <li className='tile-Rowdy label'> user2 </li>
            <li className='tile-Nikhila label'> user3 </li>
            <li className='tile-Keerthi label'> user4 </li>
            <li className='tile-Keerthana label'> user5 </li>
          </ul>

          {/* <p>{value ? `Selected: ${user[value]}` : ""}</p>
          <p><button style={buttonStyle} onClick={viewDb}>show records</button>
            <button style={buttonStyle} onClick={clearDbByKey}> Clear record</button>
            <button style={buttonStyle} onClick={(e) => readFromDb(e, selectedDate)}> Read record</button>
            <button style={buttonStyle} onClick={clearDb}> Reset </button>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;