const index = {
	socket: null,
	xUm: null,
	lobby: null,
	init: function(){
		this.socket = io.connect('http://localhost:8080')
		this.xUm = document.getElementById('xUm')
		this.lobby = document.getElementById('lobby')
		this.nickName = document.getElementById('nickName')

		this.sendToken()

		this.eventos()
	},
	eventos: function(){

		this.socket.on('token', token =>{
			console.log(token)
			sessionStorage.setItem('trucoGauderio', token)
		})

		this.socket.on('nickName', nickName =>{
			this.nickName.innerHTML = nickName
		})

		setInterval(() =>{
			this.sendToken()
		}, 5000)

		this.socket.on('connected', con =>{
			if(!con){
				window.location.href = "/public/login.html"
			}
		})

		this.xUm.addEventListener('click', () =>{
			window.location.href = "/public/xUm.html"
		})
		this.lobby.addEventListener('click', () =>{
			window.location.href = "/public/lobby.html"
		})
	},
	sendToken: function(){
		this.socket.emit('online', {
			token: sessionStorage.getItem('trucoGauderio'),
			rota: 'index'
		})
	},
	message: function( msg ){
		switch(msg.route){
			case 'nickName':
				console.log(msg.nickName)
				break 
		}
	}
}

index.init()