var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    _ = require("underscore"),
    views = path.join(process.cwd(), "views/");


app.get("/", function (req, res){
	res.sendFile(path.join(views + 'index.html'));
});


app.listen(3000, function(){
	console.log("Listening on port 3000.")
});