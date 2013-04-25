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
    
    var name = $('#name');
    var bank = $('#bank');
    name.empty();
    bank.empty();
    name.html(this.players[0].player.name);
    name.width($('#board').width()/(0.7)*(0.29));
    name.css({top: '5px', left: $('#board').width()/(0.7)*(0.0025)});
    $('#modalWindow').height($('#modal').height() - 65);
    $('#playerArea').css({left: '0px'});
    //name.css('left', (($('#buffer').width() - name.width())/2));
    //name.attr('class', 'bttn');
    var bankTitle = $(document.createElement('p'));
    bankTitle.html('<center>Bank</center>');
    if(bank.children().length == 0){
      bank.append(bankTitle);
    }
    var avail = $(document.createElement('div'));
    var inPlay = $(document.createElement('div'));
    var total = $(document.createElement('div'));
    var totalBets = 0;
    //if(_CRAPS.betManager.bets){
    for(x in _CRAPS.dealer.betManager.bets){
      totalBets += _CRAPS.dealer.betManager.bets[x].bet.value;
    }
    avail.attr('id', 'availBank');
    avail.html('Available Bank:<br />$' + this.players[0].player.bank);
    inPlay.attr('id', 'inPlay');
    inPlay.html('Money In Play:<br />$' + totalBets);
    total.attr('id', 'totBank');
    total.html('Total Worth:<br />$' + (this.players[0].player.bank + totalBets));
    if(this.players[0].player.bank + totalBets < initBank){
      total.attr('class','losing');
    }else if(this.players[0].player.bank + totalBets == initBank){
      total.attr('class', '');
    }else{
      total.attr('class', 'winning');
    }
    bank.append(avail);
    bank.append(inPlay);
    bank.append(total);
    //bank.css({top: $('#name').height()});
    //$('#bank').css({top: ($('#name').offset().top + $('#name').height()), margin: '0px', border: '0px'});
    $('#bank').css({top: 0, margin: '0px', border: '0px'});
    $('#bankTitle').css({top: ($('#bank').offset().top), margin: '0px', border: '0px'});
    //$('#buffer').css({top: ($('#bank').offset().top + $('#bank').height())});
    //$('#buffer').height(($('#board').height() - $('#playerArea').height())/2);
    //$('#betListing').height($('#board').height() - $('#playerArea').height() - $('#buffer').height());
    //
    bank.height(Math.max($('#availBank').offset().top, $('#inPlay').offset().top, $('#totBank').offset().top) + Math.max($('#availBank').height(), $('#inPlay').height(), $('#totBank').height()));
    $('#playerArea').height($('#bank').height() + 4);
    $('#buffer').css({top: $('#playerArea').height(), left: $('#board').width()/(0.7)*(0.0025)});
    $('#buffer').height(($('#board').height() - $('#playerArea').height())/2);
    //$('#betListing').height($('#board').height() - $('#playerArea').height() - $('#buffer').height());
    $('#betListing').css('top', ($('#buffer').offset().top + $('#buffer').height() + 2));
    $('#betListing').height($('#board').height() - $('#playerArea').height() - $('#buffer').height() + $(board).height()*(3/7));
    //bank.append(avail).append(inPlay).append(total);
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
    localStorage['colors4'] = JSON.stringify(colors4);
    //window.location.hash = '!/' + encodeURIComponent(PlayerManager.players[0].player.name) + '/' + (PlayerManager.players[0].player.bank).toString(36);
  }
});
