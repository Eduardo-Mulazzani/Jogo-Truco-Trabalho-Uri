class partida{

	constructor(){
		this.socket = io.connect('http://localhost');
		this.timout = document.getElementById("timout");
		this.pedido = document.getElementById("pedido").value; //do Select
		if(pedido == "truco"){
			this.pedidoTruco = pedido;
		}else if(pedido == "envido"){
			this.pedidoEnvido = pedido;
		}
		else if(pedido = "flor"){
			this.pedidoFlor = pedido;
		}
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
	receivetime(){
		this.socket.on('timout', timout => {
			this.timeout.innerHTML = timeout;
		});
	}
	pedirTruco(){ //fazer tratamento para pedido
		this.botaotruco.addEventListener('click', () =>{
			this.socket.emit('truco', "truco");		
		})
	}
	pedirEnvido(){ //fazer tratamento para pedido
		this.botaoenvido.addEventListener('click', () =>{
			this.socket.emit('envido', "envido");		
		})
	}
	pedirFlor(){ //fazer tratamento para pedido
		this.botaoflor.addEventListener('click', () =>{
			this.socket.emit('flor', "flor");		
		})
	}
	embaralhar(){
		this.socket.emit('embaralhar', () =>{
			console.log("Embaralhando...");
		})
	}

}
part = new partida()