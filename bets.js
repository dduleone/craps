//http://www.nextshooter.com/bets

var HardWaysBet = function(value, player){
	var b = new Bet(value, player);
	b.multiplier = .2;

	// Hard 2 (win)
	b.on11 = function(){
		craps.output("Hard 2! You win!");
		b.playerWins();
	}
	
	// No Easy 2

	// Hard 4 (win)
	b.on22 = function(){
		craps.output("Hard 4! You win!");
		b.playerWins();
	}

	// Easy 4 (lose)
	b.onSum4 = function(){
		craps.output("Easy 4! You lose!");
		b.playerLoses();
	}

	// Hard 6 (win)
	b.on33 = function(){
		craps.output("Hard 6! You win!");
		b.playerWins();
	}

	// Easy 6 (lose)
	b.onSum6 = function(){
		craps.output("Easy 6! You lose!");
		b.playerLoses();		
	}

	// Hard 8 (win)
	b.on44 = function(){
		craps.output("8 the hard way! You win!");
		b.playerWins();
	}

	// Easy 8 (lose)
	b.onSum8 = function(){
		craps.output("Easy 8! You lose!");
		b.playerLoses();		
	}

	// Hard 10 (win)
	b.on55 = function(){
		craps.output("10 the hard way! You win!");
		b.playerWins();
	}

	// Easy 10 (lose)
	b.onSum10 = function(){
		craps.output("Easy 10! You lose!");
		b.playerLoses();		
	}

	// Hard 12 (win)
	b.on66 = function(){
		craps.output("12 the hard way! You win!");
		b.playerWins();
	}

	// No Easy 12

	b.bindRollEvents();
	return b;
}