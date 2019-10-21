var socket = io.connect("http://localhost:8080")
//setInterval(() => socket.emit('join', "teste"), 1000)
socket.emit('join', 'eduardo')
socket.on('seila', seila =>{
	console.log(seila)
	document.getElementById("msg").innerHTML = seila
})