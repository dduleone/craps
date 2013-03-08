/*
craps.js
*/

var BetManager = function() {
	var manager = this;
	manager.bets = [];
	manager.betId = 0;
}

BetManager.prototype = {
	bets: [],
	placeBet: function(bet) {
		this.bets.push(bet);
	},
	checkBets: function(dice){
		this.bets = BetChecker(GameState.point, this.bets, _CRAPS.dice);
	},
	turnBetsOn: function(){
		for(var i in this.bets){
			this.bets[i].bet.on = true;
		}
	},
	validateBet: function(bet){
		var _bet = bet.bet;
		if(_bet.origBet){
			var _origBet = _origBet;
		}
		
		if(_bet.value < _CRAPS['minBet']){
			return [false, 'Bet must be bigger than the Table Minimum.'];
		}
		if(_bet.value % 1 != 0){
			return [false, 'Bet must be an integer'];
		}
		
		switch(bet.type){
		case "passline":
			return [true, '']
		case "passlineOdds":
			if(GameState.point == 4 || GameState.point == 10){
				return [_bet.value < 3 * _origBet.value, 'Bet must be 3 times the Pass Line Bet or less'];
			}
			else if(GameState.point == 5 || GameState.point == 9){
				return [(_bet.value % 2 && _bet.value < 4 * _origBet.value), 'Bet value must be even and 4 times the Pass Line bet or less.'];
			}
			else if(GameState.point == 6 || GameState.point == 8){
				return [(_bet.value % 5 && _bet.value < 5 * _origBet.value), 'Bet value must be divisible by 5 and 5 times the Pass Line bet or less.'];
			}
		case "come":
			return [true, '']
		case "comeOdds":
			if(_bet.origBet.point == 4 || _bet.origBet.point == 10){
				return [_bet.value < 3 * _origBet.value, 'Bet must be 3 times the Come Line Bet or less'];
			}
			else if(_bet.origBet.point == 5 || _bet.origBet.point == 9){
				return [(_bet.value % 2 && _bet.value < 4 * _origBet.value), 'Bet value must be even and 4 times the Come Line bet or less.'];
			}
			else if(_bet.origBet.point == 6 || _bet.origBet.point == 8){
				return [(_bet.value % 5 && _bet.value < 5 * _origBet.value), 'Bet value must be divisible by 5 and 5 times the Come Line bet or less.'];
			}
		case "dontPass":
			return [true, ''];
		case "dontPassOdds":
			if(GameState.point == 4 || GameState.point == 10){
				return [_bet.value % 2 && _bet.value < 6 * _origBet.value, 'Bet must be even and 3 times the Don\'t Pass Line Bet or less'];
			}
			else if(GameState.point == 5 || GameState.point == 9){
				return [(_bet.value % 3 && _bet.value < 8 * _origBet.value), 'Bet value must be divisible by 3 and 4 times the Don\'t Pass Line bet or less.'];
			}
			else if(GameState.point == 6 || GameState.point == 8){
				return [(_bet.value % 6 && _bet.value < 10 * _origBet.value), 'Bet value must be divisible by 6 and 5 times the Don\'t Pass Line bet or less.'];
			}
		case "dontCome":
			return [true, ''];
		case "dontComeOdds":
			if(_bet.origBet.point == 4 || _bet.origBet.point == 10){
				return [_bet.value % 2 && _bet.value < 6 * _origBet.value, 'Bet must be even and 3 times the Don\'t Pass Line Bet or less'];
			}
			else if(_bet.origBet.point == 5 || _bet.origBet.point == 9){
				return [(_bet.value % 3 && _bet.value < 8 * _origBet.value), 'Bet value must be divisible by 3 and 4 times the Don\'t Pass Line bet or less.'];
			}
			else if(_bet.origBet.point == 6 || _bet.origBet.point == 8){
				return [(_bet.value % 6 && _bet.value < 10 * _origBet.value), 'Bet value must be divisible by 6 and 5 times the Don\'t Pass Line bet or less.'];
			}
		case "place4":
			return [_bet.value % 5, 'Bet value must be divisible by 5'];
		case "place5":
			return [_bet.value % 5, 'Bet value must be divisible by 5'];
		case "place6":
			return [_bet.value % 6, 'Bet value must be divisible by 6'];
		case "place8":
			return [_bet.value % 6, 'Bet value must be divisible by 6'];
		case "place9":
			return [_bet.value % 5, 'Bet value must be divisible by 5'];
		case "place10":
			return [_bet.value % 5, 'Bet value must be divisible by 5'];
		case "hard4":
			return [true, ''];
		case "hard6":
			return [true, ''];
		case "hard8":
			return [true, ''];
		case "hard10":
			return [true, ''];
		case "field":
			return [true, ''];
		case "cAndE":
			return [_bet.value % 2, 'Bet value must be divisible by 2'];
		case "any7":
			return [_bet.value % 3, 'Bet value must be divisible by 3'];
		case "anyCraps":
			return [true, ''];
		case "horn":
			return [_bet.value % 4, 'Bet value must be divisible by 4'];
		case "aceTwo":
			return [true, ''];
		case "snakeEyes":
			return [true, ''];
		case "midnight":
			return [true, ''];
		case "yoleven":
			return [true, ''];
		case "big6":
			return [_bet.value % 6, 'Bet value must be divisible by 6'];
		case "big8":
			return [_bet.value % 6, 'Bet value must be divisible by 6'];
		case "world":
			return [_bet.value % 5, 'Bet value must be divisible by 5'];
		default:
			return;
		}
	}
}

