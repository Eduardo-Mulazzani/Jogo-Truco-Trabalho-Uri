let express = require("express")
let app = express()
const http = require('http').createServer(app)
const io = require('socket.io').listen(http)

var path = require('path')

app.get('/', (req, resp, next) =>{
	resp.redirect('/public/index.html')
	next()
})

app.use('/public',express.static('public'))

let jogadores = []

io.on('connection', client =>{
	let jogador = {
		NickName: null,
		clientId: null
	}
	let cont = 0
	setInterval(() => client.emit('seila', cont++), 500)
	client.on('join', name =>{
		jogador.NickName = name
		jogador.clientId = client.id

		jogadores.push(jogador)
		console.log(`[SOCKET] Cliente Connectado: ${client.id}`)
	})
	client.on('disconnect', () =>{
		if(jogadores.indexOf(jogador) >= -1){
			jogadores.splice(jogadores.indexOf(jogador), 1)
		}
		console.log(`[SOCKET] Cliente Desconnectado: ${client.id}`)
	})
	client.on('error', error => console.error(error) )
})

setInterval(() => console.log(jogadores), 2000)

http.listen(8080, () =>{
	console.log("Ok")
})