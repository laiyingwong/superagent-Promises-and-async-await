const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find the file 🥲");
      resolve(data);
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

// async means this is a special asynchronous function. It will keep running in the background while performing the code in it without blocking the rest of the code to run in the event loop
(async () => {
  // use try and catch for error handling (they are JS features that have nothing to do with async/await)
  try {
    // await stops the code from running at this point until the Promise returned by readFilePromise is resolved
    // if the Promise is fulfilled, the value of the await expression is the resolved value of the Promise, and we'll store it into a variable
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    // ↑ these two lines are equivalent to
    //   readFilePromise(`${__dirname}/dog.txt`)
    //     .then(data => console.log(`Breed: ${data}`)})

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    // ↑ this line is equivalent to
    //   .then((res) => { return writePromise('dog-img.txt', res.body.message);})

    await writePromise("dog-img4.txt", res.body.message);
    console.log("Random dog image saved to file! ");
    // ↑ these two lines are equivalent to
    //  .then((res) => {return writePromise('dog-img.txt', res.body.message);})
  } catch (err) {
    console.log(err);
  }
})();
