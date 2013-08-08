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
    
    //var name = $('#name');
    var bank = $('#bank');
    //name.empty();
    //bank.empty();
    //name.html(this.players[0].player.name);
    $('#settingsName').val(this.players[0].player.name)
    //name.width($('#board').width()/(0.7)*(0.29));
    //name.css({top: '5px', left: $('#board').width()/(0.7)*(0.0025)});
    if($('#modalButtons').height() > 60){
      $('#modalWindow').height($('#modal').height() - 95);
    }else{
      $('#modalWindow').height($('#modal').height() - 65);
    }
    $('#tutorialInstruction').css({'top': ($('#generalButtons').offset().top + $('#generalButtons').height())});
    //$('#playerArea').css({left: '0px'});
    //var bankTitle = $(document.createElement('p'));
    //bankTitle.html('<center>Bank</center>');
    //if(bank.children().length == 0){
    //  bank.append(bankTitle);
    //}
    //var avail = $(document.createElement('div'));
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
    //bank.append(avail);
    //bank.append(inPlay);
    //bank.append(total);
    
    $('#bank').css({top: 0, margin: '0px', border: '0px'});
    //$('#bankTitle').css({top: ($('#bank').offset().top), margin: '0px', border: '0px'});
    
    //bank.height(Math.max($('#availBank').offset().top, $('#inPlay').offset().top, $('#totBank').offset().top) + Math.max($('#availBank').height(), $('#inPlay').height(), $('#totBank').height()));
    
    //$('#buffer').css({top: $('#playerArea').height(), left: $('#board').width()/(0.7)*(0.0025)});
    //$('#buffer').height(($('#board').height() - $('#playerArea').height())/2);
    //$('#betListing').css('top', ($('#buffer').offset().top + $('#buffer').height() + 2));
    $('#betListing').css('top', ($('#bank').height()));
    $('#bank').height(Math.max($('#availBank').offset().top, $('#inPlay').offset().top, $('#totBank').offset().top) + Math.max($('#availBank').height(), $('#inPlay').height(), $('#totBank').height()));
    //$('#betListing').height($('#board').height() - $('#playerArea').height() - $('#buffer').height() + $(board).height()*(3/7));
    //$('#closeBets').css('bottom', ($('#betListLayer').height() - $('#betListing').height() - $('#playerArea').height() - $('#closeBets').height()));
    $('#betListLayer').height($('#betListBG').height() - 35);
    
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
