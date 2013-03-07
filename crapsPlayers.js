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
			break;
		case 'hardWays4':
			return new HardWaysBet(value, $player, 4);
			break;
		case 'hardWays6':
			return new HardWaysBet(value, $player, 6);
			break;
		case 'hardWays8':
			return new HardWaysBet(value, $player, 8);
			break;
		case 'hardWays10':
			return new HardWaysBet(value, $player, 10);
			break;
		default:
			return;
		}
	}
}

function makeCrapsPlayer(name, bank){
	newPlayer = new CrapsPlayer(name, bank);
	PlayerManager.addPlayer(newPlayer);
}