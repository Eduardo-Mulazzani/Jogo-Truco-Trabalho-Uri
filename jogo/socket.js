module.exports = {
	client: null,
	jogador: {
		NickName: null,
		clientId: null
	},
	init: function( client ){
		this.client = client
	},
	eventos: function(){
		//let cont = 0
		//setInterval(() => client.emit('seila', cont++), 500)
		this.client.on('join', name =>{
			this.jogadorConnectado( name )
		})
		this.client.on('disconnect', () =>{
			if(this.jogador.indexOf(jogador) >= -1){
				this.jogador.splice(this.jogador.indexOf(jogador), 1)
			}
			console.log(`[SOCKET] Cliente Desconnectado: ${this.client.id}`)
		})
		client.on('error', error => console.error(error) )
	},
	jogadorConnectado: function( name ){
			let jogador = {
				NickName: null,
				clientId: null
			}

			jogador.NickName = name
			jogador.clientId = this.client.id

			this.jogador.push(jogador)
			console.log(`[SOCKET] Cliente Connectado: ${this.client.id}`)
	}
}