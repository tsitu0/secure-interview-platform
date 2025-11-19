//Note: Small white arrow to the left of comment 
//allows you to collapse comments

//Importing express library
const express = require('express');
/*
Creates an express "app"
This is the server
Will add all the routes and logic onto here
*/
const app = express();

const interviewRoutes = require('./routes/interviewRoutes');
app.use('/api', interviewRoutes);

/*
app.get() - A GET request is what happens when a page is visted
in the brower

'/' homepage of server

req - request, gives info on what url they visted, what data they
sent, query params, headers. 
Can inspect req when you want to read data from client -> server

res - what we send back to the user

app.get('/route', (req, res) => {
  // what to do when someone visits /route
});

http://localhost:5000/
*/
app.get('/', (req, res) => {
  res.send("Server is running!");
});
/*
http://localhost:5000/hello
*/
app.get('/hello', (req, res) => {
  res.send("Hello from the server!");
});
/*
Json Route
This returns a json, which is how API's talk
React frontend will consome JSON
http://localhost:5000/json
*/
app.get('/json', (req, res) => {
  res.json({
    message: "This is JSON data",
    status: "ok",
    time: Date.now()
  });
});

/*
URL Parameters
Accept dynamic values in url
try
http://localhost:5000/hello/tom
*/
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});
/*
Query Parameter Route
Query parameters appear after a question mark in the url
try
http://localhost:5000/greet?name=Terry
or 
http://localhost:5000/greet
*/
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`Hello, ${name || "stranger"}!`);
});

/*
app.listen() turn the server ON and tell it to listen for
incoming requests

listen(port, callback)

“What door?” → the port
“What to do when open?” → callback function
*/
app.listen(5000, () => {
  console.log("Server started on port 5000");
});


