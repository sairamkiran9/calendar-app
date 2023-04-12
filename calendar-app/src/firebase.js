// import React, { useState } from 'react';

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set, child, push, update, onValue } from "firebase/database";

// function MyFirebase() {
//   const [data, setData] = useState('');

//   const firebaseConfig = {
//     apiKey: "AIzaSyB6tN6nJ4olT-J4r3kqr0UNwe_jzRaiC4k",
//     authDomain: "fir-b1633.firebaseapp.com",
//     databaseURL: "https://fir-b1633-default-rtdb.firebaseio.com",
//     projectId: "fir-b1633",
//     storageBucket: "fir-b1633.appspot.com",
//     messagingSenderId: "708982765029",
//     appId: "1:708982765029:web:61ca4b2847ee2447522b0c",
//     measurementId: "G-4F9HFLTDCH"
//   };

//   const app = initializeApp(firebaseConfig);

//   function writeUserData(name) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + 1), {
//       username: name
//     }).then(() => {
//       console.log("Data Saved Successfully")
//     }).catch((error) => {
//       console.log("Write failed")
//     });
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     writeUserData(data);
//   }

//   function handleInputChange(event) {
//     setData(event.target.value);
//   }

//   // function readUserData() {
//     const db = getDatabase();
//     const starCountRef = ref(db, 'users/' + 1);
//     onValue(starCountRef, (snapshot) => {
//       const data = snapshot.val();
//       console.log(`Data update by read ${data}`)
//     });
//   // }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Enter data:
//           <input type="text" value={data} onChange={handleInputChange} />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default MyFirebase;
