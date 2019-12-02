class partida {
	var pedidoTruco = "";
	var pedidoEnvido = "";
	var pedidoFlor = "";
	var cartas = [];
	constructor(){
		this.socket = io.connect('http://localhost');
		this.timeout = document.getElementById("timeout");

		this.labelEmbaralha = document.getElementById("labelEmbaralhar");
		
		this.botaoEnviar = document.getElementById("enviar"); 
		
		
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
			this.pedido = document.getElementById("pedido").value; //do Select
			if(pedido == "truco"){
				this.socket.emit('truco', "truco");	
			}else if(pedido == "envido"){
				this.socket.emit('envido',"envido");
			}
			else if(pedido = "flor"){
				this.socket.emit('flor',"flor");
			}else{
				console.log("Erro! Evento não registrado.");
			}
					
		})
	}
	recebePedido(){
		this.socket.on('truco', () =>{
			window.alert("Truco.");
		})
		this.socket.on('envido' () =>{
			window.alert("envido");
		})
		this.socket.on('flor' () =>{
			window.alert("flor");
		})

	}
	embaralhar(){
		this.socket.emit('embaralhar', confirma =>{
			console.log("Embaralhando...");
			if(confirma){
				labelEmbaralha.innerHTML = "Pronto";
				console.log("Pronto");
			}
		})
	}
	recebeCartasEmbaralhadas(){
		this.socket.on('embaralhado', cartas =>{
			this.cartas = cartas;
		})
	}
	/*enviarCarta(){

	}*/

}
part = new partida()
