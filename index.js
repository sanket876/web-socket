var express = require('express');
var socket  = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function() {
	console.log('listening request to port 4000');
});

// Static file
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection', function(socket) {
	console.log('made socket connection');

	socket.on('chat', function(data) {
		// send message to eveybody who is connected to server including sender
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data) {
		// broadcast message to everybody who is connected to server except sender i.e. myself
		socket.broadcast.emit('typing', data);
	});
});