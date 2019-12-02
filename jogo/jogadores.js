module.exports = class Jogadores{
	constructor(){
		this.jogadores = []
		/*
		setInterval( () =>{
			for(let jogador in this.jogadores){
				console.log(this.jogadores[jogador])
			}
		}, 5000)
		*/
	}
	getJogadorNickname(nickName){
		for(let jogador in this.jogadores){
			if(this.jogadores[jogador].nickName == nickName){
				return this.jogadores[jogador]
			}
		}
		return false
	}
	getJogadorSocketId(socketId){
		for(let jogador in this.jogadores){
			if(this.jogadores[jogador].socketId == socketId){
				return this.jogadores[jogador]
			}
		}
		return false
	}
	existeJogador(nickName, socketId){
		for(let i in this.jogadores){
			if(this.jogadores[i].nickName == nickName){
				return true
			}
			if(this.jogadores[i].socketId == socketId){
				return true
			}
		}
		return false
	}
	delJogadorNickname(nickName){
		console.log("jogador deletado!")
		for(let i in this.jogadores){
			if(this.jogadores[i].nickName == nickName){
				this.jogadores.splice(i, 1)
				return true
			}
		}
		return false
	}
	delJogadorSocketId(socketId){
		for(let i in this.jogadores){
			if(this.jogadores[i].socketId == socketId){
				this.jogadores.splice(i, 1)
				return true
			}
		}
		return false
	}
	alterSocketJogador(nickName, socketId){
		for(let i in this.jogadores){
			if(this.jogadores[i].nickName == nickName){
				this.jogadores.socketId = socketId
			}
		}
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
				um: null,
				dois: null,
				tres: null
			}
		})

		return
	}
}
