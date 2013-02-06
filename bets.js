/*
bets.js
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
var PassLineBet = function(value, player){
	var b = new Bet(value, player);
	b.multiplier = 0;
	
	if (GameState.point == false){
		b.onSum7 = function(){
			_CRAPS.output("7! Lucky 7! You Win!");
			b.playerWins();
		}
		
		b.onSum11 = function(){
			_CRAPS.output("11! Yo-leven! You Win!");
			b.playerWins();
		}
		
		b.onSum2 = function(){
			_CRAPS.output("2! Craps 2! You Lose!");
			b.playerLose();
		}
		
		b.onSum3 = function(){
			_CRAPS.output("3! Craps 3! You Lose!");
			b.playerLose();
		}
		
		b.onSum12 = function(){
			_CRAPS.output("12! Craps 12! You Lose!");
			b.playerLose();
		}
	}
	
	if (GameState.point == true){
		switch(craps.dice.getSum()){
			case 4:
				b.onSum4 = function(){
					if (craps.dice.isHardWays){
						_CRAPS.output("4! Hard 4! Point is off! You Win!");
					} else {
						_CRAPS.output("4! Hit the point! Point is off! You Win!");
					}
					b.playerWin();
				}
			break;
			case 5:
				b.onSum5 = function(){
					_CRAPS.output("5! No Field 5! Point is off! You Win!");
					b.playerWin();
				}
			break;
			case 6:
				b.onSum6 = function(){
					if (craps.dice.isHardWays){
						_CRAPS.output("6! Hard 6! Point is off! You Win!");
					} else {
						_CRAPS.output("6, the easy way! Point is off! You Win!");
					}
					b.playerWin();
				}
			break;
			case 7:
				b.onSum7 = function(){
					_CRAPS.output("7 out! Point is off! You Lose!");
					b.playerLose();
				}
			break;
			case 8:
				b.onSum8 = function(){
					if (craps.dice.isHardWays){
						_CRAPS.output("8! Hard 8! Point is off! You Win!");
					} else {
						_CRAPS.output("8! Hit the point! Point is off! You Win!");
					}
					b.playerWin();
				}
			break;
			case 9:
				b.onSum9 = function(){
					_CRAPS.output("9! Center Field 9! You Win!");
					b.playerWin();
				}
			break;
			case 10:
				b.onSum10 = function(){
					if (craps.dice.isHardWays){
						_CRAPS.output("10! Hard 10! Point is off! You Win!");
					} else {
						_CRAPS.output("10! Easy 10! Point is off! You Win!");
					}
					b.playerWin();
				}
			break;
			default:
			break;
		}
	}
}

var HardWaysBet = function(value, player){
	var b = new Bet(value, player);
	b.multiplier = .2;
	
	// no Hard 2 bet

	// Hard 4 (win)
	b.on22 = function(){
		_CRAPS.output("Hard 4! You win!");
		b.playerWins();
	}

	// Easy 4 (lose)
	b.onSum4 = function(){
		_CRAPS.output("Easy 4! You lose!");
		b.playerLoses();
	}

	// Hard 6 (win)
	b.on33 = function(){
		_CRAPS.output("Hard 6! You win!");
		b.playerWins();
	}

	// Easy 6 (lose)
	b.onSum6 = function(){
		_CRAPS.output("Easy 6! You lose!");
		b.playerLoses();
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
		_CRAPS.output("8 the hard way! You win!");
		b.playerWins();
	}

	// Easy 8 (lose)
	b.onSum8 = function(){
		_CRAPS.output("Easy 8! You lose!");
		b.playerLoses();		
	}

	// Hard 10 (win)
	b.on55 = function(){
		_CRAPS.output("10 the hard way! You win!");
		b.playerWins();
	}

	// Easy 10 (lose)
	b.onSum10 = function(){
		_CRAPS.output("Easy 10! You lose!");
		b.playerLoses();		
	}
	
	// no Hard 12 bet

	b.bindRollEvents();
	return b;
}
