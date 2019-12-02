module.exports = class duplas{
	constructor(){
		this.duplas = []

		setInterval( () =>{
			for(let i in this.duplas){
				console.log(this.duplas[i])
			}
		}, 3000)
	}
	setDupla(dupla, callback){
		this.duplas.push(dupla)
		for(let i in this.duplas){
			for(let j in this.duplas[i]){
				this.duplas[i][j].jogador.status = "aguardandoConfirmacao"
			}
		}
		callback()
	}
	jogadorOffline(){
		for(let i in this.duplas){
			console.log(this.duplas[i].length)
			if(this.duplas[i].length < 2){
				this.duplas.splice(i, 1)
			}
		}
		console.log(this.duplas)
	}

}