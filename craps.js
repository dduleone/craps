/*
craps.js
*/

var Player = function(name, bank){
	this.id = _CRAPS.getNextPlayerId();
	this.name = name;
	this.bank = bank;
};


var GameState = {
	pointOn: false,
	point: 0,
	players: []
};



var _CRAPS = {
	debug: function(msg){
		console.log(msg);
	},
	output: function(msg){
		var buffer = document.getElementById("buffer");
		$(buffer).append("<span>" + msg + "</span><br />\n");
		buffer.scrollTop = buffer.scrollHeight;
	},
	offBets: [],
	playerId: 0,
	players: [],
	getNextPlayerId: function(){
		return this.playerId++;
	},
	getPlayerName: function(id){
		return this.players[id].name;
	},
	placeBet: function(bet){
		BetManager.placeBet(bet);
	},
	checkBets: function(){
		BetManager.checkBets(_CRAPS.dice);
	},
	// I kinda like the idea of having a 'global' set of dice variable, and thus a global 'dice' variable:
	dice: null,
	point: false,
	pointOn: function(dice){
		if (dice.validate() && !dice.isCraps() && !dice.isComeOutWinner()){
			GameState.point = dice.getSum();
			_CRAPS.output("Setting point: " + dice.getSum());
		}
	},
	pointOff: function(){
		_CRAPS.output("Killing point: " + this.point);
		GameState.point = false;
	},
	roll: function(){
	// Roll the dice.
		_CRAPS.output("Before Roll - The point is: " + GameState.point);	
		var roll = _CRAPS.dice.roll();
		_CRAPS.output("The roll is: " + roll);
		_CRAPS.checkBets();
	// Set & unset the point, as appropriate.
		if (GameState.point > 0){
			if (roll == 7){
				GameState.point = false;
				_CRAPS.output("Seven Out! All bets will be resolved!");
				// Resolve Bets.
				return;
			}

			if (roll == GameState.point){
				GameState.point = false;
				_CRAPS.output("Shooter made the point!");
				_CRAPS.output("All Pass Line bets win!");
				_CRAPS.output("All bets will be resolved!");
				// Resolve Bets
				return;
			}
		} else {
			if(_CRAPS.dice.isCraps()){
				_CRAPS.output("Craps!");
				_CRAPS.output("All Pass Line bets lose!");
				return;
			}

			if(_CRAPS.dice.isComeOutWinner()){
				_CRAPS.output("Come out win!");
				_CRAPS.output("All Pass Line bets pay 1:1!");
				return;
			}
			
			_CRAPS.output("We have a point. All bets are on!");
			BetManager.turnBetsOn();
			GameState.point = roll;
		}
		_CRAPS.output("After Roll - The point is: " + GameState.point);	
	},
	init: function(){
		_CRAPS.dice = new CrapsDice();
	}
};
_CRAPS.init();