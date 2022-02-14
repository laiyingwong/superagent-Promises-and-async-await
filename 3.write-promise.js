const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  // (resolve, reject) => {} is an executor function that handles the code inside asynchronously (fs.readFile in this case)
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find the file 🥲"); // whatever we pass into the reject funtion is the result of Promise that will be available in the .catch() handler
      resolve(data); // whatever we pass into the resolve funtion is the result of Promise that will be available in the .then() handler
    });
  });
};

const writePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write the file 🥲");
      resolve("success");
    });
  });
};

/* ***** FLAT STRUCTURE OF CHAIN PROMISES ***** */
readFilePromise(`${__dirname}/dog.txt`)
  // ↓ the data in the then() handler is the resolved value from the Promise returned by readFilePromise()
  // .then() returns a new Promise so that we can chain another .then(). Chaining avoids callback hell
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  // ↓ the resolved argument is the resolved value of the Promise returned from the previous handler ↑
  .then((res) => {
    // since we want to keep chaining the .then() we'll return another Promise ↓
    return writePromise("dog-img3.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file! ");
  })
  .catch((err) => {
    // calls the reject() function in readFilePromise() so that it will mark readFilePromise(`${__dirname}/dog.txt`) as rejected
    console.log(err);
    // if the file cannot be found, the error messgae would be 'Could not write the file 🥲'
    // if the data in the file is invalid for fetching API, console.log(err.message) instead to print out the error message "Not Found"
  });
