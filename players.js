var PlayerManager = {};

var Player = function(name, bank){
	var player = this;
	player.id = PlayerManager.getNextPlayerId();
	player.name = name;
	player.bank = bank;
	
	player.addToBank = function(amt){
		this.bank += amt;
	}
	
	player.subFromBank = function(amt){
		this.bank -= amt;
	}
}

$.extend(PlayerManager, {
	players: [],
	playerId: 0,
	getNextPlayerId: function(){
		return this.playerId++;
	},
	getPlayerName: function(id){
		return this.players[id].name;
	},
	addPlayer: function(player){
		this.players.push(player);
	}
});
