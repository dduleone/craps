/*
crapsBets.js
*/


//http://www.nextshooter.com/bets
// Pass Line
// Field Bet
// Come Bet
// Place Bets
// Proposition Bets
// Pass Odds
// Come Odds
// Don't Pass
// Don't Come
// Hardways


//http://www.inodepositbonus.com/casino-blog/craps-list/
// Come Out Bet (Pass Line)
// Odds on Pass Line
// Don't Pass
// Don't Come
// Come Odds
// Field Bet
// Proposition Bet
// Hardways
// One Roll Bets
// High Horn
// Horn and Hop
// Any Craps
// Craps 2
// Craps 3
// Big 6/8
// Any 7
// Yo Eleven
// Craps
// World

// Game States:
// Point On
// Point Off

var PassLineBet = function(value, player){
	$bet = this;
	$bet.type = "passline";
	//$bet.repeat = false;
	$bet.bet = new Bet(value, player);
	
	
	/* Old bet structure.
		b.onSum2 = function(){
			if (GameState.point == false){
				_CRAPS.output("2! Craps 2! You Lose!");
				b.playerLose();
			}
		}
		
		b.onSum3 = function(){
			if (GameState.point == false){
				_CRAPS.output("3! Craps 3! You Lose!");
				b.playerLose();
			}
		}
		
		b.onSum4 = function(){
			if (GameState.point == 4){
				if (craps.dice.isHardWays){
					_CRAPS.output("4! Hard 4! Point is off! You Win!");
				} else {
					_CRAPS.output("4! Hit the point! Point is off! You Win!");
				}
				b.playerWin();
			}
		}
		
		b.onSum5 = function(){
			if (GameState.point == 5){
				_CRAPS.output("5! No Field 5! Point is off! You Win!");
				b.playerWin();
			}
		}
		
		b.onSum6 = function(){
			if (GameState.point == 6){
				if (craps.dice.isHardWays){
					_CRAPS.output("6! Hard 6! Point is off! You Win!");
				} else {
					_CRAPS.output("6, the easy way! Point is off! You Win!");
				}
				b.playerWin();
			}
		}
		
		b.onSum7 = function(){
			if (GameState.point == false){
				_CRAPS.output("7! Lucky 7! You Win!");
				b.playerWins();
			} else {
				_CRAPS.output("7 out! Point is off! You Lose!");
				b.playerLose();
			}			
		}

		b.onSum8 = function(){
			if (GameState.point == 8){
				if (craps.dice.isHardWays){
					_CRAPS.output("8! Hard 8! Point is off! You Win!");
				} else {
					_CRAPS.output("8! Hit the point! Point is off! You Win!");
				}
				b.playerWin();
			}
		}
		
		b.onSum9 = function(){
			if (GameState.point == 9){
				_CRAPS.output("9! Center Field 9! You Win!");
				b.playerWin();
			}
		}
		
		b.onSum10 = function(){
			if (GameState.point == 10){
				if (craps.dice.isHardWays){
					_CRAPS.output("10! Hard 10! Point is off! You Win!");
				} else {
					_CRAPS.output("10! Easy 10! Point is off! You Win!");
				}
				b.playerWin();
			}
		}
		
		b.onSum11 = function(){
			if (GameState.point == false){
				_CRAPS.output("11! Yo-leven! You Win!");
				b.playerWins();
			}
		}
		
		b.onSum12 = function(){
			if (GameState.point == false){
				_CRAPS.output("12! Craps 12! You Lose!");
				b.playerLose();
			}
		}
	b.bindRollEvents();
	*/
}

var PassLineOddsBet = function(value, player, passBet){
	$bet = this;
	$bet.type = "passlineOdds";
	$bet.repeat = false;
	$bet.bet = new Bet(value, player);
	
	$bet.passBet = passBet
}

var DontPassLineBet = function(value, player){
	$bet = this;
	$bet.type = "dontPass";
	//$bet.repeat = false;
	$bet.bet = new Bet(value, player);
}

var DontPassLineOddsBet = function(value, player, dontPassBet){
	$bet = this;
	$bet.type = "dontPassOdds";
	$bet.repeat = false;
	$bet.bet = new Bet(value, player);
	
	$bet.dontPassBet = dontPassBet
}

var ComeLineBet = function(value, player){
	$bet = this;
	$bet.type = "come";
	$bet.repeat = false;
	$bet.bet = new Bet(value, player);
	
	//Bet Specific Fields
	$bet.comePoint = false;
}
	
var ComeLineOddsBet = function(value, player, comeBet){
	$bet = this;
	$bet.type = "comeOdds";
	$bet.repeat = false;
	$bet.bet = new Bet(value, player);
	
	//Bet Specific Fields
	$bet.comeBet = comeBet;
}

