// Make Connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
	handle = document.getElementById('handle')
	btn = document.getElementById('send')
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

// Emit events

btn.addEventListener('click', function() {
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	});
});

message.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if(key === 13) {
		socket.emit('chat', {
			message: message.value,
			handle: handle.value
		});
    } else {
		socket.emit('typing', handle.value);
	}
});

// Listen for events
socket.on('chat', function(data) {
	feedback.innerHTML = "";
	message.value = "";
	message.focus();
	output.innerHTML += '<p><strong>' + data.handle + ': ' + '</strong>' + data.message + '</p>';
});

socket.on('typing', function(data) {
	feedback.innerHTML = '<p><em>'+ data + ' is typing a message...</em></p>';
});