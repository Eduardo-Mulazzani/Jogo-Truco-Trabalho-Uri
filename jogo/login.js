module.exports = class Login{
	//inicializa objetos e variaveis
	constructor(jogadores){
		this.token = require('./tokenSystem')
		this.token = new this.token()

		this.jogadores = jogadores
	}
	//realiza login pelo nickName
	login(nickName, socket){
		if(this.jogadores.existeJogador(nickName, false)){
			return socket.emit('inexisteJogador', true)
		}
		this.jogadores.setJogador(nickName, socket.id)
		this.timeoutJogador(nickName)
		return socket.emit('token', this.token.tokenCreate(nickName))
	}
	jogadorOnline(client, token){
		if(token.hasOwnProperty('token')){
			this.token.tokenVerify(token.token, decoded =>{
				if(!decoded){
					client.emit('connected', false)
				}else{
					//reiniciarTimeout jogador
					this.timeoutJogador(decoded.nickName)

					if(!this.jogadores.existeJogador(decoded.nickName)){
						this.jogadores.setJogador(decoded.nickName, client.id)
					}

					//socket alterado precisa ser trocado
					this.jogadores.alterSocketJogador(decoded.nickName, client.id)
					//cria novo token e devolve ao jogador
					client.emit('token', this.token.tokenCreate(decoded.nickName))
					client.emit('nickName', decoded.nickName)
					client.emit('connected', true)
				}
			})
		}else{ client.emit('connected', false) }	
	}
	timeoutJogador(nickName){
		console.log(nickName)
		clearTimeout(this.timeOut)
		this.timeOut = setTimeout(() =>{
			this.jogadores.delJogadorNickname(nickName)
			console.log(`Jogador ${nickName} deletado`)
		}, 15000)
	}
	//verifica se nickname nao existe
	nickNameVerify(nickName, socket){
		if(this.jogadores.existeJogador(nickName, false)){
			return socket.emit('inexisteJogador', true)
		}
		return socket.emit('inexisteJogador', false)
	}
}
