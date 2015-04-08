var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var qs = require("querystring");

var messageLog = [];

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	response.render("index");
});


app.get('/result', function(request, response){
	console.log("Were in result-get",info);
	response.render("result", info);
})


var server = app.listen(8000, function(){
	console.log("**********************");
	console.log("Listening on PORT 8000");
	console.log("**********************");
});
var io = require('socket.io').listen(server)

io.sockets.on('connection', function(socket){
	console.log(socket.id);

	socket.on("user_connected", function(data){
		var info = data;
		if(info === null)
		{
			return false;
		}
		console.log("5555" + info);
		socket.emit("past_messages", messageLog);
		io.emit("user_arrived", info);
	})

	socket.on("user_message", function(data){
		var message = data;
		console.log("user_message in server: " + message.name);
		messageLog.push(message);
		console.log(message.name);
		console.log(messageLog);
		io.emit("message_received", message);
	})
});
