module.exports = class Sala{
	constructor(nomeSala, idSala, jogador){
		this.nomeSala = nomeSala
		this.idSala = idSala
		this.jogadores = [jogador]
	}
	getNomeSala(){
		return this.nomeSala
	}
}