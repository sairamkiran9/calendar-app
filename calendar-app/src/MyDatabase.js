const fs = require('fs');

const filename = 'data.txt';
const data = 'New data to append to file\n';

fs.access(filename, (err) => {
  if (err) {
    console.error(`File ${filename} does not exist`);
  } else {
    fs.appendFile(filename, data, (err) => {
      if (err) throw err;
      console.log(`Data appended to file ${filename}`);
    });
  }
});
