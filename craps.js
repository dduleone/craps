/*
craps.js
*/

var _CRAPS = {};

var GameState = {
	pointOn: false,
	point: 0
};


$.extend(_CRAPS, {
	debug: function(msg){
		console.log(msg);
	},
	output: function(msg){
		var buffer = document.getElementById("buffer");
		$(buffer).append("<span>" + msg + "</span><br />\n");
		buffer.scrollTop = buffer.scrollHeight;
	},
	//placeBet: function(bet){
	//	BetManager.placeBet(bet);}
	//,
	placeBet: function(bet){	
		if(BetManager.validateBet(bet)){
			BetManager.placeBet(bet);
		}
	},
	checkBets: function(){
		BetManager.checkBets(_CRAPS.dice);
	},
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
});
_CRAPS.init();

var BetChecker = function(point, betArray, dice){
	newBetArray = [];
	for(var i in BetArray){
		var bet = BetArray[i];
		var _bet = bet.bet;

		if(_bet.on == false){
			newBetArray.push(bet);
			continue;
		}
		
		if(bet.type == "passline"){
			if(point){
				if(dice.getSum() == point){
					_bet.player.addToBank(_bet.value);
					newBetArray.push(bet);
				}
				else if(dice.getSum() == 7){
					continue;
				}
			}
			else if(dice.getSum() == 2 || dice.getSum() == 3){
				_bet.player.subFromBank(_bet.value);
				newBetArray.push(bet);
			}
			else if(dice.getSum() == 7 || dice.getSum() == 11){
				_bet.player.addToBank(_bet.value);
				newBetArray.push(bet);
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "passlineOdds"){
			if(dice.getSum() == point){
				if(point == 4 || point == 10){
					_bet.player.addToBank(2*_bet.value + _bet.value);
				} else if(point == 5 || point == 9){
					_bet.player.addToBank(3*_bet.value/2 + _bet.value);
				} else if(point == 6 || point == 8){
					_bet.player.addToBank(6*_bet.value/5 + _bet.value);
				}
			} else if(dice.getSum() == 7){
				continue;
			} else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "come"){
			if(bet.comePoint){
				if(dice.getSum() == bet.comePoint){
					_bet.player.addToBank(_bet.value);
					if(bet.repeat){
						newBetArray.push(bet);
					}
				}
				else if(dice.getSum() == 7){
					continue;
				}
			}
			else if(dice.getSum() == 2 || dice.getSum() == 3){
				continue;
			}
			else if(dice.getSum() == 7 || dice.getSum() == 11){
				_bet.player.addToBank(_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
			}
			else if(dice.getSum() == 12){
				newBetArray.push(bet);
			}
			else {
				bet.comePoint = dice.getSum();
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "comeOdds"){
			if(dice.getSum() == bet.comePoint){
				if(bet.comePoint == 4 || bet.comePoint == 10){
					_bet.player.addToBank(2*_bet.value + _bet.value);
				} else if(bet.comePoint == 5 || bet.comePoint == 9){
					_bet.player.addToBank(3*_bet.value/2 + _bet.value);
				} else if(bet.comePoint == 6 || bet.comePoint == 8){
					_bet.player.addToBank(6*_bet.value/5 + _bet.value);
				}
			} else if(dice.getSum() == 7){
				continue;
			} else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "dontPass"){
			if(point){
				if(dice.getSum() == point){
					continue;
				}
				else if(dice.getSum() == 7){
					_bet.player.addToBank(_bet.value);
					if(bet.repeat){
						newBetArray.push(bet);
					}
				}
			}
			else if(dice.getSum() == 2 || dice.getSum() == 3){
				_bet.player.addToBank(_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
			}
			else if(dice.getSum() == 7 || dice.getSum == 11){
				_bet.player.subFromBank(_bet.value);
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "dontPassOdds"){
			if(dice.getSum() == 7){
				if(point == 4 || point == 10){
					_bet.player.addToBank(_bet.value/2 + _bet.value);
				} else if(point == 5 || point == 9){
					_bet.player.addToBank(2*_bet.value/3 + _bet.value);
				} else if(point == 6 || point == 8){
					_bet.player.addToBank(5*_bet.value/6 + _bet.value);
				}
			} else if(dice.getSum() == point){
				continue;
			} else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "dontCome"){
			if(bet.comePoint){
				if(dice.getSum() == bet.comePoint){
					continue
				}
				else if(dice.getSum() == 7){
					_bet.player.addToBank(_bet.value);
					if(bet.repeat){
						newBetArray.push(bet);
					}
				}
			}
			else if(dice.getSum() == 2 || dice.getSum() == 3){
				_bet.player.addToBank(_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
			}
			else if(dice.getSum() == 7 || dice.getSum() == 11){
				continue;
			}
			else if(dice.getSum() == 12){
				newBetArray.push(bet);
			}
			else {
				bet.comePoint = dice.getSum();
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "dontComeOdds"){
			if(dice.getSum() == 7){
				if(bet.comePoint == 4 || bet.comePoint == 10){
					_bet.player.addToBank(_bet.value/2 + _bet.value);
				} else if(bet.comePoint == 5 || bet.comePoint == 9){
					_bet.player.addToBank(2*_bet.value/3 + _bet.value);
				} else if(bet.comePoint == 6 || bet.comePoint == 8){
					_bet.player.addToBank(5*_bet.value/6 + _bet.value);
				}
			} else if(dice.getSum() == point){
				continue;
			} else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "place4"){
			if(dice.getSum() == 4){
				_bet.player.addToBank(9*_bet.value/5);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "place5"){
			if(dice.getSum() == 5){
				_bet.player.addToBank(7*_bet.value/5);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "place6"){
			if(dice.getSum() == 6){
				_bet.player.addToBank(7*_bet.value/6);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "place8"){
			if(dice.getSum() == 8){
				_bet.player.addToBank(7*_bet.value/6);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "place9"){
			if(dice.getSum() == 9){
				_bet.player.addToBank(7*_bet.value/5);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "place10"){
			if(dice.getSum() == 10){
				_bet.player.addToBank(9*_bet.value/5);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "hard4"){
			if(dice.getSum() == 7){
				continue;
			}
			else if(dice.getSum() == 4){
				if(dice.dice[0].value == dice.dice[1].value){
					_bet.player.addToBank(_bet.value*7);
					if(bet.repeat){
						newBetArray.push(bet);
					}
					else {
						_bet.player.addToBank(_bet.value);
					}
				}
				else {
					continue;
				}
			}
			newBetArray.push(bet);
		}
		else if(bet.type == "hard6"){
			if(dice.getSum() == 7){
				continue;
			}
			else if(dice.getSum() == 6){
				if(dice.dice[0].value == dice.dice[1].value){
					_bet.player.addToBank(_bet.value*9);
					if(bet.repeat){
						newBetArray.push(bet);
					}
					else {
						_bet.player.addToBank(_bet.value);
					}
				}
				else {
					continue;
				}
			}
			newBetArray.push(bet);
		}
		else if(bet.type == "hard8"){
			if(dice.getSum() == 7){
				continue;
			}
			else if(dice.getSum() == 8){
				if(dice.dice[0].value == dice.dice[1].value){
					_bet.player.addToBank(_bet.value*9);
					if(bet.repeat){
						newBetArray.push(bet);
					}
					else {
						_bet.player.addToBank(_bet.value);
					}
				}
				else {
					continue;
				}
			}
			newBetArray.push(bet);
		}
		else if(bet.type == "hard10"){
			if(dice.getSum() == 7){
				continue;
			}
			else if(dice.getSum() == 10){
				if(dice.dice[0].value == dice.dice[1].value){
					_bet.player.addToBank(_bet.value*7);
					if(bet.repeat){
						newBetArray.push(bet);
					}
					else {
						_bet.player.addToBank(_bet.value);
					}
				}
				else {
					continue;
				}
			}
			newBetArray.push(bet);
		}
		else if(bet.type == "field"){
			if(dice.getSum() == 2 || dice.getSum() == 12){
				_bet.player.addToBank(2*_bet.value);
			}
			else if(dice.getSum() == 3 || dice.getSum() == 4 || dice.getSum() == 9 ||
							dice.getSum() == 10 || dice.getSum() == 11){
				_bet.player.addToBank(_bet.value);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else {
				_bet.player.addToBank(_bet.value);
			}
		}
		else if(bet.type == "cAndE"){
			if(dice.getSum() == 2 || dice.getSum() == 3 || dice.getSum() == 12){
				_bet.player.addToBank(3*_bet.value - _bet.value/2);
			}
			else if(dice.getSum() == 11){
				_bet.player.addToBank(7*_bet.value - _bet.value/2);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else {
				_bet.player.addToBank(_bet.value);
			}
		}
		else if(bet.type == "any7"){
			if(dice.getSum() == 7){
				_bet.player.addToBank(4*_bet.value);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else {
				_bet.player.addToBank(_bet.value);
			}
		}
		else if(bet.type == "anyCraps"){
			if(dice.getSum() == 2 || dice.getSum() == 3 || dice.getSum() == 12){
				_bet.player.addToBank(7*_bet.value);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else {
				_bet.player.addToBank(_bet.value);
			}
		}
		else if(bet.type == "horn"){
			if(dice.getSum() == 2 || dice.getSum() == 12){
				bet.player.addToBank(27*_bet.value/4);
			}
			else if(dice.getSum() == 3 || dice.getSum() == 11){
				bet.player.addToBank(3*_bet.value);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else {
				_bet.player.addToBank(_bet.value);
			}
		}
		else if(bet.type == "aceTwo"){
			if(dice.getSum() == 3){
				bet.player.addToBank(15*_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
		}
		else if(bet.type == "snakeEyes"){
			if(dice.getSum() == 2){
				bet.player.addToBank(30*_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
		}
		else if(bet.type == "midnight"){
			if(dice.getSum() == 12){
				bet.player.addToBank(30*_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
		}
		else if(bet.type == "yoleven"){
			if(dice.getSum() == 11){
				bet.player.addToBank(15*_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
		}
		else if(bet.type == "big6"){
			if(dice.getSum() == 6){
				_bet.player.addToBank(_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "big8"){
			if(dice.getSum() == 8){
				_bet.player.addToBank(_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_bet.player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
		}
		else if(bet.type == "world"){
			if(dice.getSum() == 2 || dice.getSum() == 12){
				_bet.player.addToBank(26*_bet.value/5);
			}
			else if(dice.getSum() == 3 || dice.getSum() == 11){
				_bet.player.addToBank(11*_bet.value/5);
			}
			else if(dice.getSum() == 7){
				_bet.player.addToBank(0);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else{
				_bet.player.addToBank(_bet.value);
			}
		}
	}
	return newBetArray;
}

var BetManager = function() {
	manager = this;
	
	bets = [];
	
	function placeBet(bet) {
		manager.bets[bet.id] = bet;
	}
	
	betId = 0;
	
	function getNextBetId(){
		return manager.betId++;
	}
	
	function checkBets(dice){
		manager.bets = BetChecker(GameState.point, manager.bets, _CRAPS.dice);
	}
	
	function turnBetsOn(){
		for(var i in manager.bets){
			manager.bets[i].betOn = true;
		}
	}
	
	function validateBet(bet){
		switch(bet.type){
		case "passline":
		case "passlineOdds":
		case "come":
		case "comeOdds":
		case "dontPass":
		case "dontPassOdds":
		case "dontCome":
		case "dontComeOdds":
		case "place4":
		case "place5":
		case "place6":
		case "place9":
		case "place8":
		case "place10":
		case "hard4":
		case "hard6":
		case "hard8":
		case "hard10":
		case "field":
		case "cAndE":
		case "any7":
		case "anyCraps":
		case "horn":
		case "aceTwo":
		case "snakeEyes":
		case "midnight":
		case "yoleven":
		case "big6":
		case "big8":
		case "world":
			return true;
		default:
			return;
		}

	}
}

function diceToNum(dice){
	diceArray = dice.getDiceAsArray();
	if(diceArray[0].value <= diceArray[1].value){
		return [diceArray[0].value, diceArray[1].value];
	} else {
		return [diceArray[1].value, diceArray[0].value];
	}
}

var Dealer = function(){
	
	var dealer = this;
	
	dealer.betManager = new BetManager;
}




































