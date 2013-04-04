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
  addPlayer: function(player){
    this.players.push(player);
  },
  updatePlayerArea: function(){
    
    var name = $('#name');
    var bank = $('#bank');
    name.empty();
    bank.empty();
    name.html(this.players[0].player.name);
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
    if(this.players[0].player.bank + totalBets < 10000){
      total.attr('class','losing');
    }else if(this.players[0].player.bank + totalBets == 10000){
      total.attr('class', '');
    }else{
      total.attr('class', 'winning');
    }
    bank.append(avail);
    bank.append(inPlay);
    bank.append(total);
    //bank.css({top: $('#name').height()});
    $('#name').css({top: '5px'});
    //$('#bank').css({top: ($('#name').offset().top + $('#name').height() - 30)});
    //$('#buffer').css({top: ($('#bank').offset().top + $('#bank').height())});
    //$('#buffer').height(($('#board').height() - $('#playerArea').height())/2);
    //$('#betListing').height($('#board').height() - $('#playerArea').height() - $('#buffer').height());
    //
    bank.height(Math.max($('#availBank').offset().top, $('#inPlay').offset().top, $('#totBank').offset().top) + Math.max($('#availBank').height(), $('#inPlay').height(), $('#totBank').height()));
    $('#playerArea').height($('#bank').height() + 4);
    $('#buffer').css('top', $('#playerArea').height());
    $('#buffer').height(($('#board').height() - $('#playerArea').height())/2);
    //$('#betListing').height($('#board').height() - $('#playerArea').height() - $('#buffer').height());
    $('#betListing').css('top', ($('#buffer').offset().top + $('#buffer').height() + 2));
    //bank.append(avail).append(inPlay).append(total);
    window.location.hash = encodeURIComponent('!/' + PlayerManager.players[0].player.name) + '/' + (PlayerManager.players[0].player.bank).toString(36);
  }
});
