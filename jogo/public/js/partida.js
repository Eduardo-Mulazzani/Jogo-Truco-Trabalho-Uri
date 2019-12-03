class partida {
	constructor(){
		this.pedidoTruco = "";
	    this.pedidoEnvido = "";
	    this.pedidoFlor = "";
	    this.cartas = {};/*
	    {
	    jogaUm: {
			cartas: {
				cartaUm: '',
				cartaDois: '',
				cartaTres: ''
			}
		},
		jogaDois: {
			cartas: {
				cartaUm: '',
				cartaDois: '',
				cartaTres: ''
			}
		}
	};*/
		this.socket = io.connect('http://localhost');
		this.timeout = document.getElementById("timeout");

		this.labelEmbaralha = document.getElementById("labelEmbaralhar");
		
		this.botaoEnviar = document.getElementById("enviar"); 
		this.botaoEmbaralhar = document.getElementById("embaralhar");
	
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

		//this.receivetime();
		//this.realizarPedido();
		this.recebeCartasEmbaralhadas();
		this.embaralhar()
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
			}else if(pedido = "flor"){
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
		this.socket.on('envido', () =>{
			window.alert("envido");
		})
		this.socket.on('flor', () =>{
			window.alert("flor");
		})

	}
	embaralhar(){
		this.botaoEmbaralhar.addEventListener('click', () =>{
			console.log("embaralhando")
			this.socket.emit('embaralhar', "embaralha");
			this.socket.on('embaralhado', confirma => {
				if(confirma){ //boolean
					labelEmbaralha.innerHTML = "Pronto";
					console.log("Pronto");
				}
			});
		})
	}
	recebeCartasEmbaralhadas(){
		this.socket.on('recebeCartas', cartas =>{
			this.cartas = cartas;
			console.log(cartas.jogaUm.cartas.cartaUm);
			console.log(cartas.jogaUm.cartas.cartaDois);
			console.log(cartas.jogaUm.cartas.cartaTres+"\n");

			console.log(cartas.jogaDois.cartas.cartaUm);
			console.log(cartas.jogaDois.cartas.cartaDois);
			console.log(cartas.jogaDois.cartas.cartaTres);
		})
	}

	enviarCarta(){

	}

}
part = new partida()
