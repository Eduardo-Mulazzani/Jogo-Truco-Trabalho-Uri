module.exports = class Login{
	//inicializa objetos e variaveis
	constructor(jogadores){
		this.token = {
			jwt: null,
			secretKey: null
		}
		this.jogadores = jogadores

		this.token.jwt = require('jsonwebtoken')
		this.token.secretKey = "retruco"
	}
	//realiza login pelo nickName
	login(nickName, socket){
		if(this.jogadores.existeJogador(nickName)){
			return socket.emit('inexisteJogador', true)
		}
		return socket.emit('token', this.tokenCreate(nickName))
	}
	//verifica se usuario ja fez o login
	online(token, socket){
		if(token.hasOwnProperty('token')){
			if(token.hasOwnProperty('rota')){
				this.tokenVerify(token.token, decoded =>{
					if(!decoded){
						socket.emit('connected', false)
					}else{
						this.jogadores.setJogador(decoded.nickName, socket.id)
						socket.emit('token', this.tokenCreate(decoded.nickName))
						socket.emit('nickName', decoded.nickName)
						socket.emit('connected', true)

						this.rotas(decoded.nickName, token.rota, socket)
					}
				})
			}else{
				socket.emit('connected', false)
			}
		}else{
			socket.emit('connected', false)
		}
	}
	rotas(nickName, rota, socket){
		switch (rota) {
			case 'xUm':
				socket.emit('jogadores', this.jogadores.getOutrosJogadores(nickName))
				break;
		}
	}
	//verifica se nickname nao existe
	nickNameVerify(nickName, socket){
		if(this.jogadores.existeJogador(nickName)){
			return socket.emit('inexisteJogador', true)
		}
		return socket.emit('inexisteJogador', false)
	}
	//cria jsonwebtoken
	tokenCreate(nickName){
		return this.token.jwt.sign({nickName: nickName}, this.token.secretKey, { 
			expiresIn: '15000'
		})
	}
	//verifica jsonwebtoken
	tokenVerify(token, callback){
    	this.token.jwt.verify(token, this.token.secretKey, (err, decoded) =>{
        	!err ? callback(decoded) : callback(false)
    	})
	}
}