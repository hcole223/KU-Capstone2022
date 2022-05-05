//Dependencies
var express = require("express");
var path = require("path");
var dbquery = require("./params/params");
var app = express();
app.use(express.static('artifacts'))

//Set the port
app.set("port", process.env.PORT || 8080);

//Set view engine and location
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Initialize routes
app.use("/", require("./routes/web"));

app.listen(app.get("port"),function() {
   console.log("Server started on port " + app.get("port")); 
});