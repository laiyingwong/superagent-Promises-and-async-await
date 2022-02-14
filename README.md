# superagent, Promises, and async/await

This project contains five files demonstrating different ways to retrieve data from Dog API. When one of the files is run, it will fetch the data of a random dog image based on the breed specified in dog.txt, and save the image address to a new file.

File #1 uses `superagent` and several nested callbacks to request API. 

File #2 achieves the same goal by consuming the Promise returned by `superagent`'s `get` method with the `.then()` handler.

File #3 implements a flat Promise chain to avoid any callback function.

File #4 incorporates `async` and `await` to consume Promises.

File #5 demonstrates how to run multiple Promises in a program.



## 🎉 Demo 

![app demo](Assets/dog-api.gif)


## ✨ What I Have Learned

In Node application, we can install `superagent` library to handle AJAX calls. Instead of nesting callback functions that might result in *"callback hell"*, it's a better practice to consume the Promise returned by the `get` method. The Promise can be resolved with the `.then()` handler, and `.catch()` is used to handle errors. 

An alternative way of consuming Promises is using `async/await`. `async` declares an asynchronous function and `await` pauses the code execution until a Prmoise returns its resolved value. It's common to use **IIFE** (Immediately Invoked Function Expression) when implementing `async/await` because it runs as soon as it's defined. `async/await` makes code even more readable. For error handling, `async` function uses `try` and `catch`.

## 💻 Setup

1️⃣ Run the command below to install packages used in the project:
```sh

$ npm install

```

2️⃣ Run `node [filename]` or `nodemon [filename]` in the terminal to run the program.

## 👏 Credits

This project is based on the Node.js tutorial of <a href="https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/">Node.js, Express, MongoDB & More</a> by Jonas Schmedtmann.
