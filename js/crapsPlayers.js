var CrapsPlayer = function(name, bank){
  $player = this;
  $player.player = new Player(name, bank);
  _player = $player.player;
  
  $player.toString = function(){
    return 'Player Name: ' + _player.name + ' Bank: $' + _player.bank;
  }
  
  $player.createBet = function(betType, value, repeat, origBet){
    if(_player.bank < value){
      //console.log(this.toString());
      //console.log(value);
      //console.log(_player.bank);
      //console.log("Not enough money");
      alert('You don\'t have enough money to place that bet.')
      return false;
    }
    if(!isNaN(value)){
      _player.subFromBank(value);
    }
    return new CrapsBet(betType, value, $player, repeat, origBet);
  }
  
  $player.changeName = function(newName){
    _player.changeName(newName);
  }
}

function makeCrapsPlayer(name, bank){
  newPlayer = new CrapsPlayer(name, bank);
  PlayerManager.addPlayer(newPlayer);
}
