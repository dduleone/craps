var CrapsPlayer = function(name, bank){
	$player = this;
	$player.player = new Player(name, bank);
	player = $player.player;
	
	$player.createBet = function(betType, value){
		if(value < player.bank){
			console.log("Not enough money, bitches");
			return;
		}
		switch(betType){
		case 'passLineBet':
			return new PassLineBet(value, $player);
	
		case 'hardWays4':
			return new HardWaysBet(4, value, $player);
		case 'hardWays6':
			return new HardWaysBet(6, value, $player);
		case 'hardWays8':
			return new HardWaysBet(8, value, $player);
		case 'hardWays10':
			return new HardWaysBet(10, value, $player);
		default:
			return;
		}
	}
}

function makeCrapsPlayer(name, bank){
	newPlayer = new CrapsPlayer(name, bank);
	PlayerManager.addPlayer(newPlayer);
}