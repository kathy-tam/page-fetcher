const request = require('request');
const fs = require('fs');
const readline = require('readline');

// parse command line arguments
let args = process.argv.slice(2);
const url = args[0];
const localPath = args[1];

request(url, (error, response, body) => {
  //URL errors
  if(error) {
    console.log(`URL is invalid. Error code: ${error.code}`);
    return
  }
  if(response.statusCode !== 200) {
    console.log(`URL is invalid. Status code: ${response.statusCode}`);
    return
  }
  //File path error

  //Ask user if they want to overwrite existing file
  if(fs.existsSync(localPath)) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`File already exists at ${localPath}. Do you want to overwrite it? (Y/N) `, (answer) => {
      if(answer === 'Y') {
        fs.writeFile(localPath, body, err => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
          console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
        });
      } else {
        //skip and exit the app
      }
      rl.close();
    });
  } else {
    fs.writeFile(localPath, body, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
      console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
    });
  }

});