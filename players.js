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
	},
	updatePlayerArea: function(){
		
		var name = document.getElementById('name');
		var bank = document.getElementById('bank');
		while(name.childNodes.length > 0){
			name.removeChild(name.childNodes[0]);
		}
		while(bank.childNodes.length > 0){
			bank.removeChild(bank.childNodes[0]);
		}
		var nameText = document.createTextNode('Player: ' + this.players[0].player.name);
		var bankText = document.createTextNode('Bank: $' + this.players[0].player.bank);
		name.appendChild(nameText);
		bank.appendChild(bankText);
	}
});
