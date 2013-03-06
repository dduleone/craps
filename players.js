var PlayerManager = {};

var Player = function(name, bank){
	this.id = PlayerManager.getNextPlayerId();
	this.name = name;
	this.bank = bank;
	
	function addToBank(amt){
		this.bank += amt;
	}
	
	function subFromBank(amt){
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
	addPlayer: function(player){
		this.players.push(player);
	}
});
