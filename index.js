var express = require('express');
var app = express();
var redis = require('redis');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var client = redis.createClient();
var bodyParser = require('body-parser');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var redPubNotification = require('./notification.js');
app.use(bodyParser.json());


var redPubNotificationInstance = new redPubNotification();
app.post('/notification', function(req, res){
	//console.log(req.body);
	
	res.json(redPubNotificationInstance.publishNotifcationRedis(req.body))
});


io.on('connection', function(socket){
	console.log('user conn');

	// socket.on('message', function(msg){
		client.subscribe('notifications');

		//console.log("Inside message " + msg);

		// socket.emit('notification', "its great");

		client.on('message', function(channel, msg){
			console.log("message: " + msg + " Channel: " + channel);
			socket.emit('notify', msg);
		});

		// socket.on('trial', function(){
		// 	console.log("Newr publish");
		// 	client2.publish("notifications", "Hello, there");
		// })
	// });
})

http.listen(3000, function(){
	console.log("listening...");
})
