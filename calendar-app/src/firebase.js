import firebase from 'firebase/app';
import 'firebase/database';
import React, { useState } from 'react';

const firebaseConfig = {
  // Your Firebase project configuration
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function MyComponent() {
  const [data, setData] = useState('');

  function handleInputChange(event) {
    setData(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    database.ref('/data').set(data);
    setData('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter data:
          <input type="text" value={data} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
