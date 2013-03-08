var CrapsPlayer = function(name, bank){
	$player = this;
	$player.player = new Player(name, bank);
	player = $player.player;
	
	$player.createBet = function(betType, value, origBet){
		if(value < player.bank){
			console.log("Not enough money, bitches");
			return;
		}
		return new CrapsBet(betType, value, $player, origBet);
		/* switch(betType){
		case 'passline':
			return new PassLineBet(value, $player);
			break;
		case 'passlineOdds':
			return new PassLineOddsBet(value, $player, arg);
			break;
		case 'come':
			return new ComeLineBet(value, $player);
			break;
		case 'comeOdds':
			return new ComeLineOddsBet(value, $player, arg);
			break;
		case 'dontPass':
			return new DontPassLineBet(value, $player);
			break;
		case 'dontPassOdds':
			return new DontPassLineOddsBet(value, $player, arg);
			break;
		case 'dontCome':
			return new DontComeLineBet(value, $player);
			break;
		case 'dontComeOdds':
			return new DontComeLineOddsBet(value, $player);
			break;
		case 'place4':
			return new Place4Bet(value, $player);
			break;
		case 'place5':
			return new Place5Bet(value, $player);
			break;
		case 'place6':
			return new Place6Bet(value, $player);
			break;
		case 'place8':
			return new Place8Bet(value, $player);
			break;
		case 'place9':
			return new Place9Bet(value, $player);
			break;
		case 'place10':
			return new Place10Bet(value, $player);
			break;
		case 'hard4':
			return new HardWaysBet(value, $player, 4);
			break;
		case 'hard6':
			return new HardWaysBet(value, $player, 6);
			break;
		case 'hard8':
			return new HardWaysBet(value, $player, 8);
			break;
		case 'hard10':
			return new HardWaysBet(value, $player, 10);
			break;
		case 'field':
			return new FieldBet(value, $player);
			break;
		case 'cAndE':
			return new CAndEBet(value, $player);
			break;
		case 'any7':
			return new Any7Bet(value, $player);
			break;
		case 'anyCraps':
			return new AnyCrapsBet(value, $player);
			break;
		case 'horn':
			return new HornBet(value, $player);
			break;
		case 'aceTwo':
			return new AceTwoBet(value, $player);
			break;
		case 'snakeEyes':
			return new SnakeEyesBet(value, $player);
			break;
		case 'midnight':
			return new MidnightBet(value, $player);
			break;
		case 'yoleven':
			return new YolevenBet(value, $player);
			break;
		case 'big6':
			return new Big6Bet(value, $player);
			break;
		case 'big8':
			return new Big8Bet(value, $player);
			break;
		case 'world':
			return new WorldBet(value, $player);
			break;
		default:
			return;
		}
		*/
	}
	
	$player.toString = function(){
		return 'Player Name: ' + player.name + ' Bank: $' + player.bank;
	}
}

function makeCrapsPlayer(name, bank){
	newPlayer = new CrapsPlayer(name, bank);
	PlayerManager.addPlayer(newPlayer);
}