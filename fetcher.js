const request = require('request');
const fs = require('fs');

let args = process.argv.slice(2);
const url = args[0];
const localPath = args[1];

request(url, (error, response, body) => {
  fs.writeFile(localPath, body, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
    console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
  });
});