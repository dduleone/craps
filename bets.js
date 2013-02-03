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

var HardWaysBet = function(value, player){
	var b = new Bet(value, player);
	b.multiplier = .2;

	// Hard 2 (win)
	b.on11 = function(){
		_CRAPS.output("Hard 2! You win!");
		b.playerWins();
	}
	
	// No Easy 2

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

	// Hard 12 (win)
	b.on66 = function(){
		_CRAPS.output("12 the hard way! You win!");
		b.playerWins();
	}

	// No Easy 12

	b.bindRollEvents();
	return b;
}
