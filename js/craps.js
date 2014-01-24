/*
craps.js
*/

function onWin(bet, amount){
  var _bet = bet.bet;
  var _player = PlayerManager.getPlayerById(_bet.playerId).player;
  
  _CRAPS.dealer.betManager.winningBetIds.push(_bet.betId);
  _CRAPS.dealer.betManager.winningBets.push([bet, amount]);
  _CRAPS.output(nameToPretty(bet.type) + " bet wins! Pays out $" + amount);
  _player.addToBank(amount);
  
}

function onLose(bet){
  var _bet = bet.bet;
    _CRAPS.dealer.betManager.losingBetIds.push(_bet.betId);
    _CRAPS.dealer.betManager.losingBets.push(bet);
}

$('window').bind(onWin);
$('window').bind(onLose);

var BetManager = function() {
  var manager = this;
  manager.bets = [];
  manager.betId = 0;
}

BetManager.prototype = {
  bets: [],
  winningBetIds: [],
  losingBetIds: [],
  winningBets: [],
  losingBets: [],
  placeBet: function(bet) {
    this.bets.push(bet);
    this.displayBets();
  },
  checkBets: function(dice){
    this.bets = BetChecker(GameState.point, this.bets, _CRAPS.dice);
    this.animateBets();
  },
  removeBet: function(betId){
    var _bets = this.bets
    var newBetArray = [];
    for(x in _bets){
      if(betId != _bets[x].bet.betId){
        newBetArray.push(_bets[x]);
      } else {
        PlayerManager.getPlayerById(_bets[x].bet.playerId).player.addToBank(_bets[x].bet.value);
      }
    }
    this.bets = newBetArray;
    this.displayBets();
    PlayerManager.updatePlayerArea();
    //draw(Board);
  },
  turnBetsOn: function(){
    for(var i in this.bets){
      this.bets[i].bet.on = true;
    }
  },
  turnBetsOff: function(){
    for(var i in this.bets){
      if(['passline', 'passlineOdds', 'come', 'comeOdds', 'dontPass', 'dontPassOdds', 'dontCome', 'dontComeOdds', 'fire'].indexOf(this.bets[i].type) == -1){
        this.bets[i].bet.on = false;
      }
    }
  },
  validateBet: function(bet){
    var _bet = bet.bet;
    if(bet.type != 'come' && bet.type != 'dontCome' && bet.type != 'comeOdds' && bet.type != 'dontComeOdds'){
      for(i in this.bets){
        if(bet.type == this.bets[i].type){
          return [0, function(){alert('You may only place one ' + nameToPretty(bet.type) + ' bet at a time. Bet has not been placed.');}];
        }
      }
    }
    if(bet.type == 'come' || bet.type == 'dontCome'){
      for(i in this.bets){
        if(bet.type == this.bets[i].type && !this.bets[i].point){
          return [0, function(){alert('You may only place one ' + nameToPretty(bet.type) + ' bet with no point at a time. Bet has not been placed.');}];
        }
      }
    }
    
    if(bet.origBet){
      var _origBet = bet.origBet.bet;
    }
    
    if(bet.type == 'passlineOdds' && bet.origBet.type != 'passline'){
      return [0, function(){alert('Original bet must be a Pass Line bet. Bet has not been placed.');}];
    }
    if(bet.type == 'dontPassOdds' && bet.origBet.type != 'dontPass'){
      return [0, function(){alert('Original bet must be a Don\'t Pass bet. Bet has not been placed.');}];
    }
    if(bet.type == 'comeOdds' && bet.origBet.type != 'come'){
      return [0, function(){alert('Original bet must be a Come bet. Bet has not been placed.');}];
    }
    if(bet.type == 'dontComeOdds' && bet.origBet.type != 'dontCome'){
      return [0, function(){alert('Original bet must be a Don\'t Come bet. Bet has not been placed.');}];
    }
    
    if(bet.type == 'passlineOdds' || bet.type == 'dontPassOdds'){
      if(!GameState.point){
        return [0, function(){alert('You cannot place a ' + nameToPretty(bet.type) + ' bet when there is no point on. Bet has not been placed.');}];
      }
    }
    
    if(bet.type == 'comeOdds' || bet.type == 'dontComeOdds'){
      if(!bet.origBet.point){
        return [0, function(){alert('You cannot place a ' + nameToPretty(bet.type) + ' bet when there is no ' + nameToPretty(bet.origBet.type) + ' point on. Bet has not been placed.');}];
      }
    }
    
    if(bet.type == 'comeOdds' || bet.type == 'dontComeOdds'){
      for(i in this.bets){
        if(this.bets[i].type == bet.type && this.bets[i].origBet.point == bet.origBet.point){
          return [0, function(){alert('You cannot place more than one ' + nameToPretty(bet.type) + ' bet on the same ' + nameToPretty(bet.origBet.type) + ' bet. Bet has not been placed.');}];
        }
      }
    }
    
    if(_bet.value < _CRAPS['minBet']){
      if(['passline', 
          'passlineOdds',
          'come',
          'comeOdds',
          'dontPass',
          'dontPassOdds',
          'dontCome',
          'dontComeOdds',
          'place4',
          'place5',
          'place6',
          'place8',
          'place9',
          'place10',
          'field',
          'big6',
          'big8'].indexOf(bet.type) != -1){
        return [0, function(){alert('Bet must be bigger than the Table Minimum. Bet has not been placed.');}];
      }
    }
    if(_bet.value > _CRAPS['maxBet']){
      return [0, function(){alert('Bet must be smaller than the Table Maximum. Bet has not been placed.');}];
    }
    if(_bet.value % 1 != 0){
      return [0, function(){alert('Bet must be an integer. Bet has not been placed.');}];
    }
    
    switch(bet.type){
    case "passline":
      if(GameState.point){
        return [0, function(){alert('Cannot place a Pass Line bet while there is a point on. Bet has not been placed.');}];
      }
      return [1, '']
    case "passlineOdds":
      if(bet.origBet == null){
        return[0, function(){alert('There must be a Pass Line Bet on the table. Bet has not been placed.');}];
      }
      if(GameState.point == 4 || GameState.point == 10){
        return [(_bet.value <= 3 * _origBet.value) ? 1 : 0, function(){alert('Bet must be 3 times the Pass Line bet or less. Bet has not been placed.');}];
      }
      else if(GameState.point == 5 || GameState.point == 9){
        if(_bet.value <= 4 * _origBet.value){
          return [(_bet.value % 2 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be even. Do you want to adjust to the next even number?');return [ans, 2];}];
        } else {
          return [0, function(){alert('Bet value must be 4 times the Pass Line bet or less. Bet has not been placed.');}];
        }
      }
      else if(GameState.point == 6 || GameState.point == 8){
        if(_bet.value <= 5 * _origBet.value){
          return [(_bet.value % 5 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 5. Do you want to adjust to the next number divisible by 5?');return [ans, 5];}];
        } else {
          return [0, function(){alert('Bet value must be 5 times the Pass Line bet or less. Bet has not been placed.');}];
        }
      }
    case "come":
      return [1, '']
    case "comeOdds":
      if(bet.origBet == null){
        return[0, function(){alert('There must be a Come bet on the table. Bet has not been placed.');}];
      }
      if(!bet.origBet.point){
        return[0, function(){alert('The associated Come bet must have a point on. Bet has not been placed');}];
      }
      if(bet.origBet.point == 4 || bet.origBet.point == 10){
        return [(_bet.value <= 3 * _origBet.value) ? 1 : 0, function(){alert('Bet value must be 3 times the Come Line bet or less. Bet has not been placed.');}];
      }
      else if(bet.origBet.point == 5 || bet.origBet.point == 9){
        if (_bet.value <= 4 * _origBet.value){
          return [(_bet.value % 2 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be even. Do you want to adjust to the next even number?');return [ans, 2];}];
        } else {
          return [0 , function(){alert('Bet value must be 4 times the Come Line bet or less. Bet has not been placed.');}];
        }
      }
      else if(bet.origBet.point == 6 || bet.origBet.point == 8){
        if(_bet.value <= 5 * _origBet.value){
          return [(_bet.value % 5 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 5. Do you want to adjust to the next number divisible by 5?');return [ans, 5];}];
        } else {
          return [0 , function(){alert('Bet value must be 5 times the Come Line bet or less. Bet has not been placed.');}];
        }
      }
    case "dontPass":
      return [1, ''];
    case "dontPassOdds":
      if(GameState == null){
        return[0, function(){alert('There must be a Don\' Pass Line Bet on the table.');}];
      }
      if(!GameState.point){
        return[0, function(){alert('The associated Don\'t Pass bet must have a point on. Bet has not been placed');}];
      }
      if(GameState.point == 4 || GameState.point == 10){
        if(_bet.value <= 6 * _origBet.value){
          return [(_bet.value % 2 == 0) ? 1 : 2, function(){var ans = confirm('Bet should be even. Do you want to adjust to the next even number?');return [ans, 2];}];
        } else {
          return [0, function(){alert('Bet must be 6 times the Don\'t Pass Line bet or less. Bet has not been placed.');}];
        }
      }
      else if(GameState.point == 5 || GameState.point == 9){
        if(_bet.value <= 8 * _origBet.value){
          return [(_bet.value % 3 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 3. Do you want to adjust to the next number divisible by 3?');return [ans, 3];}];
        } else {
          return [0 , function(){alert('Bet value must 8 times the Don\'t Pass Line bet or less. Bet has not been placed.');}];
        }
      }
      else if(GameState.point == 6 || GameState.point == 8){
        if(_bet.value <= 10 * _origBet.value){
        return [(_bet.value % 6 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 6. Do you want to adjust to the next number divisible by 6?');return [ans, 6];}];
        } else {
          return [0 , function(){alert('Bet value must be 10 times the Don\'t Pass Line bet or less. Bet has not been placed.');}];
        }
      }
    case "dontCome":
      return [1, ''];
    case "dontComeOdds":
      if(bet.origBet == null){
        return[0, function(){alert('There must be a Don\'t Come Bet on the table.');}];
      }
      if(bet.origBet.point == 4 || bet.origBet.point == 10){
        if(_bet.value <= 6 * _origBet.value){
          return [(_bet.value % 2 == 0) ? 1 : 2, function(){var ans = confirm('Bet should be even. Do you want to adjust to the next even number?');return [ans, 2];}];
        } else {
          return [0, function(){alert('Bet must be 6 times the Don\'t Come bet or less. Bet has not been placed.');}];
        }
      }
      else if(bet.origBet.point == 5 || bet.origBet.point == 9){
        if(_bet.value <= 8 * _origBet.value){
          return [(_bet.value % 3 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 3. Do you want to adjust to the next number divisible by 3?');return [ans, 3];}];
        } else {
          return [0 , function(){alert('Bet value must 8 times the Don\'t Come bet or less. Bet has not been placed.');}];
        }
      }
      else if(bet.origBet.point == 6 || bet.origBet.point == 8){
        if(_bet.value <= 10 * _origBet.value){
        return [(_bet.value % 6 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 6. Do you want to adjust to the next number divisible by 6?');return [ans, 6];}];
        } else {
          return [0 , function(){alert('Bet value must be 10 times the Don\'t Come bet or less. Bet has not been placed.');}];
        }
      }
    case "place4":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 5. Do you want to adjust to the next number divisible by 5?');return [ans, 5];}];
    case "place5":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 5. Do you want to adjust to the next number divisible by 5?');return [ans, 5];}];
    case "place6":
      return [(_bet.value % 6 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 6. Do you want to adjust to the next number divisible by 6?');return [ans, 6];}];
    case "place8":
      return [(_bet.value % 6 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 6. Do you want to adjust to the next number divisible by 6?');return [ans, 6];}];
    case "place9":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 5. Do you want to adjust to the next number divisible by 5?');return [ans, 5];}];
    case "place10":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 5. Do you want to adjust to the next number divisible by 5?');return [ans, 5];}];
    case "hard4":
      return [1, ''];
    case "hard6":
      return [1, ''];
    case "hard8":
      return [1, ''];
    case "hard10":
      return [1, ''];
    case "field":
      return [1, ''];
    case "cAndE":
      return [(_bet.value % 2 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 2. Do you want to adjust to the next even number?');return [ans, 2];}];
    case "any7":
      return [(_bet.value % 3 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 3. Do you want to adjust to the next number divisible by 3?');return [ans, 3];}];
    case "anyCraps":
      return [1, ''];
    case "horn":
      return [(_bet.value % 4 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 4. Do you want to adjust to the next number divisible by 4?');return [ans, 4];}];
    case "aceTwo":
      return [1, ''];
    case "snakeEyes":
      return [1, ''];
    case "midnight":
      return [1, ''];
    case "yoleven":
      return [1, ''];
    case "big6":
      return [1, ''];
    case "big8":
      return [1, ''];
    case "world":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){var ans = confirm('Bet value should be divisible by 5. Do you want to adjust to the next number divisible by 5?');return [ans, 5];}];
    case "fire":
      if(_bet.value > 10){
        return [0, function(){alert('Maximum Fire bet is $10. Bet has not been placed.');}];
      }
      if(GameState.fireArray[4] ||
         GameState.fireArray[5] ||
         GameState.fireArray[6] ||
         GameState.fireArray[8] ||
         GameState.fireArray[9] ||
         GameState.fireArray[10] ||
         GameState.point){
        return [0, function(){alert('You may only place a Fire bet during the initial Come Out Roll. Bet has not been placed.');}];
      }
      return [1, ''];
    default:
      return;
    }
  },
  displayBets: function(){
    var betListing = $('#betListing');
    //betListing.css({top: '71%', left: '22%'});
    //$('#betListing').css('top', ($('#bank').height()));
    if(betListing.children().length > 0){
      betListing.empty();
    }
    var betTable = $(document.createElement('table'));
    betTable.attr('id', 'betTable');
    var heading = $(document.createElement('thead'));
    var headers = $(document.createElement('tr'));
    headers.width($('#buffer').width());
    headers.append($(document.createElement('th')).width($('#betListWindow').width()*(0.35)).append($(document.createElement('img')).attr('title', 'Bet Type').attr('src', 'img/bet-type.png')))//.html('Type'))
           .append($(document.createElement('th')).width($('#betListWindow').width()*(0.25)).append($(document.createElement('i')).attr('title', 'Bet Amount').attr('class', 'icon-money icon-large')))//.html('Value'))
           .append($(document.createElement('th')).width($('#betListWindow').width()*(0.10)).append($(document.createElement('i')).attr('title', 'Bet On?').attr('class', 'icon-off icon-large')))//.html('On?'))
           .append($(document.createElement('th')).width($('#betListWindow').width()*(0.10)).append($(document.createElement('i')).attr('title', 'Repeat On Win?').attr('class', 'icon-repeat icon-large')))//.html('Repeat?'))
           .append($(document.createElement('th')).width($('#betListWindow').width()*(0.10)).append($(document.createElement('i')).attr('title', 'Bet Point').attr('class', 'icon-exclamation icon-large')))//.html('Point'))
           .append($(document.createElement('th')).width($('#betListWindow').width()*(0.10)).attr('onclick', 'reset()').append($(document.createElement('i')).attr('title', 'Remove All Bets').attr('class', 'icon-eraser icon-large').css({color:'#f00', cursor:'pointer'})));//.html('Clear'));
    heading.append(headers);
    betTable.append(heading);
    //betListing.html('<center>Click the Board to Place a Bet!</center>');
    betListing.append(betTable);

    for(var betNum in this.bets){
      var newBetRow = $(document.createElement('tr'));
      newBetRow.css('backgroundColor', (betNum%2)?'#666':'#888');
      newBetRow.attr('id', 'bet' + this.bets[betNum].bet.betId);
      ////newBetRow.css({float: 'left', left: '0px'});
      //var id = $(document.createElement('td'));
      //id.html(this.bets[betNum].bet.betId);
      
      var type = $(document.createElement('td'));
      type.html(nameToPretty(this.bets[betNum].type));
      
      var val = $(document.createElement('td'));
      val.attr('id', 'val' + this.bets[betNum].bet.betId);
      val.html('$' + this.bets[betNum].bet.value);
      val.attr('onclick', 'updateBet(' + this.bets[betNum].bet.betId + ')');
      val.attr('class', 'clickable');
      if(((this.bets[betNum].type == 'passline' ||
           this.bets[betNum].type == 'dontPassline') && GameState.point) ||
         ((this.bets[betNum].type == 'come' ||
           this.bets[betNum].type == 'dontCome') && this.bets[betNum].point)){
            val.removeClass('clickable');
            val.removeAttr('onclick');
           }
      
      var betOn = $(document.createElement('input'));
      //betOnLabel.html('<br />Bet On: ');
      var on = $(document.createElement('td'));
      betOn.attr('type', 'checkbox');
      betOn.attr('checked', this.bets[betNum].bet.on);
      betOn.attr('id', 'on' + this.bets[betNum].bet.betId);
      betOn.attr('betNum', this.bets[betNum].bet.betId);
      if(['passline', 'dontPass', 'passlineOdds', 'dontPassOdds', 'come', 'dontCome', 'comeOdds', 'dontComeOdds', 'fire'].indexOf(this.bets[betNum].type) != -1){
        betOn.attr('disabled', 'true');
      }
      var toggleBet = function(e){
        var betNumber = $($(this)[0]).attr("betNum");
        _CRAPS.dealer.betManager.getBetById(betNumber).bet.on = $($(this)[0]).is(':checked');
      }
      betOn.change(toggleBet);
      //if(['passline', 'dontPass', 'passlineOdds', 'dontPassOdds'].indexOf(this.bets[betNum].type) != -1 && GameState.point > 0){
      //  betOn.attr('disabled', 'true');
      //}
      on.append(betOn);
      
      var repeat = $(document.createElement('td'));
      var repeatWin = $(document.createElement('input'));
      repeatWin.attr('type', 'checkbox');
      repeatWin.attr('checked', this.bets[betNum].repeat);
      repeatWin.attr('id', 'rep' + this.bets[betNum].bet.betId);
      repeatWin.attr('betNum', this.bets[betNum].bet.betId);
      var toggleRepeat = function(e){
        var betNumber = $($(this)[0]).attr("betNum");
        _CRAPS.dealer.betManager.getBetById(betNumber).repeat = $(this).is(':checked');
      }
      repeatWin.change(toggleRepeat);
      if(['passline', 'dontPass'].indexOf(this.bets[betNum].type) != -1){
        repeatWin.attr('disabled', 'true');
      }
      if(['passlineOdds', 'dontPassOdds', 'comeOdds', 'dontComeOdds'].indexOf(this.bets[betNum].type) != -1){
        repeatWin.attr('disabled', 'true');
      }
      repeat.append(repeatWin);
      
      var point = $(document.createElement('td'));
      if(['come', 'dontCome'].indexOf(this.bets[betNum].type) != -1){
        point.html(this.bets[betNum].point);
      } else if(['comeOdds', 'dontComeOdds'].indexOf(this.bets[betNum].type) != -1){
        point.html(this.bets[betNum].origBet.point);
      } else {
        point.html('');
      }
      
      var remove = $(document.createElement('td'));
      //remove.append($(document.createElement('img')).attr('src', 'images/red_x_small.png'))//.html('Rem');
      remove.append($(document.createElement('i')).attr('class', 'icon-remove icon-large').css({color:'#f00', cursor:'pointer'}))//.html('Rem');
      //remove.html('Rem');
      //remove.attr({class: 'bttn red'});
      if(GameState.tutorial){
        remove.click(function(){
                      alert("You cannot take down a Tutorial bet.");
                     });
      }else if(this.bets[betNum].type == 'passline'){
        if(GameState.point > 0){
          remove.click(function(){
                        alert("You cannot take down a Pass Line bet when a point is on.");
                      });
          remove.attr('disabled', 'true');
        }else{
          remove.click(function(){
                        _CRAPS.dealer.betManager.removeBet(this.bets[betNum].bet.betId);
                      });
        }
      }else if(this.bets[betNum].type == 'dontPass'){
        if(GameState.point > 0){
          remove.click(function(){
                        alert("You cannot take down a Don\'t Pass bet when a point is on.");
                      });
          remove.attr('disabled', 'true');
        }else{
          remove.click(function(){
                        _CRAPS.dealer.betManager.removeBet(this.bets[betNum].bet.betId);
                      });
        }
      }else if(this.bets[betNum].type == 'come'){
        if(this.bets[betNum].point > 0){
          remove.click(function(){
                        alert("You cannot take down a Come bet when it has a point.");
                      });
          remove.attr('disabled', 'true');
        }else{
          remove.click(function(){
                        _CRAPS.dealer.betManager.removeBet(this.bets[betNum].bet.betId);
                      });
        }
      }else if(this.bets[betNum].type == 'dontCome'){
        if(this.bets[betNum].point > 0){
          remove.click(function(){
                        alert("You cannot take down a Don\'t Come bet when it has a point.");
                      });
          remove.attr('disabled', 'true');
        }else{
          remove.click(function(){
                        _CRAPS.dealer.betManager.removeBet(this.bets[betNum].bet.betId);
                      });
        }
      }else if(this.bets[betNum].type == 'fire'){
        if(GameState.point > 0 || GameState.numFire > 0){
          remove.click(function(){
                        alert("You may only take down a fire bet on the inital Come Out Roll.");
                      });
          remove.attr('disabled', 'true');
        }else{
          remove.click(function(){
                        _CRAPS.dealer.betManager.removeBet(this.bets[betNum].bet.betId);
                      });
        }
      }else{
        remove.click(function(){
                       _CRAPS.dealer.betManager.removeBet(this.bets[betNum].bet.betId);
                     });
      }
      //pTag.append(remove);
      //newBetRow.append(legend);
      betTable.append(newBetRow);
      //newBetRow.append(id);
      newBetRow.append(type);
      newBetRow.append(val);
      newBetRow.append(on);
      newBetRow.append(repeat);
      newBetRow.append(point);
      newBetRow.append(remove);
    }
  },
  animateBets: function(){
    for(x in this.winningBetIds){
      $('#bet' + this.winningBetIds[x]).attr('class', 'winningBet');
    }
    for(x in this.losingBetIds){
      $('#bet' + this.losingBetIds[x]).attr('class', 'losingBet');
      $('#val' + this.losingBetIds[x]).css({borderStyle: 'none'});
    }
    $('.winningBet').animate({backgroundColor: 'green', borderColor: 'green'}, BET_FADE_INTERVAL/2, function(){$('.winningBet').animate({backgroundColor: 'none', borderColor: 'none'}, BET_FADE_INTERVAL/2);});
    $('.losingBet').animate({backgroundColor: 'red', borderColor: 'red', opacity: 0}, BET_FADE_INTERVAL);
    var animateTimeout = setInterval(function(){
            $('.winningBet').removeClass('winningBet');
            $('.losingBet').removeClass('losingBet');
            clearInterval(animateTimeout);
            }, BET_FADE_INTERVAL);
    this.winningBetIds = [];
    this.losingBetIds = [];
    var diceArray = _CRAPS.dice.dice.getArray();
    var dieSymbols = ['&#x2680;', '&#x2681;', '&#x2682;', '&#x2683;', '&#x2684;', '&#x2685;'];
    if(!diceArray[0]){
      $('#die1').html(dieSymbols[3]);
    } else {
      $('#die1').html(dieSymbols[diceArray[0] - 1]);
    }
    if(!diceArray[1]){
      $('#die2').html(dieSymbols[3]);
    } else {
      $('#die2').html(dieSymbols[diceArray[1] - 1]);
    }
    if(this.winningBets.length < 1){
      $('#wins').empty();
      $('#wins').html("None of your bets won! Try again!")
    }else{
      $('#wins').empty();
      $('#wins').html("Your winning bets are: <br />")
      var winningTable = $(document.createElement('table'));
      var heading = $(document.createElement('thead'));
      var headers = $(document.createElement('tr'));
      headers.width($('#buffer').width());
      headers.append($(document.createElement('th')).append($(document.createElement('img')).attr('title', 'Bet Type').attr('src', 'img/bet-type.png')))//.html('Type'))
             .append($(document.createElement('th')).append($(document.createElement('i')).attr('title', 'Bet Amount').attr('class', 'icon-money icon-large')))//.html('Value'))
             .append($(document.createElement('th')).append($(document.createElement('i')).attr('title', 'Bet Point').attr('class', 'icon-exclamation icon-large')))//.html('Point'))
             .append($(document.createElement('th')).html('Winnings'));
      heading.append(headers);
      winningTable.append(heading);
      for(var betNum in this.winningBets){
        var newBetRow = $(document.createElement('tr'));
        
        var type = $(document.createElement('td'));
        type.html(nameToPretty(this.winningBets[betNum][0].type));
        
        var val = $(document.createElement('td'));
        val.html('$' + this.winningBets[betNum][0].bet.value);
        
        var point = $(document.createElement('td'));
        if(['come', 'dontCome'].indexOf(this.winningBets[betNum][0].type) != -1){
          point.html(this.winningBets[betNum][0].point);
        } else if(['comeOdds', 'dontComeOdds'].indexOf(this.winningBets[betNum][0].type) != -1){
          point.html(this.winningBets[betNum][0].origBet.point);
        } else {
          point.html('');
        }
        
        var winnings = $(document.createElement('td'));
        winnings.html('$' + this.winningBets[betNum][1]);
        winningTable.append(newBetRow);
        newBetRow.append(type);
        newBetRow.append(val);
        newBetRow.append(point);
        newBetRow.append(winnings);
      }
      $('#wins').append(winningTable);
    }
    if(this.losingBets.length < 1){
      $('#losses').empty();
      $('#losses').html("<span id=''>Great Job! None of your bets lost!")
    }else{
      $('#losses').empty();
      $('#losses').html("Your losing bets are: <br />")
      var losingTable = $(document.createElement('table'));
      var heading = $(document.createElement('thead'));
      var headers = $(document.createElement('tr'));
      headers.width($('#buffer').width());
      headers.append($(document.createElement('th')).append($(document.createElement('img')).attr('title', 'Bet Type').attr('src', 'img/bet-type.png')))
             .append($(document.createElement('th')).append($(document.createElement('i')).attr('title', 'Bet Amount').attr('class', 'icon-money icon-large')))
             .append($(document.createElement('th')).append($(document.createElement('i')).attr('title', 'Bet Point').attr('class', 'icon-exclamation icon-large')));
      heading.append(headers);
      losingTable.append(heading);
      for(var betNum in this.losingBets){
        var newBetRow = $(document.createElement('tr'));
        
        var type = $(document.createElement('td'));
        type.html(nameToPretty(this.losingBets[betNum].type));
        
        var val = $(document.createElement('td'));
        val.html('$' + this.losingBets[betNum].bet.value);
        
        var point = $(document.createElement('td'));
        if(['come', 'dontCome'].indexOf(this.losingBets[betNum].type) != -1){
          point.html(this.losingBets[betNum].point);
        } else if(['comeOdds', 'dontComeOdds'].indexOf(this.losingBets[betNum].type) != -1){
          point.html(this.losingBets[betNum].origBet.point);
        } else {
          point.html('');
        }
        
        losingTable.append(newBetRow);
        newBetRow.append(type);
        newBetRow.append(val);
        newBetRow.append(point);
      }
      $('#losses').append(losingTable);
    }
    
    if(this.winningBets.length > 0 || this.losingBets.length > 0){
      setTimeout(function(){openBetResults();},500);
    }
    this.winningBets = [];
    this.losingBets = [];
  },
  getBetById: function(betId){
    for(x in this.bets){
      if(this.bets[x].bet.betId == betId){
        return this.bets[x];
      }
    }
    return null;
  }
}

var Dealer = function(){
  var dealer = this;
  dealer.betManager = new BetManager();
}

var GameState = {
  pointOn: false,
  point: 0,
  fireArray: {
    4: false,
    5: false,
    6: false,
    8: false,
    9: false,
    10: false
  },
  numFire: 0,
  tutorial: false,
  tutorialState: 0
};

var _CRAPS = {};

$.extend(_CRAPS, {
  debug: function(msg){
    console.log(msg);
  },
  output: function(msg){
    //var buffer = document.getElementById("buffer");
    //$(buffer).append("<span>" + msg + "</span><br />\n");
    //buffer.scrollTop = buffer.scrollHeight;
  },
  dealer: new Dealer(),
  minBet: 10,
  maxBet: 10000,
  placeBet: function(bet){
    if(!bet){
      return;
    }
    betResponse = this.dealer.betManager.validateBet(bet);
    if(betResponse[0] > 0){
      var response;
      if(betResponse[0] == 2){
        response = betResponse[1]();
        if(response[0]){
          var newVal = bet.bet.value;
          while(newVal%response[1] != 0){
            newVal++;
          }
          while(newVal > _CRAPS.maxBet){
            newVal = newVal - response[1];
          }
          if(['passline', 'passlineOdds', 'come', 'comeOdds', 'dontPass', 'dontPassOdds', 'dontCome', 'dontComeOdds', 'place4', 'place5', 'place6', 'place8', 'place9', 'place10', 'field', 'big6', 'big8'].indexOf(bet.type) != -1){
            while(newVal < _CRAPS.minBet){
              newVal = newVal + response[1];
            }
            if(PlayerManager.getPlayerById(bet.bet.playerId).player.bank - (newVal - bet.bet.value) < 0){
              alert('You don\'t have enough money to place this bet. Bet has not been placed');
              PlayerManager.getPlayerById(bet.bet.playerId).player.addToBank(bet.bet.value);
              return;
            }
          }
          while(PlayerManager.getPlayerById(bet.bet.playerId).player.bank - (newVal - bet.bet.value) < 0){
            newVal = newVal - response[1];
          }
          if(newVal == 0){
            alert('You don\'t have enough money to place this bet. Bet has not been placed');
            PlayerManager.getPlayerById(bet.bet.playerId).player.addToBank(bet.bet.value);
            return;
          }
          PlayerManager.getPlayerById(bet.bet.playerId).player.subFromBank((newVal - bet.bet.value));
          bet.bet.value = newVal;
        }
      }
      this.dealer.betManager.placeBet(bet);
      //draw(Board);
    }
    else{
      if(!isNaN(bet.bet.value)){
        PlayerManager.getPlayerById(bet.bet.playerId).player.addToBank(bet.bet.value);
      }
      betResponse[1]();
    }
  },
  checkBets: function(){
    this.dealer.betManager.checkBets(_CRAPS.dice);
  },
  dice: null,
  roll: function(){
    // Roll the dice.
    //_CRAPS.output("Before Roll - The point is: " + GameState.point);
    var $CRAPS = this;
    _CRAPS.dice.dice.roll(function(roll){
      colors['dicePips'] = eval("colors" + $('#colorScheme').val() + "['dicePips']");
      _CRAPS.dice.dice.total = roll;
      if(GameState.tutorial){
        var die0 = _CRAPS.dice.dice.dice[0];
        var die1 = _CRAPS.dice.dice.dice[1];
        var theseDice = _CRAPS.dice.dice
        if(GameState.tutorialState == 0){
          die0.value = 3;
          die1.value = 4;
          roll = 7;
          theseDice.total = 7;
          GameState.tutorialState++;
        } else if(GameState.tutorialState == 1){
          die0.value = 1;
          die1.value = 2;
          roll = 3;
          theseDice.total = 3;
          GameState.tutorialState++;
        } else if(GameState.tutorialState == 2){
          die0.value = 5;
          die1.value = 3;
          roll = 8;
          theseDice.total = 8;
          GameState.tutorialState++;
        } else if(GameState.tutorialState == 3){
          die0.value = 4;
          die1.value = 4;
          roll = 8;
          theseDice.total = 8;
          GameState.tutorialState++;
        } else if(GameState.tutorialState == 4){
          die0.value = 4;
          die1.value = 1;
          roll = 5;
          theseDice.total = 5;
          GameState.tutorialState++;
        } else if(GameState.tutorialState == 5){
          die0.value = 3;
          die1.value = 6;
          roll = 9;
          theseDice.total = 9;
          GameState.tutorialState++;
        } else if(GameState.tutorialState == 6){
          die0.value = 5;
          die1.value = 2;
          roll = 7;
          theseDice.total = 7;
          GameState.tutorialState++;
        }
        updateTutorial();
      }
      var diceArray = diceToNum(_CRAPS.dice);
      _CRAPS.output("---Rolling--- " + diceArray[0] + " + " + diceArray[1] + " = " + (diceArray[0] + diceArray[1]));
      //_CRAPS.output("The roll is: <b><font size='15'>" + roll + "</font></b>");
      _CRAPS.checkBets();
      PlayerManager.updatePlayerArea();
    // Set & unset the point, as appropriate.
      if (GameState.point > 0){
        if (roll == 7){
          GameState.point = false;
          GameState.numFire = 0;
          for(i in GameState.fireArray){
            if(GameState.fireArray[i]){
              GameState.numFire++;
            }
            GameState.fireArray[i] = false;
          }
          
          _CRAPS.output("Seven Out! Pay all Don't Come and Don't Pass! All other bets lose.");
          // Resolve Bets.
          return;
        }
      
        if (roll == GameState.point){
          GameState.fireArray[GameState.point] = true;
          GameState.point = false;
          _CRAPS.output("Shooter made the point!");
          _CRAPS.output("All Pass Line bets win!");
          _CRAPS.output("All Single- and Multi-roll bets are off!");
          $CRAPS.dealer.betManager.turnBetsOff();
          //_CRAPS.output("All bets will be resolved!");
          // Resolve Bets
          return;
        }
      } else {
        if(_CRAPS.dice.isCraps()){
          _CRAPS.output("Craps " + roll + "!");
          if(roll == 12){
            _CRAPS.output("All Pass Line bets push!");
          }else{
            _CRAPS.output("All Pass Line bets lose!");
          }
          return;
        }
      
        if(_CRAPS.dice.isComeOutWinner()){
          _CRAPS.output("Come out win!");
          _CRAPS.output("All Pass Line bets pay 1:1!");
          return;
        }
        
        _CRAPS.output("We have a point. All bets are on!");
        $CRAPS.dealer.betManager.turnBetsOn();
        GameState.point = roll;
      }
      //_CRAPS.output("After Roll - The point is: " + GameState.point);
    });
  },
  init: function(){
    _CRAPS.dice = new CrapsDice();
  }
});
_CRAPS.init();

var BetChecker = function(point, betArray, dice){
  newBetArray = [];
  for(var i in betArray){
    var bet = betArray[i];
    var _bet = bet.bet;
    var _player = PlayerManager.getPlayerById(_bet.playerId).player;

    if(!_bet.on){
      newBetArray.push(bet);
      continue;
    }
    
    switch(bet.type){
    case "passline":
      if(point){
        if(dice.getSum() == point){
          $('window').trigger(onWin(bet, _bet.value));
          newBetArray.push(bet);
        }else if(dice.getSum() == 7){
          $('window').trigger(onLose(bet));
          continue;
        }else{
          newBetArray.push(bet);
        }
      }else if(dice.getSum() == 2 || dice.getSum() == 3){
        $('window').trigger(onLose(bet));
        _player.subFromBank(_bet.value);
        newBetArray.push(bet);
      }else if(dice.getSum() == 7 || dice.getSum() == 11){
        $('window').trigger(onWin(bet, _bet.value));
        newBetArray.push(bet);
      }else{
        newBetArray.push(bet);
      }
      break;
    case "passlineOdds":
      if(dice.getSum() == point){
        if(point == 4 || point == 10){
          $('window').trigger(onWin(bet, 2*_bet.value + _bet.value));
        }else if(point == 5 || point == 9){
          $('window').trigger(onWin(bet, 3*_bet.value/2 + _bet.value));
        }else if(point == 6 || point == 8){
          $('window').trigger(onWin(bet, 6*_bet.value/5 + _bet.value));
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "come":
      if(bet.point){
        if(dice.getSum() == bet.point){
          bet.point = false;
          $('window').trigger(onWin(bet, _bet.value));
          if(bet.repeat){
            newBetArray.push(bet);
          }
        }else if(dice.getSum() == 7){
          $('window').trigger(onLose(bet));
          continue;
        }else{
          newBetArray.push(bet);
        }
      }else if(dice.getSum() == 2 || dice.getSum() == 3){
        $('window').trigger(onLose(bet));
        continue;
      }else if(dice.getSum() == 7 || dice.getSum() == 11){
        $('window').trigger(onWin(bet, _bet.value));
        if(bet.repeat){
          newBetArray.push(bet);
        }
      }else if(dice.getSum() == 12){
        newBetArray.push(bet);
      }else{
        bet.point = dice.getSum();
        newBetArray.push(bet);
      }
      break;
    case "comeOdds":
      if(dice.getSum() == bet.point){
        if(bet.point == 4 || bet.point == 10){
          $('window').trigger(onWin(bet, Math.floor(2*_bet.value + _bet.value)));
        } else if(bet.point == 5 || bet.point == 9){
          $('window').trigger(onWin(bet, Math.floor(3*_bet.value/2 + _bet.value)));
        } else if(bet.point == 6 || bet.point == 8){
          $('window').trigger(onWin(bet, Math.floor(6*_bet.value/5 + _bet.value)));
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "dontPass":
      if(point){
        if(dice.getSum() == point){
          $('window').trigger(onLose(bet));
          continue;
        }else if(dice.getSum() == 7){
          bet.point = false;
          $('window').trigger(onWin(bet, _bet.value));
          if(bet.repeat){
            newBetArray.push(bet);
          }
        }else{
          newBetArray.push(bet);
        }
      }else if(dice.getSum() == 2 || dice.getSum() == 3){
        $('window').trigger(onWin(bet, _bet.value));
        if(bet.repeat){
          newBetArray.push(bet);
        }
      }else if(dice.getSum() == 7 || dice.getSum() == 11){
        $('window').trigger(onLose(bet));
        _player.subFromBank(_bet.value);
        newBetArray.push(bet);
      }else{
        newBetArray.push(bet);
      }
      break;
    case "dontPassOdds":
      if(dice.getSum() == 7){
        if(point == 4 || point == 10){
          $('window').trigger(onWin(bet, Math.floor(_bet.value/2 + _bet.value)));
        } else if(point == 5 || point == 9){
          $('window').trigger(onWin(bet, Math.floor(2*_bet.value/3 + _bet.value)));
        } else if(point == 6 || point == 8){
          $('window').trigger(onWin(bet, Math.floor(5*_bet.value/6 + _bet.value)));
        }
      }else if(dice.getSum() == point){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "dontCome":
      if(bet.point){
        if(dice.getSum() == bet.point){
          $('window').trigger(onLose(bet));
          continue
        }else if(dice.getSum() == 7){
          $('window').trigger(onWin(bet, _bet.value));
          bet.point = false;
          if(bet.repeat){
            newBetArray.push(bet);
          }
        }else{
          newBetArray.push(bet);
        }
      }else if(dice.getSum() == 2 || dice.getSum() == 3){
        $('window').trigger(onWin(bet, _bet.value));
        if(bet.repeat){
          newBetArray.push(bet);
        }
      }else if(dice.getSum() == 7 || dice.getSum() == 11){
        $('window').trigger(onLose(bet));
        continue;
      }else if(dice.getSum() == 12){
        newBetArray.push(bet);
      }else{
        bet.point = dice.getSum();
        newBetArray.push(bet);
      }
      break;
    case "dontComeOdds":
      if(dice.getSum() == 7){
        if(bet.point == 4 || bet.point == 10){
          $('window').trigger(onWin(bet, Math.floor(_bet.value/2 + _bet.value)));
        }else if(bet.point == 5 || bet.point == 9){
          $('window').trigger(onWin(bet, Math.floor(2*_bet.value/3 + _bet.value)));
        }else if(bet.point == 6 || bet.point == 8){
          $('window').trigger(onWin(bet, Math.floor(5*_bet.value/6 + _bet.value)));
        }
      }else if(dice.getSum() == bet.point){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "place4":
      if(dice.getSum() == 4){
        $('window').trigger(onWin(bet, Math.floor(9*_bet.value/5)));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "place5":
      if(dice.getSum() == 5){
        $('window').trigger(onWin(bet, Math.floor(7*_bet.value/5)));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "place6":
      if(dice.getSum() == 6){
        $('window').trigger(onWin(bet, Math.floor(7*_bet.value/6)));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "place8":
      if(dice.getSum() == 8){
        $('window').trigger(onWin(bet, Math.floor(7*_bet.value/6)));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "place9":
      if(dice.getSum() == 9){
        $('window').trigger(onWin(bet, Math.floor(7*_bet.value/5)));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "place10":
      if(dice.getSum() == 10){
        $('window').trigger(onWin(bet, Math.floor(9*_bet.value/5)));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "hard4":
      if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else if(dice.getSum() == 4){
        if(dice.dice.getArray()[0] == dice.dice.getArray()[1]){
          $('window').trigger(onWin(bet, _bet.value*7));
          if(bet.repeat){
            newBetArray.push(bet);
          }else{
            _player.addToBank(_bet.value);
          }
        }else{
          $('window').trigger(onLose(bet));
          continue;
        }
      }else{
        newBetArray.push(bet);
      }
      break;
    case "hard6":
      if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else if(dice.getSum() == 6){
        if(dice.dice.getArray()[0] == dice.dice.getArray()[1]){
          $('window').trigger(onWin(bet, _bet.value*9));
          if(bet.repeat){
            newBetArray.push(bet);
          }else{
            _player.addToBank(_bet.value);
          }
        }else{
          $('window').trigger(onLose(bet));
          continue;
        }
      }else{
        newBetArray.push(bet);
      }
      break;
    case "hard8":
      if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else if(dice.getSum() == 8){
        if(dice.dice.getArray()[0] == dice.dice.getArray()[1]){
          $('window').trigger(onWin(bet, _bet.value*9));
          if(bet.repeat){
            newBetArray.push(bet);
          }else{
            _player.addToBank(_bet.value);
          }
        }else{
          $('window').trigger(onLose(bet));
          continue;
        }
      }else{
        newBetArray.push(bet);
      }
      break;
    case "hard10":
      if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else if(dice.getSum() == 10){
        if(dice.dice.getArray()[0] == dice.dice.getArray()[1]){
          $('window').trigger(onWin(bet, _bet.value*7));
          if(bet.repeat){
            newBetArray.push(bet);
          }else{
            _player.addToBank(_bet.value);
          }
        }else{
          $('window').trigger(onLose(bet));
          continue;
        }
      }else{
        newBetArray.push(bet);
      }
      break;
    case "field":
      if(dice.getSum() == 2 || dice.getSum() == 12){
        $('window').trigger(onWin(bet, 2*_bet.value));
      }else if(dice.getSum() == 3 || dice.getSum() == 4 || dice.getSum() == 9 ||
              dice.getSum() == 10 || dice.getSum() == 11){
        $('window').trigger(onWin(bet, _bet.value));
      }else{
        $('window').trigger(onLose(bet));
        continue;
      }
      if(bet.repeat){
        newBetArray.push(bet);
      }
      else {
        _player.addToBank(_bet.value);
      }
      break;
    case "cAndE":
      if(dice.getSum() == 2 || dice.getSum() == 3 || dice.getSum() == 12){
        $('window').trigger(onWin(bet, Math.floor(3*_bet.value - _bet.value/2)));
      }else if(dice.getSum() == 11){
        $('window').trigger(onWin(bet, Math.floor(7*_bet.value - _bet.value/2)));
      }else{
        $('window').trigger(onLose(bet));
        continue;
      }
      if(bet.repeat){
        newBetArray.push(bet);
      }
      else {
        _player.addToBank(_bet.value);
      }
      break;
    case "any7":
      if(dice.getSum() == 7){
        $('window').trigger(onWin(bet, 4*_bet.value));
      }else{
        $('window').trigger(onLose(bet));
        continue;
      }
      if(bet.repeat){
        newBetArray.push(bet);
      }
      else {
        _player.addToBank(_bet.value);
      }
      break;
    case "anyCraps":
      if(dice.getSum() == 2 || dice.getSum() == 3 || dice.getSum() == 12){
        $('window').trigger(onWin(bet, 7*_bet.value));
      }else{
        $('window').trigger(onLose(bet));
        continue;
      }
      if(bet.repeat){
        newBetArray.push(bet);
      }
      else {
        _player.addToBank(_bet.value);
      }
      break;
    case "horn":
      if(dice.getSum() == 2 || dice.getSum() == 12){
        $('window').trigger(onWin(bet, Math.floor(27*_bet.value/4)));
      }else if(dice.getSum() == 3 || dice.getSum() == 11){
        $('window').trigger(onWin(bet, 3*_bet.value));
      }else{
        $('window').trigger(onLose(bet));
        continue;
      }
      if(bet.repeat){
        newBetArray.push(bet);
      }else{
        _player.addToBank(_bet.value);
      }
      break;
    case "aceTwo":
      if(dice.getSum() == 3){
        $('window').trigger(onWin(bet, 15*_bet.value));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else{
        $('window').trigger(onLose(bet));
      }
      break;
    case "snakeEyes":
      if(dice.getSum() == 2){
        $('window').trigger(onWin(bet, 30*_bet.value));
        if(bet.repeat){
          newBetArray.push(bet);
        }
        else {
          _player.addToBank(_bet.value);
        }
      }else{
        $('window').trigger(onLose(bet));
      }
      break;
    case "midnight":
      if(dice.getSum() == 12){
        $('window').trigger(onWin(bet, 30*_bet.value));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else{
        $('window').trigger(onLose(bet));
      }
      break;
    case "yoleven":
      if(dice.getSum() == 11){
        $('window').trigger(onWin(bet, 15*_bet.value));
        if(bet.repeat){
          newBetArray.push(bet);
        }
        else {
          _player.addToBank(_bet.value);
        }
      }else{
        $('window').trigger(onLose(bet));
      }
      break;
    case "big6":
      if(dice.getSum() == 6){
        $('window').trigger(onWin(bet, _bet.value));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "big8":
      if(dice.getSum() == 8){
        $('window').trigger(onWin(bet, _bet.value));
        if(bet.repeat){
          newBetArray.push(bet);
        }else{
          _player.addToBank(_bet.value);
        }
      }else if(dice.getSum() == 7){
        $('window').trigger(onLose(bet));
        continue;
      }else{
        newBetArray.push(bet);
      }
      break;
    case "world":
      if(dice.getSum() == 2 || dice.getSum() == 12){
        $('window').trigger(onWin(bet, Math.floor(26*_bet.value/5)));
      }else if(dice.getSum() == 3 || dice.getSum() == 11){
        $('window').trigger(onWin(bet, Math.floor(11*_bet.value/5)));
      }else if(dice.getSum() == 7){
        $('window').trigger(onWin(bet, 0));
      }else{
        $('window').trigger(onLose(bet));
        continue;
      }
      if(bet.repeat){
        newBetArray.push(bet);
      }else{
        _player.addToBank(_bet.value);
      }
      break;
    case "fire":
      if(GameState.point > 0){
        if(dice.getSum() == 7){
          if(GameState.numFire < 4){
            $('window').trigger(onLose(bet));
          } else if(GameState.numFire == 4){
            $('window').trigger(onWin(bet, 24*_bet.value));
            if(bet.repeat){
              newBetArray.push(bet);
            }else{
              _player.addToBank(_bet.value);
            }
          } else if(GameState.numFire == 5){
            $('window').trigger(onWin(bet, 249*_bet.value));
            if(bet.repeat){
              newBetArray.push(bet);
            }else{
              _player.addToBank(_bet.value);
            }
          } else if(GameState.numFire == 6){
            $('window').trigger(onWin(bet, 999*_bet.value));
            if(bet.repeat){
              newBetArray.push(bet);
            }else{
              _player.addToBank(_bet.value);
            }
          }
        } else {
          newBetArray.push(bet);
        }
      } else {
        newBetArray.push(bet);
      }
      break;
    default:
            $('window').trigger(onLose(bet));
      continue;
    }
  }
  return newBetArray;
}

function diceToNum(dice){
  var diceArray = dice.getDiceAsArray();
  return diceArray;
}

function revalidate(bet, amount){
  var _bet = bet.bet;
  
  if(bet.origBet){
    var _origBet = bet.origBet.bet;
  }
  
  if(amount < _CRAPS['minBet']){
    if(['passline', 
        'passlineOdds',
        'come',
        'comeOdds',
        'dontPass',
        'dontPassOdds',
        'dontCome',
        'dontComeOdds',
        'place4',
        'place5',
        'place6',
        'place8',
        'place9',
        'place10',
        'field',
        'big6',
        'big8'].indexOf(bet.type) != -1){
      return [3, function(){alert('Bet amount must be bigger than the Table Minimum. Bet has not been changed.');}];
    }
  }
  if(amount > _CRAPS['maxBet']){
    return [3, function(){alert('Bet amount must be smaller than the Table Maximum. Bet has not been changed.');}];
  }
  if(amount % 1 != 0){
    return [3, function(){alert('Bet must be an integer. Bet has not been changed.');}];
  }
  
  switch(bet.type){
  case "passline":
    if(GameState.point){
      return [3, function(){alert('Cannot adjust a Pass Line bet while there is a point on. Bet has not been changed.');}];
    }
    return [1, '']
  case "passlineOdds":
    if(GameState.point == 4 || GameState.point == 10){
      return [(amount <= 3 * _origBet.value) ? 1 : 0, function(){alert('Bet must be 3 times the Pass Line bet or less. Bet has not been changed.');}];
    }
    else if(GameState.point == 5 || GameState.point == 9){
      if(amount <= 4 * _origBet.value){
        return [(amount % 2 == 0) ? 1 : 2, function(){alert('Bet value should be even and 4 times the Pass Line bet or less. Consider adjusting.');}];
      } else {
        return [0, function(){alert('Bet value must be 4 times the Pass Line bet or less. Bet has not been changed.');}];
      }
    }
    else if(GameState.point == 6 || GameState.point == 8){
      if(amount <= 5 * _origBet.value){
        return [(amount % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
      } else {
        return [0, function(){alert('Bet value must be 5 times the Pass Line bet or less. Bet has not been changed.');}];
      }
    }
  case "come":
    if(bet.point){
      return [3, function(){alert('Cannot adjust a Come bet while there is a point on. Bet has not been changed.');}];
    }
    return [1, '']
  case "comeOdds":
    if(bet.origBet.point == 4 || bet.origBet.point == 10){
      return [(amount <= 3 * _origBet.value) ? 1 : 0, function(){alert('Bet value must be 3 times the Come Line bet or less. Bet has not been changed.');}];
    }
    else if(bet.origBet.point == 5 || bet.origBet.point == 9){
      if (amount <= 4 * _origBet.value){
        return [(amount % 2 == 0) ? 1 : 2, function(){alert('Bet value should be even. Consider adjusting.');}];
      } else {
        return [0 , function(){alert('Bet value must be 4 times the Come Line bet or less. Bet has not been changed.');}];
      }
    }
    else if(bet.origBet.point == 6 || bet.origBet.point == 8){
      if(amount <= 5 * _origBet.value){
        return [(amount % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
      } else {
        return [0 , function(){alert('Bet value must be 5 times the Come Line bet or less. Bet has not been changed.');}];
      }
    }
  case "dontPass":
    if(GameState.point){
      return [3, function(){alert('Cannot adjust a Don\'t Pass Line bet while there is a point on. Bet has not been changed.');}];
    }
    return [1, ''];
  case "dontPassOdds":
    if(GameState == null){
      return[0, function(){alert('There must be a Don\' Pass Line Bet on the table.');}];
    }
    if(!GameState.point){
      return[0, function(){alert('The associated Don\'t Pass bet must have a point on. Bet has not been changed');}];
    }
    if(GameState.point == 4 || GameState.point == 10){
      if(amount <= 6 * _origBet.value){
        return [(amount % 2 == 0) ? 1 : 2, function(){alert('Bet should be even. Consider adjusting.');}];
      } else {
        return [0, function(){alert('Bet must be 6 times the Don\'t Pass Line bet or less. Bet has not been changed.');}];
      }
    }
    else if(GameState.point == 5 || GameState.point == 9){
      if(amount <= 8 * _origBet.value){
        return [(amount % 3 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 3. Consider adjusting.');}];
      } else {
        return [0 , function(){alert('Bet value must 8 times the Don\'t Pass Line bet or less. Bet has not been changed.');}];
      }
    }
    else if(GameState.point == 6 || GameState.point == 8){
      if(amount <= 10 * _origBet.value){
      return [(amount % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
      } else {
        return [0 , function(){alert('Bet value must be 10 times the Don\'t Pass Line bet or less. Bet has not been changed.');}];
      }
    }
  case "dontCome":
    if(bet.point){
      return [3, function(){alert('Cannot adjust a Don\'t Come bet while there is a point on. Bet has not been changed.');}];
    }
    return [1, ''];
  case "dontComeOdds":
    if(bet.origBet == null){
      return[0, function(){alert('There must be a Don\'t Come Bet on the table.');}];
    }
    if(bet.origBet.point == 4 || bet.origBet.point == 10){
      if(amount <= 6 * _origBet.value){
        return [(amount % 2 == 0) ? 1 : 2, function(){alert('Bet should be even. Consider adjusting.');}];
      } else {
        return [0, function(){alert('Bet must be 6 times the Don\'t Come bet or less. Bet has not been changed.');}];
      }
    }
    else if(bet.origBet.point == 5 || bet.origBet.point == 9){
      if(amount <= 8 * _origBet.value){
        return [(amount % 3 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 3. Consider adjusting.');}];
      } else {
        return [0 , function(){alert('Bet value must 8 times the Don\'t Come bet or less. Bet has not been changed.');}];
      }
    }
    else if(bet.origBet.point == 6 || bet.origBet.point == 8){
      if(amount <= 10 * _origBet.value){
      return [(amount % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
      } else {
        return [0 , function(){alert('Bet value must be 10 times the Don\'t Come bet or less. Bet has not been changed.');}];
      }
    }
  case "place4":
    return [(amount % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
  case "place5":
    return [(amount % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
  case "place6":
    return [(amount % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
  case "place8":
    return [(amount % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
  case "place9":
    return [(amount % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
  case "place10":
    return [(amount % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
  case "hard4":
    return [1, ''];
  case "hard6":
    return [1, ''];
  case "hard8":
    return [1, ''];
  case "hard10":
    return [1, ''];
  case "field":
    return [1, ''];
  case "cAndE":
    return [(amount % 2 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 2. Consider adjusting.');}];
  case "any7":
    return [(amount % 3 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 3. Consider adjusting.');}];
  case "anyCraps":
    return [1, ''];
  case "horn":
    return [(amount % 4 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 4. Consider adjusting.');}];
  case "aceTwo":
    return [1, ''];
  case "snakeEyes":
    return [1, ''];
  case "midnight":
    return [1, ''];
  case "yoleven":
    return [1, ''];
  case "big6":
    return [1, ''];
  case "big8":
    return [1, ''];
  case "world":
    return [(amount % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
  case "fire":
    if(_bet.value > 10){
      return [0, function(){alert('Maximum Fire bet is $10. Bet has not been placed.');}];
    }
    return [1, ''];
  default:
    return;
  }
}
