/*
craps.js
*/
var Player =  function(name, bank){
	this.id = _CRAPS.getNextBetId();
	this.name = name;
	this.bank = bank;
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
	betId: 0,
	getNextBetId: function(){
		return this.betId++;
	},
	bets: [],
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
		this.bets[bet.id] = bet;
	},
	checkBets: function(roll){
		for(var i in this.bets){
			if( (typeof this.bets[i] == 'undefined') || (this.bets[i] == 'RESOLVED') ){
				return;
			}
			_CRAPS.output("Checking Bet: " + i);
			this.bets[i].checkRoll(roll.getDiceValues());
		}
	},
	// I kinda like the idea of having a 'global' set of dice variable, and thus a global 'dice' variable:
	dice: null,
	point: false,
	pointOn: function(diceRoll){
		if (diceRoll.validate() && !diceRoll.isCraps() && !diceRoll.isComeOutWinner()){
			this.point = roll.getValue();
			_CRAPS.output("Setting point: " + diceRoll.getValue());
			}
	},
	pointOff: function(){
		_CRAPS.output("Killing point: " + this.point);
		this.point = false;
	},
	roll: function(){
	// Roll the dice.
		var diceRoll = this.dice;
		diceRoll.roll();
		//_CRAPS.output(diceRoll);
		_CRAPS.checkBets(diceRoll);
	// Set & unset the point, as appropriate.
		if (this.point > 0){
			if (diceRoll.is7() || diceRoll.getValue() == this.point){
				this.point = false;
			}
		}else{
			if (!diceRoll.isCraps() && !diceRoll.isComeOutWinner()){
				this.point = diceRoll.getValue();
			}
		}
	}
};

var Bet = function(wager, player){

	var bet = this;
	this.id = _CRAPS.getNextBetId();

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

var Die = function(s){
	if(typeof s == 'undefined'){
		this.sides = 6; 
	} else {
		this.sides = s;
	}
	this.value = false;
	var DIE = this;
	this.roll = function(){
		DIE.value = Math.floor(Math.random() * DIE.sides + 1);
		return DIE.value;
	}
	this.getValue = function(){
		return DIE.value;
	}
	this.validate = function(){
		if(DIE.value < 1){
			return false;
		}
		if(DIE.value > DIE.sides){
			return false;
		}
		return true;
	}
}

var Dice = function(n){
	if(typeof n == 'undefined'){
		count = 2;
	} else {
		count = n;
	}

	var DICE = this;
	
	this.roll = function(){
		var total = 0;
		for(var i in DICE.d){
			total += DICE.d[i].roll();
		}
		DICE.sum = total;
		return DICE;
	}

	this.getDie = function(n){
		if(typeof DICE.d[n] != "undefined"){
			return DICE.d[n-1];
		}
		return false;
	}
	
	this.getSum = function(cached){
		if( (typeof cached != 'undefined') && (cached == false) ){
			for(var i in DICE.d){
				total += DICE.d[i].getValue();
			}
			DICE.sum = total;
		}
		return DICE.sum;
	}

	var validate = function(){
		for(var i in DICE.d){
			if(DICE.d[i].validate() == false){
				return false;
			}
		}
		return true;
	}

	this.d = [];
	for(var i = 0; i < this.count; i++){
		d.push(new Die());
		this.roll();
	}
}


/* I'm wondering if we shouldn't have:
1) Die
2) Dice (n number of Die)
3) CrapsDice (Dice with properties convenient for Craps)
4) PointOnCrapsDice (Dice with properties which determine winstate/losestate when the point is on.)
5) PointOffCrapsDice (Dice with properties which determine winstate/losestate when the point is off.)
*/

var CrapsDice = function(){
	this.d = new Dice();
	var CDICE = this;
	
	this.getSum = function(){
		return CDICE.d.getSum();
	}
	
	this.roll = function(){
		return CDICE.d.roll();
	}
	
	this.validate = function(){
		return CDICE.d.validate();
	}
	
	this.isCraps = function(){
		var val = CDICE.d.getValue();
		switch(val){
			case 2:
			case 3:
			case 12:
				return true;
			break;
			default:
				return false;
			break;
		}
	}
	
	this.isComeOutWinner = function(){
		switch(val){
			case 7:
			case 11:
				return true;
			break;
			default:
				return false;
			break;
		}
	}
	
	this.isHardWays = function(){
		if ((CDICE.d.getDie(1).getValue() != CDICE.d.getDie(2).getValue()){
			return false;
		}
		switch(CDICE.d.getSum){
			case 4:
			case 6:
			case 8:
			case 10:
				return true;
			break;
			default:
				return false;
			break;
		}
	}
	
	this.getDiceValues = function(){
		var a = [];
		for(var i in CDICE.d.d){
			a.push(CDICE.d.d[i].getValue());
		}
		return a;
	}
}