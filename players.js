var PlayerManager = {};

var Player = function(name, bank){
	this.id = PlayerManager.getNextPlayerId();
	this.name = name;
	this.bank = bank;
	
	var addToBank = function(amt){
		this.bank += amt;
	}
	
	var subFromBank = function(amt){
		this.bank -= amt;
	}
};

$.extend(PlayerManager, {
	players: [],
	playerId: 0,
	getNextPlayerId: function(){
		return this.playerId++;
	},
	getPlayerName: function(id){
		return this.players[id].name;
	},
	makePlayer: function(name, bank){
		this.players.push(new Player(name, bank));
	}
});
