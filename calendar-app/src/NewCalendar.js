import React, { useState } from 'react';

function MyComponent() {
  const [myDict, setMyDict] = useState({});

  const handleClick = () => {
    setMyDict(prevDict => {
      return { ...prevDict, [new Date().toString()]: 'new value' };
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Add key-value pair</button>
      <p>My dictionary:</p>
      <ul>
        {Object.entries(myDict).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;
