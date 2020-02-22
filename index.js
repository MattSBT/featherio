var http = require("http");
const express = require("express");

const app = express();

require("./routes/routes")(app);

const PORT = 23456;

app.listen(PORT);
console.log("App Listening on " + PORT);
