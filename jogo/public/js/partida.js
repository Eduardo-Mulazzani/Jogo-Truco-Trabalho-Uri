class partida{
	constructor(){
		this.socket = io.connect('http://localhost')
	}
	eventos(){
		setInterval(() =>{
			this.sendToken()
		}, 5000)
		this.socket.on('token', token =>{
			console.log(token)
			sessionStorage.setItem('trucoGauderio', token)
		})
	}
	sendToken(){
		this.socket.emit('online', {
			token: sessionStorage.getItem('trucoGauderio'),
			rota: 'index'
		})
	}
}

p = new partida()