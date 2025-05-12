import express from "express";
import dotnev from "dotenv";
import { readFile, writeFile } from "fs/promises";
import fs from "fs/promises";
import req from "express/lib/request.js";
dotnev.config();

const app = express();

const PORT = process.env.PORT || 3000;

async function readData() {
  const data = await fs.readFile("data.json", "utf-8");
  return JSON.parse(data);
}

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  // console.log(`req.body =  ${req.body}`); // This will log the request body to the console
  console.log(req.query.name);

  res.send(`About Page ${req.query.name}`);
});

// Route to fetch all items
app.get("/items", async (req, res) => {
  const data = await readData();
  res.json(data);
});

app.use((req, res, next) => {
  res.send("Page Not Foundsd");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//node --watch app.js(Very beautiful command to automatically restart the server when you make changes to the code(only need to refresh the page from the browser))
// nodemon app.js (This command is used to automatically restart the server when you make changes to the code)
// npm install nodemon --save-dev (This command is used to install nodemon as a dev dependency)

// Order is important in Routing. (If you put the 404 route before the other routes, it will never be reached because the other routes will match first.)
// Middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
// Middleware functions can perform the following tasks:
// 1. Execute any code.
// 2. Make changes to the request and response objects.
// 3. End the request-response cycle.
// 4. Call the next middleware function in the stack.
// If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. If no middleware function is left, the request will be left hanging
