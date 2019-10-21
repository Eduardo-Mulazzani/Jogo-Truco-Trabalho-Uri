module.exports = {
	init: function( socket ){
	jogadores.push({'cliente': client.id})
	console.log(jogadores)
	console.log(`Cliente Connectado: ${client.id}`)
	//setInterval(() => client.emit('seila', "Comunicação Bidirecional"), 1000)
	client.on('join', name =>{
		console.log(`name: ${name}, clientId: ${client.id}`)
	})
	client.on('send', msg =>{
		console.log(msg)
	})
	client.on('disconnect', () =>{
		jogadores.indexOf({'cliente': client.id})
		console.log(`[SOCKET] Cliente Desconnectado: ${client.id}`)
	})
	client.on('error', error => console.error(error) )
	}
}