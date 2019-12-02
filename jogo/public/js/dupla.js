class xUm{
	constructor(){
		this.socket = io.connect('http://localhost')
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

		this.socket.on('broadcast', msg =>{
			console.log(msg)
			switch(msg.action){
				case 'jogadores':
					this.jogadoresTemplate(msg.jogadores)
			}
		})

		this.socket.on('nickName', nickName =>{
			this.nickName.innerHTML = nickName
		})

		this.socket.on('connected', con =>{
			if(!con){
				window.location.href = "/public/index.html"
			}
		})
	}
	jogadoresTemplate(jogadores){
		let template = ''

		for(let jogador in jogadores){
			if(jogadores[jogador].nickName != this.nickName.innerHTML){
				template += `<h2 onclick="x.sendPedido('${jogadores[jogador].nickName}')">${jogadores[jogador].nickName}</h2>`
			}
		}
		this.jog.innerHTML = template
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