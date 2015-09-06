var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    _ = require("underscore");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static("bower_components"));

var views = path.join(process.cwd(), "views");


app.get("/", function (req, res){
	res.sendFile(path.join(views, 'index.html'));
});


app.listen(3000, function(){
	console.log("Listening on port 3000.")
});