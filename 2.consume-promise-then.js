const fs = require("fs");
const superagent = require("superagent");

// ***** CONSUME PROMISE with THEN  *****
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  // sending HTTP request to get the data
  // the get method will automatically return a Promise as soon as we start the request. The Promise doesn't have any data yet because the server is still getting the data asychronously in the background, but the Promise is immediately available and is promising us that it will get some data back in the future (pending Promise)
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      // the callback function of then() method will be called as soon as the Promise is done doing its work and comes back with the data (resolved Promise), and the data is then available as an argument to the callback
      // resolved Promise can either be fulfilled or rejected (when there is an error)
      console.log(res.body);
      fs.writeFile("dog-img2.txt", res.body.message, (err) => {
        console.log("Random dog image saved to file! ");
      });
    })
    // for rejected Promise, print out the error message
    .catch((err) => {
      console.log(err.message);
    });
});
