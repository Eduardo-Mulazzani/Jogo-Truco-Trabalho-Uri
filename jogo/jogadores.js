module.exports = class Jogadores{
	constructor(){
		this.jogadores = []

		setInterval( () =>{
			for(let jogador in this.jogadores){
				console.log(this.jogadores[jogador])
			}
		}, 5000)
	}
	getJogador(nickName){
		for(let jogador in this.jogadores){
			if(this.jogadores[i].nickName == nickName){
				return this.jogadores[i]
			}
		}
		return false
	}
	//retorna jogadores sem o cliente que esta requisitando
	getOutrosJogadores(nickName){
		let jogTemp = []

		for(let jogador in this.jogadores){
			if(this.jogadores[jogador].nickName != nickName){
				jogTemp.push(this.jogadores[jogador])
			}
		}

		return jogTemp
	}
	existeJogador(nickName){
		for(let i in this.jogadores){
			if(this.jogadores[i].nickName == nickName){
				return true
			}
		}
		return false
	}
	delJogadorNickname(nickName){
		for(let i in this.jogadores){
			if(this.jogadores[i].nickName == nickName){
				this.jogadores.splice(i, 1)
				return true
			}
		}
		return false
	}
	delJogadorSocket(socketId){
		for(let i in this.jogadores){
			if(this.jogadores[i].socketId == socketId){
				this.jogadores.splice(i, 1)
				return true
			}
		}
		return false	
	}
	setJogador(nickName, socketId){
		for(let jogador in this.jogadores){
			if(this.jogadores[jogador].nickName == nickName){
				this.jogadores[jogador].socketId = socketId

				return
			}
		}
		this.jogadores.push({
			nickName: nickName,
			socketId: socketId,
			status: 'online',
			cartas: {
				primeira: null,
				segunda: null,
				terceira: null
			}
		})

		return
	}
}