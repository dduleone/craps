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

var BetManager = {
	bets: [],
	placeBet: function(bet){
		BetManager.bets[bet.id] = bet;
	},
	betId: 0,
	getNextBetId: function(){
		return BetManager.betId++;
	},
	checkBets: function(dice){
		for(var i in BetManager.bets){
			if( (typeof BetManager.bets[i] == 'undefined') || (BetManager.bets[i] == 'RESOLVED') ){
				return;
			}
			if(!BetManager.bets[i].betOn){
				return;
			}
			_CRAPS.output("Checking Bet: " + i);
			BetManager.bets[i].checkRoll(dice.getDiceAsArray());
		}
	},
	turnBetsOn: function(){
		for(var i in this.bets){
			if( (typeof this.bets[i] == 'undefined') || (this.bets[i] == 'RESOLVED') ){
				return;
			}
			this.bets[i].betOn = true;
		}
	},

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
		var roll = _CRAPS.dice.roll();
		_CRAPS.output("The roll is: " + _CRAPS.dice.getSum());
		_CRAPS.output("The point is: " + GameState.point);
		_CRAPS.checkBets();
	// Set & unset the point, as appropriate.
		if (GameState.point > 0){
			if (roll == 7){
				GameState.point = false;
				_CRAPS.output("Seven Out! All bets will be resolved!");
				// Resolve Bets.
			}

			if (roll == GameState.point){
				GameState.point = false;
				_CRAPS.output("Shooter made the point!");
				_CRAPS.output("All Pass Line bets win!");
				_CRAPS.output("All bets will be resolved!");
				// Resolve Bets
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
	}
};

var Bet = function(wager, player){

	var bet = this;

	this.betOn = true;

	this.id = BetManager.getNextBetId();

	this.wager = wager;

	this.player = player;

	this.multiplier = .5;

	this.anyRoll = function(){

	};
	this.onSum2 = function(){
		_CRAPS.debug("Roll Total: 2");
	};
	this.onSum3 = function(){
		_CRAPS.debug("Roll Total: 3");	
	};
	this.onSum4 = function(){
		_CRAPS.debug("Roll Total: 4");
	};
	this.onSum5 = function(){
		_CRAPS.debug("Roll Total: 5");	
	};
	this.onSum6 = function(){
		_CRAPS.debug("Roll Total: 6");
	};
	this.onSum7 = function(){
		_CRAPS.debug("Roll Total: 7");
	};
	this.onSum8 = function(){
		_CRAPS.debug("Roll Total: 8");
	};
	this.onSum9 = function(){
		_CRAPS.debug("Roll Total: 9");
	};
	this.onSum10 = function(){
		_CRAPS.debug("Roll Total: 10");
	};
	this.onSum11 = function(){
		_CRAPS.debug("Roll Total: 11");
	};
	this.onSum12 = function(){
		_CRAPS.debug("Roll Total: 12");
	};

	this.on11 = function(){
		bet.onSum2();
		bet.anyRoll();
		_CRAPS.debug("Roll: 1/1");
	};
	this.on12 = function(){
		bet.onSum3();
		bet.anyRoll();
		_CRAPS.debug("Roll: 1/2");
	};
	this.on13 = function(){
		bet.onSum4();
		bet.anyRoll();
		_CRAPS.debug("Roll: 1/3");
	};
	this.on14 = function(){
		bet.onSum5();
		bet.anyRoll();
		_CRAPS.debug("Roll: 1/4");
	};
	this.on15 = function(){
		bet.onSum6();
		bet.anyRoll();
		_CRAPS.debug("Roll: 1/5");
	};
	this.on16 = function(){
		bet.onSum7();
		bet.anyRoll();
		_CRAPS.debug("Roll: 1/6");
	};
	this.on22 = function(){
		bet.onSum4();
		bet.anyRoll();
		_CRAPS.debug("Roll: 2/2");
	};
	this.on23 = function(){
		bet.onSum5();
		bet.anyRoll();
		_CRAPS.debug("Roll: 2/3");
	};
	this.on24 = function(){
		bet.onSum6();
		bet.anyRoll();
		_CRAPS.debug("Roll: 2/4");
	};
	this.on25 = function(){
		bet.onSum7();
		bet.anyRoll();
		_CRAPS.debug("Roll: 2/5");
	};
	this.on26 = function(){
		bet.onSum8();
		bet.anyRoll();
		_CRAPS.debug("Roll: 2/6");
	};
	this.on33 = function(){
		bet.onSum6();
		bet.anyRoll();
		_CRAPS.debug("Roll: 3/3");
	};
	this.on34 = function(){
		bet.onSum7();
		bet.anyRoll();
		_CRAPS.debug("Roll: 3/4");
	};
	this.on35 = function(){
		bet.onSum8();
		bet.anyRoll();
		_CRAPS.debug("Roll: 3/5");
	};
	this.on36 = function(){
		bet.onSum9();
		bet.anyRoll();
		_CRAPS.debug("Roll: 3/6");
	};
	this.on44 = function(){
		bet.onSum8();
		bet.anyRoll();
		_CRAPS.debug("Roll: 4/4");
	};
	this.on45 = function(){
		bet.onSum9();
		bet.anyRoll();
		_CRAPS.debug("Roll: 4/5");
	};
	this.on46 = function(){
		bet.onSum10();
		bet.anyRoll();
		_CRAPS.debug("Roll: 4/6");
	};
	this.on55 = function(){
		bet.onSum10();
		bet.anyRoll();
		_CRAPS.debug("Roll: 5/5");
	};
	this.on56 = function(){
		bet.onSum11();
		bet.anyRoll();
		_CRAPS.debug("Roll: 5/6");
	};
	this.on66 = function(){
		bet.onSum12();
		bet.anyRoll();
		_CRAPS.debug("Roll: 6/6");
	};

	this.checkRoll = function(dice){
		this.onFunc["" + dice[0] + dice[1]]();
	}

	this.bindRollEvents = function(){
		this.onFunc = {
			11: this.on11,
			12: this.on12,
			13: this.on13,
			14: this.on14,
			15: this.on15,
			16: this.on16,

			21: this.on12,
			22: this.on22,
			23: this.on23,
			24: this.on24,
			25: this.on25,
			26: this.on26,

			31: this.on13,
			32: this.on23,
			33: this.on33,
			34: this.on34,
			35: this.on35,
			36: this.on36,

			41: this.on14,
			42: this.on24,
			43: this.on34,
			44: this.on44,
			45: this.on45,
			46: this.on46,

			51: this.on15,
			52: this.on25,
			53: this.on35,
			54: this.on45,
			55: this.on55,
			56: this.on56,

			61: this.on16,
			62: this.on26,
			63: this.on36,
			64: this.on46,
			65: this.on56,
			66: this.on66
		};
	};

	this.dissolveBet = function(){
		//_CRAPS.bets.splice(this.id, 1);
		// Maybe we make a _CRAPS.resolveBet() which is passed a betId, and iterates over the bets, to find the one to resolve.
		// Also could create a betMap object with a mapBets() method which maps a betId to an array position. 
		_CRAPS.bets[this.id] = 'RESOLVED';
	}

	this.onWin = function(){
		this.dissolveBet();
	}

	this.onLose = function(){
		this.dissolveBet();
	}

	this.playerWins = function(){
		if( (typeof _CRAPS.players != "undefined") && (typeof _CRAPS.players[this.player] != "undefined") ){
			_CRAPS.players[this.player].bank += this.wager;
			_CRAPS.players[this.player].bank += this.wager * this.multiplier;
			_CRAPS.output(_CRAPS.getPlayerName(this.player) + " won $" + (this.wager + this.wager * this.multiplier));
			_CRAPS.output(_CRAPS.getPlayerName(this.player) + "'s new balance is: $" + _CRAPS.players[this.player].bank);
		}
		this.onWin();
	};

	this.playerLoses = function(){
		if( (typeof _CRAPS.players != "undefined") && (typeof _CRAPS.players[this.player] != "undefined") ){
			_CRAPS.output(_CRAPS.getPlayerName(this.player) + " lost a placed bet of $" + this.wager);
		}
		this.onLose();
	};

	this.bindRollEvents();
};

function getRandomNumber(n){
	n = (typeof n == 'undefined') ? 6 : n;
	return Math.floor(Math.random() * n) + 1;
}




function makeDie(sides){
	sides = (typeof sides == 'undefined') ? 6 : sides;

	return {
		value: false,
		roll: function(){
			this.value = getRandomNumber(sides);
			return this.value;
		},
		validate: function(){
			if( (this.value < 1) || (this.value > sides) ){
				return false;
			}
			return true;
		}
	};
}


function makeDice(n){
	count = (typeof n == 'undefined') ? 2 : n;

	var d = [];
	for(var i=0; i<count; i++){
		d.push(makeDie(6));
	}

	return {
		dice: d,
		total: 0,
		roll: function(){
			_CRAPS.output("Rolling...");
			this.total = 0;
			for(var i in this.dice){
				var roll = this.dice[i].roll();
				_CRAPS.output("Die #" + i + ": " + roll);
				this.total += roll;
			}
			return this.total;
		},
		validate: function(){
			for(var i in this.dice){
				if(!this.dice[i].validate()){
					return false;
				}
			}
			return true;
		},
		getArray: function(){
			var a = [];
			for(var i in this.dice){
				a.push(this.dice[i].value);
			}
			return a;
		}
	};
}


/* I'm wondering if we shouldn't have:
1) Die
2) Dice (n number of Die)
3) CrapsDice (Dice with properties convenient for Craps)
4) PointOnCrapsDice (Dice with properties which determine winstate/losestate when the point is on.)
5) PointOffCrapsDice (Dice with properties which determine winstate/losestate when the point is off.)
*/

var CrapsDice = function(){
	return {
		dice: makeDice(2),
		getSum: function(){
			return this.dice.total;
		},
		roll: function(){
			return this.dice.roll();
		},
		validate: function(){
			return this.dice.validate();
		},
		isCraps: function(){
			switch(this.dice.total){
				case 2:
				case 3:
				case 12:
					return true;
				break;
				default:
				break;
			}
			return false;
		},
		isComeOutWinner: function(){
			switch(this.dice.total){
				case 7:
				case 11:
					return true;
				break;
				default:
				break;
			}
			return false;
		},
		isHardWays: function(){
			if (this.dice[0].value != this.dice[1].value){
				return false;
			}
			switch(this.dice.total){
				case 4:
				case 6:
				case 8:
				case 10:
					return true;
				break;
				default:
				break;
			}
			return false;
		},
		getDiceAsArray: function(){
			return this.dice.getArray();
		}
	};
}