var DontComeLineBet = function(value, player){
	$bet = this;
	$bet.type = "dontCome";
	$bet.repeat = false;
	$bet.bet = new Bet(value, player);
	
	//Bet Specific Fields
	$bet.comePoint = false;
}
	
var DontComeLineOdds = function(value, player, dontComeBet){
	$bet = this;
	$bet.type = "dontComeOdds";
	$bet.repeat = false;
	$bet.bet = new Bet(value, player);
	
	//Bet Specific Fields
	$bet.dontComeBet = dontComeBet;
}

var Place4Bet = function(value, player){
	$bet = this;
	$bet.type = "place4";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var Place5Bet = function(value, player){
	$bet = this;
	$bet.type = "place5";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var Place6Bet = function(value, player){
	$bet = this;
	$bet.type = "place6";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var Place8Bet = function(value, player){
	$bet = this;
	$bet.type = "place8";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var Place9Bet = function(value, player){
	$bet = this;
	$bet.type = "place9";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var Place10Bet = function(value, player){
	$bet = this;
	$bet.type = "place10";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var HardWaysBet = function(value, player, num){
	$bet = this;
	$bet.type = "";
	$bet.repeat = true;
	
	$bet.bet = new Bet(value, player);
	
	switch(num){
	case 4:
		$bet.type = "hard4";
		break;
	case 6:
		$bet.type = "hard6";
		break;
	case 8:
		$bet.type = "hard8";
		break;
	case 10:
		$bet.type = "hard10";
		break;
	default:
		$bet.type = "";
	}
	
	/* Old Bet Structure
	// no Hard 2 bet

	// Hard 4 (win)
	b.on22 = function(){
		if (num == 4){
			_CRAPS.output("Hard 4! You win!");
			b.playerWins();
		}
	}

	// Easy 4 (lose)
	b.onSum4 = function(){
		if (num == 4){
			_CRAPS.output("Easy 4! You lose!");
			b.playerLoses();
		}
	}

	// Hard 6 (win)
	b.on33 = function(){
	if (num == 6){
			_CRAPS.output("Hard 6! You win!");
			b.playerWins();
		}
	}

	// Easy 6 (lose)
	b.onSum6 = function(){
		if (num == 6){
			_CRAPS.output("Easy 6! You lose!");
			b.playerLoses();
		}
	}
	
	// 7 out
	b.onSum7 = function(){
		if(_CRAPS.point > 0){
			_CRAPS.output("7 out! You lose!");
			b.playerLoses();
		}
	}

	// Hard 8 (win)
	b.on44 = function(){
		if (num == 8){
			_CRAPS.output("8 the hard way! You win!");
			b.playerWins();
		}
	}

	// Easy 8 (lose)
	b.onSum8 = function(){
		if (num == 8){
			_CRAPS.output("Easy 8! You lose!");
			b.playerLoses();		
		}
	}

	// Hard 10 (win)
	b.on55 = function(){
		if (num == 10){
			_CRAPS.output("10 the hard way! You win!");
			b.playerWins();
		}
	}

	// Easy 10 (lose)
	b.onSum10 = function(){
		if (num == 10){
			_CRAPS.output("Easy 10! You lose!");
			b.playerLoses();		
		}
	}
	
	// no Hard 12 bet

	b.bindRollEvents();
	return b;
	*/
}

var FieldBet = function(value, player){
	$bet = this;
	$bet.type = "field";
	$bet.repeat = true;
	
	$bet.bet = new Bet(value, player);
}

var CAndEBet = function(value, player){
	$bet = this;
	$bet.type = "cAndE";
	$bet.repeat = true;
	
	$bet.bet = new Bet(value, player);
}

var Any7Bet = function(value, player){
	$bet = this;
	$bet.type = "any7";
	$bet.repeat = true;
	
	$bet.bet = new Bet(value, player);
}

var AnyCrapsBet = function(value, player){
	$bet = this;
	$bet.type = "anyCraps";
	$bet.repeat = true;
	
	$bet.bet = new Bet(value, player);
}

var HornBet = function(value, player){
	$bet = this;
	$bet.type = "horn";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var AceTwoBet = function(value, player){
	$bet = this;
	$bet.type = "aceTwo";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var SnakeEyesBet = function(value, player){
	$bet = this;
	$bet.type = "snakeEyes";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var MidnightBet = function(value, player){
	$bet = this;
	$bet.type = "midnight";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var YolevenBet = function(value, player){
	$bet = this;
	$bet.type = "yoleven";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var Big6Bet = function(value, player){
	$bet = this;
	$bet.type = "big6";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var Big8Bet = function(value, player){
	$bet = this;
	$bet.type = "big8";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

var WorldBet = function(value, player){
	$bet = this;
	$bet.type = "world";
	$bet.repeat = false;
	
	$bet.bet = new Bet(value, player);
}

