class partida{
	var pedidoTruco = "";
	var pedidoEnvido = "";
	var pedidoFlor = "";
	constructor(){
		this.socket = io.connect('http://localhost');
		this.timeout = document.getElementById("timeout");
		this.pedido = document.getElementById("pedido").value; //do Select
		this.botaoEnviar = document.getElementById("enviar"); 
		if(pedido == "truco"){
			this.pedidoTruco = pedido;
		}else if(pedido == "envido"){
			this.pedidoEnvido = pedido;
		}
		else if(pedido = "flor"){
			this.pedidoFlor = pedido;
		}
		
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
		this.receivetime();
		this.realizarPedido();
	}
	sendToken(){
		this.socket.emit('online', {
			token: sessionStorage.getItem('trucoGauderio'),
			rota: 'index'
		})
	}
	receivetime(){
		this.socket.on('timeout', timeout => {
			this.timeout.innerHTML = timeout;
		});
	}
	realizarPedido(){ //fazer tratamento para pedido
		this.botaoEnviar.addEventListener('click', () =>{
			if(pedidoTruco != "" && pedidoTruco == "truco"){
				this.socket.emit('truco', "truco");	
			}else if(pedidoEnvido != "" && pedidoEnvido == "envido"){
				this.socket.emit('envido',"envido");
			}else if(pedidoFlor != "" && pedidoFlor ==  "flor"){
				this.socket.emit('flor',"flor");
			}else{
				console.log("Erro! Evento não registrado.");
			}
					
		})
	}
	embaralhar(){
		this.socket.emit('embaralhar', () =>{
			console.log("Embaralhando...");
		})
	}

}
part = new partida()