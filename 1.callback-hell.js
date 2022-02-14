const fs = require("fs");
// SuperAgent is a small HTTP request library that may be used to make AJAX requests in Node.js and browsers.
const superagent = require("superagent");

/* ***** NESTED CALLBACKS (CALLBACK HELL) ***** */
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  // sending HTTP request to get the data
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    // calling the end() function will send the request
    .end((err, res) => {
      if (err) return console.log(err.message);
      // res returns a response object whose body contains the data we want to retrieve
      console.log(res.body);

      // save the image address(res.body.message) to a new file
      fs.writeFile("dog-img1.txt", res.body.message, (err) => {
        console.log("Random dog image saved to file! ");
      });
    });
});
