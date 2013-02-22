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

// Bet Responses:
// Win = 1
// Lose = 2
// Draw = 3
// Win & Repeat = 4
// Lose & Repeat = 5
// Draw & Repeat = 6
// Off (Draw & Repeat) = 7

//[[1,1; 1,2; 1,3; 1,4; 1,5; 1,6][2,2; 2,3; 2,4; 2,5; 2,6][3,3; 3,4; 3,5; 3,6][4,4; 4,5; 4,6][5,5; 5,6][6,6]]
//Ex:
//var passLineBetPointOff = [[5, 5, 3, 3, 3, 4]
//															[3, 3, 3, 4, 3]
//																 [3, 4, 3, 3]
//																		[3, 3, 3]
//																			 [3, 4]
//																					[6]];
var PassLineBet = function(value, player){
	passBet = this;
	passBet.type = "passLineBet";
	var b = new Bet(value, player);
	b.payoutMult = 0;
	//[[1,1; 1,2; 1,3; 1,4; 1,5; 1,6][2,2; 2,3; 2,4; 2,5; 2,6][3,3; 3,4; 3,5; 3,6][4,4; 4,5; 4,6][5,5; 5,6][6,6]]
	passBet.passLineBetPointOff = [[5, 5, 3, 3, 3, 4][3, 3, 3, 4, 3][3, 4, 3, 3][3, 3, 3][3, 4][6]];
	passBet.passLineBetPoint4   = [[6, 6, 4, 6, 6, 2][4, 6, 6, 6, 6][6, 2, 6, 6][6, 6, 6][6, 6][6]];
	passBet.passLineBetPoint5   = [[6, 6, 6, 4, 6, 2][6, 4, 6, 6, 6][6, 2, 6, 6][6, 6, 6][6, 6][6]];
	passBet.passLineBetPoint6   = [[6, 6, 6, 6, 4, 2][6, 6, 4, 2, 6][4, 2, 6, 6][6, 6, 6][6, 6][6]];
	passBet.passLineBetPoint8   = [[6, 6, 6, 6, 6, 2][6, 6, 6, 2, 4][6, 2, 4, 6][4, 6, 6][6, 6][6]];
	passBet.passLineBetPoint9   = [[6, 6, 6, 6, 6, 2][6, 6, 6, 2, 6][6, 2, 6, 4][6, 4, 6][6, 6][6]];
	passBet.passLineBetPoint10  = [[6, 6, 6, 6, 6, 2][6, 6, 6, 2, 6][6, 2, 6, 6][6, 6, 4][4, 6][6]];
	
	b.result = passBet.passLineBetPointOff;
	
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

var HardWaysBet = function(num, value, player){
	hardBet = this;
	hardBet.type = "hardWaysBet";
	var b = new Bet(value, player);
	switch(num){
	case 4:
		b.payoutMult = 7;
		b.result = [[6, 6, 2, 6, 6, 6][4, 6, 6, 6, 6][6, 6, 6, 6][6, 6, 6][6, 6][6]];
	case 6:
		b.payoutMult = 9;
		b.result = [[6, 6, 6, 6, 2, 6][6, 6, 2, 6, 6][4, 6, 6, 6][6, 6, 6][6, 6][6]];
	case 8:
		b.payoutMult = 9;
		b.result = [[6, 6, 6, 6, 6, 6][6, 6, 6, 6, 2][6, 6, 2, 6][4, 6, 6][6, 6][6]];
	case 10:
		b.payoutMult = 7;
		b.result = [[6, 6, 6, 6, 6, 6][6, 6, 6, 6, 6][6, 6, 6, 6][6, 6, 2][4, 6][6]];
	default:
		b.payoutMult = 0
		b.result = [[6, 6, 6, 6, 6, 6][6, 6, 6, 6, 6][6, 6, 6, 6][6, 6, 6][6, 6][6]];
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
