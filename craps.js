var Player =  function(name, bank){
	this.id = craps.getNextBetId();
	this.name = name;
	this.bank = bank;
};

var craps = {
	debug: function(msg){
		console.log(msg);
	},
	output: function(msg){
		$("#buffer").append("<span>" + msg + "</span><br />\n");
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
			craps.output("Checking Bet: " + i);
			this.bets[i].checkRoll(roll);
		}
	}
};

var Bet = function(wager, player){

	var bet = this;
	this.id = craps.getNextBetId();

	this.wager = wager;

	this.player = player;

	this.multiplier = .5;

	this.anyRoll = function(){

	};
	this.onSum2 = function(){
		craps.debug("Roll Total: 2");
	};
	this.onSum3 = function(){
		craps.debug("Roll Total: 3");	
	};
	this.onSum4 = function(){
		craps.debug("Roll Total: 4");
	};
	this.onSum5 = function(){
		craps.debug("Roll Total: 5");	
	};
	this.onSum6 = function(){
		craps.debug("Roll Total: 6");
	};
	this.onSum7 = function(){
		craps.debug("Roll Total: 7");
	};
	this.onSum8 = function(){
		craps.debug("Roll Total: 8");
	};
	this.onSum9 = function(){
		craps.debug("Roll Total: 9");
	};
	this.onSum10 = function(){
		craps.debug("Roll Total: 10");
	};
	this.onSum11 = function(){
		craps.debug("Roll Total: 11");
	};
	this.onSum12 = function(){
		craps.debug("Roll Total: 12");
	};

	this.on11 = function(){
		bet.onSum2();
		bet.anyRoll();
		craps.debug("Roll: 1/1");
	};
	this.on12 = function(){
		bet.onSum3();
		bet.anyRoll();
		craps.debug("Roll: 1/2");
	};
	this.on13 = function(){
		bet.onSum4();
		bet.anyRoll();
		craps.debug("Roll: 1/3");
	};
	this.on14 = function(){
		bet.onSum5();
		bet.anyRoll();
		craps.debug("Roll: 1/4");
	};
	this.on15 = function(){
		bet.onSum6();
		bet.anyRoll();
		craps.debug("Roll: 1/5");
	};
	this.on16 = function(){
		bet.onSum7();
		bet.anyRoll();
		craps.debug("Roll: 1/6");
	};
	this.on22 = function(){
		bet.onSum4();
		bet.anyRoll();
		craps.debug("Roll: 2/2");
	};
	this.on23 = function(){
		bet.onSum5();
		bet.anyRoll();
		craps.debug("Roll: 2/3");
	};
	this.on24 = function(){
		bet.onSum6();
		bet.anyRoll();
		craps.debug("Roll: 2/4");
	};
	this.on25 = function(){
		bet.onSum7();
		bet.anyRoll();
		craps.debug("Roll: 2/5");
	};
	this.on26 = function(){
		bet.onSum8();
		bet.anyRoll();
		craps.debug("Roll: 2/6");
	};
	this.on33 = function(){
		bet.onSum6();
		bet.anyRoll();
		craps.debug("Roll: 3/3");
	};
	this.on34 = function(){
		bet.onSum7();
		bet.anyRoll();
		craps.debug("Roll: 3/4");
	};
	this.on35 = function(){
		bet.onSum8();
		bet.anyRoll();
		craps.debug("Roll: 3/5");
	};
	this.on36 = function(){
		bet.onSum9();
		bet.anyRoll();
		craps.debug("Roll: 3/6");
	};
	this.on44 = function(){
		bet.onSum8();
		bet.anyRoll();
		craps.debug("Roll: 4/4");
	};
	this.on45 = function(){
		bet.onSum9();
		bet.anyRoll();
		craps.debug("Roll: 4/5");
	};
	this.on46 = function(){
		bet.onSum10();
		bet.anyRoll();
		craps.debug("Roll: 4/6");
	};
	this.on55 = function(){
		bet.onSum10();
		bet.anyRoll();
		craps.debug("Roll: 5/5");
	};
	this.on56 = function(){
		bet.onSum11();
		bet.anyRoll();
		craps.debug("Roll: 5/6");
	};
	this.on66 = function(){
		bet.onSum12();
		bet.anyRoll();
		craps.debug("Roll: 6/6");
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
		//craps.bets.splice(this.id, 1);
		// Maybe we make a craps.resolveBet() which is passed a betId, and iterates over the bets, to find the one to resolve.
		// Also could create a betMap object with a mapBets() method which maps a betId to an array position. 
		craps.bets[this.id] = 'RESOLVED';
	}

	this.onWin = function(){
		this.dissolveBet();
	}

	this.onLose = function(){
		this.dissolveBet();
	}

	this.playerWins = function(){
		if( (typeof craps.players != "undefined") && (typeof craps.players[this.player] != "undefined") ){
			craps.players[this.player].bank += this.wager;
			craps.players[this.player].bank += this.wager * this.multiplier;
			craps.output(craps.getPlayerName(this.player) + " won $" + (this.wager + this.wager * this.multiplier));
			craps.output(craps.getPlayerName(this.player) + "'s new balance is: $" + craps.players[this.player].bank);
		}
		this.onWin();
	};

	this.playerLoses = function(){
		if( (typeof craps.players != "undefined") && (typeof craps.players[this.player] != "undefined") ){
			craps.output(craps.getPlayerName(this.player) + " lost a placed bet of $" + this.wager);
		}
		this.onLose();
	};

	this.bindRollEvents();
};

var die = function(){
	this.roll = function(){
		return Math.floor(Math.random()*6 + 1)
	}
}

var dice = function(){
	var d1 = new die();
	var d2 = new die();
	this.roll = function(){
		return [d1.roll(), d2.roll()];
	}
}



