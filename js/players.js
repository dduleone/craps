var PlayerManager = {};

var Player = function(name, bank){
  var player = this;
  player.id = PlayerManager.getNextPlayerId();
  player.name = name;
  player.bank = bank;
  
  player.addToBank = function(amt){
    this.bank += amt;
  }
  
  player.subFromBank = function(amt){
    this.bank -= amt;
  }
  
  player.changeName = function(newName){
    this.name = newName;
  }
}

$.extend(PlayerManager, {
  players: [],
  playerId: 0,
  getNextPlayerId: function(){
    return this.playerId++;
  },
  getPlayerName: function(id){
    return this.players[id].name;
  },
  getPlayerById: function(id){
    return this.players[id];
  },
  addPlayer: function(player){
    this.players.push(player);
  },
  updatePlayerArea: function(){
    
    var bank = $('#bank');
    $('#settingsName').val(this.players[0].player.name)
    //if($('#modalButtons').height() > 60){
    //  $('#modalWindow').height($('#modal').height() - 95);
    //}else{
    //  $('#modalWindow').height($('#modal').height() - 65);
    //}
    //$('#tutorialInstruction').css({'top': ($('#generalButtons').offset().top + $('#generalButtons').height())});
    var totalBets = 0;
    for(x in _CRAPS.dealer.betManager.bets){
      totalBets += _CRAPS.dealer.betManager.bets[x].bet.value;
    }
    var avail = $('#availBank');
    var avail2 = $('#avail2');
    var inPlay = $('#inPlay');
    var total = $('#totBank');
    avail.html('$' + this.players[0].player.bank);
    avail2.html('$' + this.players[0].player.bank);
    inPlay.html('$' + totalBets);
    total.html('$' + (this.players[0].player.bank + totalBets));
    if(this.players[0].player.bank + totalBets < initBank){
      total.attr('class','losing');
    }else if(this.players[0].player.bank + totalBets == initBank){
      total.attr('class', '');
    }else{
      total.attr('class', 'winning');
    }
    $('#bank').css({top: 0, margin: '0px', border: '0px'});
    //$('#bank').height(Math.max($('#availBank').offset().top, $('#inPlay').offset().top, $('#totBank').offset().top) + Math.max($('#availBank').height(), $('#inPlay').height(), $('#totBank').height()));
    $('#betListWindow').height($('#betListBG').height() - 35);
    $('#betResultsWindow').height($('#betResultsBG').height() - 35);
    resizeDrawer();
    
    localStorage.clear();
    localStorage['name'] = PlayerManager.players[0].player.name;
    localStorage['bank'] = PlayerManager.players[0].player.bank;
    
    localStorage['point'] = GameState.point;
    _bets = _CRAPS.dealer.betManager.bets
    for(i in _bets){
      localStorage['bet' + i] = JSON.stringify(_bets[i]);
    }
    localStorage['fireArray'] = JSON.stringify(GameState.fireArray);
    localStorage['colors'] = $('#colorScheme').val();
    localStorage['modalTiming'] = $('#modalTiming').val();
    localStorage['betFormTiming'] = $('#betFormTiming').val();
    localStorage['diceTiming'] = $('#diceTiming').val();
    localStorage['colors5'] = JSON.stringify(colors5);
    //window.location.hash = '!/' + encodeURIComponent(PlayerManager.players[0].player.name) + '/' + (PlayerManager.players[0].player.bank).toString(36);
  }
});
