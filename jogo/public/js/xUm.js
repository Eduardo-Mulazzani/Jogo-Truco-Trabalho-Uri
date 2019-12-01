class xUm{
	constructor(){
		this.socket = io.connect('http://localhost:8080')
		let token = sessionStorage.getItem('trucoGauderio')

		this.jog = document.getElementById('jog')
		this.nickName = document.getElementById('nickName')

		this.sendToken()
		this.eventos()
	}
	eventos(){
		this.socket.on('token', token =>{
			console.log(token)
			sessionStorage.setItem('trucoGauderio', token)
		})
		setInterval(() =>{
			this.sendToken()
		}, 5000)

		this.socket.on('jogadores', jogadores =>{
			let template = ''
			for(let jogador in jogadores){
				template += `<h2 onclick="x.sendPedido('${jogadores[jogador].nickName}')">${jogadores[jogador].nickName}</h2>`
			}
			this.jog.innerHTML = template
		})

		this.socket.on('nickName', nickName =>{
			this.nickName.innerHTML = nickName
		})

		this.socket.on('connected', con =>{
			if(!con){
				window.location.href = "/public/login.html"
			}
		})
	}
	sendPedido(nickNameAdver){
		this.socket.emit('pedidoXum', nickNameAdver)
	}
	sendToken(){
		this.socket.emit('online', {
			token: sessionStorage.getItem('trucoGauderio'),
			rota: 'xUm'
		})
	}
}

x = new xUm()