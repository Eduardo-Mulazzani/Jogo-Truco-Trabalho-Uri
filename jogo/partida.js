module.exports = {
	jogadores = [],
	init: function(){

	},
	setJogador: function( clientId ){
		if(this.jogadores.indexOf(clientId) <= -1){
			this.jogadores.push(clientId)
		}
	},
	getJogadores: function(){
		return this.jogadores
	}
}