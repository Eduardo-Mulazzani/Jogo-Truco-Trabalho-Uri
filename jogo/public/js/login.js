const login = {
	socket: null,
	nickName: null,
	button: null,
	verify: null,
	init: function(){
		this.socket = io.connect('http://localhost:8080')
		this.nickName = document.getElementById('nick')
		this.button = document.getElementById('jogar')
		this.verify = document.getElementById('verifica-jogador')
	
		this.eventos()
	},
	eventos: function(){
		this.socket.on('token', token =>{
			if(!token){
				this.verify.innerHTML = "Usuário não disponível!"
			}else{
				sessionStorage.setItem('trucoGauderio', token)
				window.location.href = "/public/index.html"
			}
		})

		this.socket.on('inexisteJogador', existe =>{
			if(existe){
				this.verify.innerHTML = "Usuário não disponível!"
			}else{
				this.verify.innerHTML = "Usuário Disponível!"
			}
			console.log(existe)
		})

		this.nickName.addEventListener("keyup", (event) =>{
  			if (event.keyCode === 13) {
  				this.logar()
  			}else{
  				if(this.nickName.value != ''){
  					this.socket.emit('existeJogador', this.nickName.value)
  				}
  			}
		})
		this.button.addEventListener('click', () =>{
			console.log(this.nickName.value)
		})
	},
	logar: function(){
		if(this.nickName.value != ''){
			this.socket.emit('login', this.nickName.value)
		}
	}
}

login.init()