var Dealer = function(){
	var dealer = this;
	dealer.betManager = new BetManager();
}

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
	dealer: new Dealer(),
	minBet: 10,
	placeBet: function(bet){	
		if(this.dealer.betManager.validateBet(bet)[0]){
			this.dealer.betManager.placeBet(bet);
		}
		else{
			console.log(this.dealer.betManager.validateBet(bet)[1]);
		}
	},
	checkBets: function(){
		this.dealer.betManager.checkBets(_CRAPS.dice);
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
		console.log('Players:');
		for(i in PlayerManager.players){
			console.log(PlayerManager.players[i].toString());
			//console.log('Player Bank: ' + PlayerManager.players[i].player.bank);
		}
		console.log('Bets:');
		for(i in this.dealer.betManager.bets){
			console.log(this.dealer.betManager.bets[i].toString());
			//console.log('Bet Value: ' + this.dealer.betManager.bets[i].bet.value);
		}
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
			this.dealer.betManager.turnBetsOn();
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
	for(var i in betArray){
		var bet = betArray[i];
		var _bet = bet.bet;
		var _player = _bet.player.player;

		if(_bet.on == false){
			newBetArray.push(bet);
			continue;
		}
		
		switch(bet.type){
		case "passline":
			if(point){
				if(dice.getSum() == point){
					_player.addToBank(_bet.value);
					newBetArray.push(bet);
				}
				else if(dice.getSum() == 7){
					continue;
				}
				else{
					newBetArray.push(bet);
				}
			}
			else if(dice.getSum() == 2 || dice.getSum() == 3){
				_player.subFromBank(_bet.value);
				newBetArray.push(bet);
			}
			else if(dice.getSum() == 7 || dice.getSum() == 11){
				_player.addToBank(_bet.value);
				newBetArray.push(bet);
			}
			else{
				newBetArray.push(bet);
			}
			break;
		case "passlineOdds":
			if(dice.getSum() == point){
				if(point == 4 || point == 10){
					_player.addToBank(2*_bet.value + _bet.value);
				} else if(point == 5 || point == 9){
					_player.addToBank(3*_bet.value/2 + _bet.value);
				} else if(point == 6 || point == 8){
					_player.addToBank(6*_bet.value/5 + _bet.value);
				}
			} else if(dice.getSum() == 7){
				continue;
			} else {
				newBetArray.push(bet);
			}
			break;
		case "come":
			if(bet.point){
				if(dice.getSum() == bet.point){
					_player.addToBank(_bet.value);
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
				_player.addToBank(_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
			}
			else if(dice.getSum() == 12){
				newBetArray.push(bet);
			}
			else {
				bet.point = dice.getSum();
				newBetArray.push(bet);
			}
			break;
		case "comeOdds":
			if(dice.getSum() == bet.point){
				if(bet.point == 4 || bet.point == 10){
					_player.addToBank(2*_bet.value + _bet.value);
				} else if(bet.point == 5 || bet.point == 9){
					_player.addToBank(3*_bet.value/2 + _bet.value);
				} else if(bet.point == 6 || bet.point == 8){
					_player.addToBank(6*_bet.value/5 + _bet.value);
				}
			} else if(dice.getSum() == 7){
				continue;
			} else {
				newBetArray.push(bet);
			}
			break;
		case "dontPass":
			if(point){
				if(dice.getSum() == point){
					continue;
				}
				else if(dice.getSum() == 7){
					_player.addToBank(_bet.value);
					if(bet.repeat){
						newBetArray.push(bet);
					}
				}
			}
			else if(dice.getSum() == 2 || dice.getSum() == 3){
				_player.addToBank(_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
			}
			else if(dice.getSum() == 7 || dice.getSum == 11){
				_player.subFromBank(_bet.value);
			}
			else {
				newBetArray.push(bet);
			}
			break;
		case "dontPassOdds":
			if(dice.getSum() == 7){
				if(point == 4 || point == 10){
					_player.addToBank(_bet.value/2 + _bet.value);
				} else if(point == 5 || point == 9){
					_player.addToBank(2*_bet.value/3 + _bet.value);
				} else if(point == 6 || point == 8){
					_player.addToBank(5*_bet.value/6 + _bet.value);
				}
			} else if(dice.getSum() == point){
				continue;
			} else {
				newBetArray.push(bet);
			}
			break;
		case "dontCome":
			if(bet.point){
				if(dice.getSum() == bet.point){
					continue
				}
				else if(dice.getSum() == 7){
					_player.addToBank(_bet.value);
					if(bet.repeat){
						newBetArray.push(bet);
					}
				}
			}
			else if(dice.getSum() == 2 || dice.getSum() == 3){
				_player.addToBank(_bet.value);
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
				bet.point = dice.getSum();
				newBetArray.push(bet);
			}
			break;
		case "dontComeOdds":
			if(dice.getSum() == 7){
				if(bet.point == 4 || bet.point == 10){
					_player.addToBank(_bet.value/2 + _bet.value);
				} else if(bet.point == 5 || bet.point == 9){
					_player.addToBank(2*_bet.value/3 + _bet.value);
				} else if(bet.point == 6 || bet.point == 8){
					_player.addToBank(5*_bet.value/6 + _bet.value);
				}
			} else if(dice.getSum() == point){
				continue;
			} else {
				newBetArray.push(bet);
			}
			break;
		case "place4":
			if(dice.getSum() == 4){
				_player.addToBank(9*_bet.value/5);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
			break;
		case "place5":
			if(dice.getSum() == 5){
				_player.addToBank(7*_bet.value/5);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
			break;
		case "place6":
			if(dice.getSum() == 6){
				_player.addToBank(7*_bet.value/6);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
			break;
		case "place8":
			if(dice.getSum() == 8){
				_player.addToBank(7*_bet.value/6);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
			break;
		case "place9":
			if(dice.getSum() == 9){
				_player.addToBank(7*_bet.value/5);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
			break;
		case "place10":
			if(dice.getSum() == 10){
				_player.addToBank(9*_bet.value/5);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
			break;
		case "hard4":
			if(dice.getSum() == 7){
				continue;
			}
			else if(dice.getSum() == 4){
				if(dice.dice.getArray()[0] == dice.dice.getArray()[1]){
					_player.addToBank(_bet.value*7);
					if(bet.repeat){
						newBetArray.push(bet);
					}
					else {
						_player.addToBank(_bet.value);
					}
				}
				else {
					continue;
				}
			}
			else{
				newBetArray.push(bet);
			}
			break;
		case "hard6":
			if(dice.getSum() == 7){
				continue;
			}
			else if(dice.getSum() == 6){
				if(dice.dice.getArray()[0] == dice.dice.getArray()[1]){
					_player.addToBank(_bet.value*9);
					if(bet.repeat){
						newBetArray.push(bet);
					}
					else {
						_player.addToBank(_bet.value);
					}
				}
				else {
					continue;
				}
			}
			else{
				newBetArray.push(bet);
			}
			break;
		case "hard8":
			if(dice.getSum() == 7){
				continue;
			}
			else if(dice.getSum() == 8){
				if(dice.dice.getArray()[0] == dice.dice.getArray()[1]){
					_player.addToBank(_bet.value*9);
					if(bet.repeat){
						newBetArray.push(bet);
					}
					else {
						_player.addToBank(_bet.value);
					}
				}
				else {
					continue;
				}
			}
			else{
				newBetArray.push(bet);
			}
			break;
		case "hard10":
			if(dice.getSum() == 7){
				continue;
			}
			else if(dice.getSum() == 10){
				if(dice.dice.getArray()[0] == dice.dice.getArray()[1]){
					_player.addToBank(_bet.value*7);
					if(bet.repeat){
						newBetArray.push(bet);
					}
					else {
						_player.addToBank(_bet.value);
					}
				}
				else {
					continue;
				}
			}
			else{
				newBetArray.push(bet);
			}
			break;
		case "field":
			if(dice.getSum() == 2 || dice.getSum() == 12){
				_player.addToBank(2*_bet.value);
			}
			else if(dice.getSum() == 3 || dice.getSum() == 4 || dice.getSum() == 9 ||
							dice.getSum() == 10 || dice.getSum() == 11){
				_player.addToBank(_bet.value);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else {
				_player.addToBank(_bet.value);
			}
			break;
		case "cAndE":
			if(dice.getSum() == 2 || dice.getSum() == 3 || dice.getSum() == 12){
				_player.addToBank(3*_bet.value - _bet.value/2);
			}
			else if(dice.getSum() == 11){
				_player.addToBank(7*_bet.value - _bet.value/2);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else {
				_player.addToBank(_bet.value);
			}
			break;
		case "any7":
			if(dice.getSum() == 7){
				_player.addToBank(4*_bet.value);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else {
				_player.addToBank(_bet.value);
			}
			break;
		case "anyCraps":
			if(dice.getSum() == 2 || dice.getSum() == 3 || dice.getSum() == 12){
				_player.addToBank(7*_bet.value);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else {
				_player.addToBank(_bet.value);
			}
			break;
		case "horn":
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
				_player.addToBank(_bet.value);
			}
			break;
		case "aceTwo":
			if(dice.getSum() == 3){
				bet.player.addToBank(15*_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			break;
		case "snakeEyes":
			if(dice.getSum() == 2){
				bet.player.addToBank(30*_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			break;
		case "midnight":
			if(dice.getSum() == 12){
				bet.player.addToBank(30*_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			break;
		case "yoleven":
			if(dice.getSum() == 11){
				bet.player.addToBank(15*_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			break;
		case "big6":
			if(dice.getSum() == 6){
				_player.addToBank(_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
			break;
		case "big8":
			if(dice.getSum() == 8){
				_player.addToBank(_bet.value);
				if(bet.repeat){
					newBetArray.push(bet);
				}
				else {
					_player.addToBank(_bet.value);
				}
			}
			else if(dice.getSum() == 7){
				continue;
			}
			else {
				newBetArray.push(bet);
			}
			break;
		case "world":
			if(dice.getSum() == 2 || dice.getSum() == 12){
				_player.addToBank(26*_bet.value/5);
			}
			else if(dice.getSum() == 3 || dice.getSum() == 11){
				_player.addToBank(11*_bet.value/5);
			}
			else if(dice.getSum() == 7){
				_player.addToBank(0);
			}
			else{
				continue;
			}
			if(bet.repeat){
				newBetArray.push(bet);
			}
			else{
				_player.addToBank(_bet.value);
			}
			break;
		default:
			continue;
		}
	}
	return newBetArray;
}

function diceToNum(dice){
	diceArray = dice.getDiceAsArray();
	if(diceArray[0].value <= diceArray[1].value){
		return [diceArray[0].value, diceArray[1].value];
	} else {
		return [diceArray[1].value, diceArray[0].value];
	}
}

