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
		
		var name = $(document.getElementById('name'));
		var bank = $(document.getElementById('bank'));
		bank.empty();
		name.html(this.players[0].player.name);
		var bankTitle = $(document.createElement('p'));
		bankTitle.html('<center>Bank</center>');
		if(bank.children().length == 0){
			bank.append(bankTitle);
		}
		var avail = $(document.createElement('div'));
		var inPlay = $(document.createElement('div'));
		var total = $(document.createElement('div'));
		var totalBets = 0;
		//if(_CRAPS.betManager.bets){
		for(x in _CRAPS.dealer.betManager.bets){
			totalBets += _CRAPS.dealer.betManager.bets[x].bet.value;
		}
		avail.attr('id', 'availBank');
		avail.html('Available Bank:<br />$' + this.players[0].player.bank);
		inPlay.html('Money In Play:<br />$' + totalBets);
		inPlay.attr('id', 'inPlay');
		total.html('Total Worth:<br />$' + (this.players[0].player.bank + totalBets));
		total.attr('id', 'totBank');
		if(this.players[0].player.bank + totalBets < 10000){
			total.attr('class','losing');
		}else if(this.players[0].player.bank + totalBets == 10000){
			total.attr('class', '');
		}else{
			total.attr('class', 'winning');
		}
		bank.append(avail).append(inPlay).append(total);		
		//bank.append(avail).append(inPlay).append(total);
	}
});
