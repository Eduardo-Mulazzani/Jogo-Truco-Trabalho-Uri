class escolhas{
	constructor(){
		this.socket = io.connect('http://localhost')
		this.xUm = document.getElementById('xUm')
		this.lobby = document.getElementById('lobby')
		this.nickName = document.getElementById('nickName')

		this.sendToken()

		this.eventos()
	}
	eventos(){
		//controle de usuario
		setInterval(() =>{
			this.sendToken()
		}, 5000)
		this.socket.on('token', token =>{
			console.log(token)
			sessionStorage.setItem('trucoGauderio', token)
		})

		this.socket.on('nickName', nickName =>{
			this.nickName.innerHTML = nickName
		})

		this.socket.on('connected', con =>{
			if(!con){
				window.location.href = "/public/index.html"
			}
		})

		this.xUm.addEventListener('click', () =>{
			window.location.href = "/public/dupla.html"
		})
		this.lobby.addEventListener('click', () =>{
			window.location.href = "/public/lobby.html"
		})
	}
	sendToken(){
		this.socket.emit('online', {
			token: sessionStorage.getItem('trucoGauderio'),
			rota: 'index'
		})
	}
}

e = new escolhas()