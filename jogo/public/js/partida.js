class partida{

	constructor(){
		this.socket = io.connect('http://localhost');
		this.timout = document.getElementById("timout");
		this.botaotruco = document.getElementById("botaoTruco");
		this.botaoenvido = document.getElementById("botaoEnvido");
		this.botaoflor = document.getElementById("botaoFlor");
		this.eventos();
	}
	eventos(){
		setInterval(() =>{
			this.sendToken()
		}, 5000)
		this.socket.on('token', token =>{
			console.log(token)
			sessionStorage.setItem('trucoGauderio', token)
		})
		this.PedirTruco();
		this.PedirEnvido();
		this.PedirFlor();
	}
	sendToken(){
		this.socket.emit('online', {
			token: sessionStorage.getItem('trucoGauderio'),
			rota: 'index'
		})
	}
	Receivetime(){
		this.socket.on('timout', timout => {
			this.timeout.innerHTML = timeout;
		});
	}
	PedirTruco(){ //fazer tratamento para pedido
		this.botaotruco.addEventListener('click', () =>{
			this.socket.emit('truco', "truco");		
		})
	}
	PedirEnvido(){ //fazer tratamento para pedido
		this.botaoenvido.addEventListener('click', () =>{
			this.socket.emit('envido', "envido");		
		})
	}
	PedirFlor(){ //fazer tratamento para pedido
		this.botaoflor.addEventListener('click', () =>{
			this.socket.emit('flor', "flor");		
		})
	}

}
part = new partida()