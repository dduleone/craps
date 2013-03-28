/*
craps.js
*/

function onWin(bet, amount){
  var _bet = bet.bet;
  var _player = _bet.player.player;
  
  _CRAPS.dealer.betManager.winningBetIds.push(_bet.betId);
  _CRAPS.output("Bet " + bet.type + " wins! Pays out $" + amount);
  _player.addToBank(amount);
}

function onLose(bet){
  var _bet = bet.bet;
    _CRAPS.dealer.betManager.losingBetIds.push(_bet.betId);
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
  placeBet: function(bet) {
    this.bets.push(bet);
    this.displayBets();
  },
  checkBets: function(dice){
    this.bets = BetChecker(GameState.point, this.bets, _CRAPS.dice);
    if(this.winningBetIds.length > 0 || this.losingBetIds.length > 0){
      this.animateBets();
    }
  },
  removeBet: function(betId){
    var _bets = this.bets
    var newBetArray = [];
    for(x in _bets){
      if(betId != _bets[x].bet.betId){
        newBetArray.push(_bets[x]);
      } else {
        _bets[x].bet.player.player.addToBank(_bets[x].bet.value);
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
      if(['passline', 'passlineOdds', 'come', 'comeOdds', 'dontPass', 'dontPassOdds', 'dontCome', 'dontComeOdds'].indexOf(this.bets[i].type) == -1){
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
    
    if(bet.origBet){
      var _origBet = bet.origBet.bet;
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
          return [(_bet.value % 2 == 0) ? 1 : 2, function(){alert('Bet value should be even and 4 times the Pass Line bet or less. Consider adjusting.');}];
        } else {
          return [0, function(){alert('Bet value must be 4 times the Pass Line bet or less. Bet has not been placed.');}];
        }
      }
      else if(GameState.point == 6 || GameState.point == 8){
        if(_bet.value <= 5 * _origBet.value){
          return [(_bet.value % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
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
          return [(_bet.value % 2 == 0) ? 1 : 2, function(){alert('Bet value should be even. Consider adjusting.');}];
        } else {
          return [0 , function(){alert('Bet value must be 4 times the Come Line bet or less. Bet has not been placed.');}];
        }
      }
      else if(bet.origBet.point == 6 || bet.origBet.point == 8){
        if(_bet.value <= 5 * _origBet.value){
          return [(_bet.value % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
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
          return [(_bet.value % 2 == 0) ? 1 : 2, function(){alert('Bet should be even. Consider adjusting.');}];
        } else {
          return [0, function(){alert('Bet must be 6 times the Don\'t Pass Line bet or less. Bet has not been placed.');}];
        }
      }
      else if(GameState.point == 5 || GameState.point == 9){
        if(_bet.value <= 8 * _origBet.value){
          return [(_bet.value % 3 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 3. Consider adjusting.');}];
        } else {
          return [0 , function(){alert('Bet value must 8 times the Don\'t Pass Line bet or less. Bet has not been placed.');}];
        }
      }
      else if(GameState.point == 6 || GameState.point == 8){
        if(_bet.value <= 10 * _origBet.value){
        return [(_bet.value % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
        } else {
          return [0 , function(){alert('Bet value must be 10 times the Don\'t Pass Line bet or less. Bet has not been placed.');}];
        }
      }
    case "dontCome":
      return [1, ''];
    case "dontComeOdds":
      if(bet.origBet == null){
        return[0, function(){alert('There must be a Don\'t Pass Line Bet on the table.');}];
      }
      if(bet.origBet.point == 4 || bet.origBet.point == 10){
        if(_bet.value <= 6 * _origBet.value){
          return [(_bet.value % 2 == 0) ? 1 : 2, function(){alert('Bet should be even. Consider adjusting.');}];
        } else {
          return [0, function(){alert('Bet must be 6 times the Don\'t Come bet or less. Bet has not been placed.');}];
        }
      }
      else if(bet.origBet.point == 5 || bet.origBet.point == 9){
        if(_bet.value <= 8 * _origBet.value){
          return [(_bet.value % 3 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 3. Consider adjusting.');}];
        } else {
          return [0 , function(){alert('Bet value must 8 times the Don\'t Come bet or less. Bet has not been placed.');}];
        }
      }
      else if(bet.origBet.point == 6 || bet.origBet.point == 8){
        if(_bet.value <= 10 * _origBet.value){
        return [(_bet.value % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
        } else {
          return [0 , function(){alert('Bet value must be 10 times the Don\'t Come bet or less. Bet has not been placed.');}];
        }
      }
    case "place4":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
    case "place5":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
    case "place6":
      return [(_bet.value % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
    case "place8":
      return [(_bet.value % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
    case "place9":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
    case "place10":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
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
      return [(_bet.value % 2 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 2. Consider adjusting.');}];
    case "any7":
      return [(_bet.value % 3 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 3. Consider adjusting.');}];
    case "anyCraps":
      return [1, ''];
    case "horn":
      return [(_bet.value % 4 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 4. Consider adjusting.');}];
    case "aceTwo":
      return [1, ''];
    case "snakeEyes":
      return [1, ''];
    case "midnight":
      return [1, ''];
    case "yoleven":
      return [1, ''];
    case "big6":
      return [(_bet.value % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
    case "big8":
      return [(_bet.value % 6 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 6. Consider adjusting.');}];
    case "world":
      return [(_bet.value % 5 == 0) ? 1 : 2, function(){alert('Bet value should be divisible by 5. Consider adjusting.');}];
    default:
      return;
    }
  },
  displayBets: function(){
    var betListing = $('#betListing');
    //betListing.css({top: '71%', left: '22%'});
    if(betListing.children().length > 0){
      betListing.empty();
    }
    var betTable = $(document.createElement('table'));
    var headers = $(document.createElement('tr'));
    headers.append($(document.createElement('th')).html('Id'))
    headers.append($(document.createElement('th')).html('Type'))
           .append($(document.createElement('th')).html('Value'))
           .append($(document.createElement('th')).html('On?'))
           .append($(document.createElement('th')).html('Repeat?'))
           .append($(document.createElement('th')).html('Point'))
           .append($(document.createElement('th')).html('Orig'))
           .append($(document.createElement('th')).html('    '));
    betTable.append(headers);
    betListing.append(betTable);

    for(var betNum in this.bets){
      var newBetRow = $(document.createElement('tr'));
      newBetRow.css('backgroundColor', (betNum%2)?'#c0c0c0':'#fff');
      newBetRow.attr('id', 'bet' + this.bets[betNum].bet.betId);
      //newBetRow.css({float: 'left', left: '0px'});
      var id = $(document.createElement('td'));
      id.html(this.bets[betNum].bet.betId);
      
      var type = $(document.createElement('td'));
      type.html(nameToPretty(this.bets[betNum].type));
      
      var val = $(document.createElement('td'));
      val.html('$' + this.bets[betNum].bet.value);
      
      var betOn = $(document.createElement('input'));
      //betOnLabel.html('<br />Bet On: ');
      var on = $(document.createElement('td'));
      betOn.attr('type', 'checkbox');
      betOn.attr('checked', this.bets[betNum].bet.on);
      betOn.attr('id', 'on' + this.bets[betNum].bet.betId);
      betOn.attr('betNum', this.bets[betNum].bet.betId);
      var toggleBet = function(e){
        var betNumber = $($(this)[0]).attr("betNum");
        _CRAPS.dealer.betManager.bets[betNumber].bet.on = $(this).is(':checked');
      }
      betOn.change(toggleBet);
      on.append(betOn);
      
      var repeat = $(document.createElement('td'));
      var repeatWin = $(document.createElement('input'));
      repeatWin.attr('type', 'checkbox');
      repeatWin.attr('checked', this.bets[betNum].repeat);
      repeatWin.attr('id', 'rep' + this.bets[betNum].bet.betId);
      repeatWin.attr('betNum', this.bets[betNum].bet.betId);
      var toggleRepeat = function(e){
        var betNumber = $($(this)[0]).attr("betNum");
        _CRAPS.dealer.betManager.bets[betNumber].repeat = $(this).is(':checked');
      }
      repeatWin.change(toggleRepeat);
      repeat.append(repeatWin);
      
      var point = $(document.createElement('td'));
      if(['come', 'dontCome'].indexOf(this.bets[betNum].type) != -1){
        point.html(this.bets[betNum].point);
      } else {
        point.html('   ');
      }
      
      var orig = $(document.createElement('td'));
      if(['passlineOdds', 'comeOdds', 'dontPassOdds', 'dontComeOdds'].indexOf(this.bets[betNum].type) != -1){
        orig.html(this.bets[betNum].origBet.bet.betId);
      } else {
        orig.html('   ');
      }
      
      var button = $(document.createElement('td'));
      button.html('Rem');
      button.attr({class: 'bttn red'});
      if(this.bets[betNum].type == 'passline'){
        if(GameState.point > 0){
          button.attr('onclick', 'alert("You cannot take down a Pass Line bet when a point is on.")');
          button.attr('disabled', 'true');
        }else{
          button.attr('onclick', '_CRAPS.dealer.betManager.removeBet(' + this.bets[betNum].bet.betId + ')');
        }
      }
      if(this.bets[betNum].type == 'come'){
        if(this.bets[betNum].point > 0){
          button.attr('onclick', 'alert("You cannot take down a Come bet when it has a point.")');
          button.attr('disabled', 'true');
        }else{
          button.attr('onclick', '_CRAPS.dealer.betManager.removeBet(' + this.bets[betNum].bet.betId + ')');
        }
      }else{
        button.attr('onclick', '_CRAPS.dealer.betManager.removeBet(' + this.bets[betNum].bet.betId + ')');
      }
      //pTag.append(button);
      //newBetRow.append(legend);
      betTable.append(newBetRow);
      newBetRow.append(id);
      newBetRow.append(type);
      newBetRow.append(val);
      newBetRow.append(on);
      newBetRow.append(repeat);
      newBetRow.append(point);
      newBetRow.append(orig);
      newBetRow.append(button);
    }
  },
  animateBets: function(){
    for(x in this.winningBetIds){
      $('#bet' + this.winningBetIds[x]).attr('class', 'winningBet');
    }
    for(x in this.losingBetIds){
      $('#bet' + this.losingBetIds[x]).attr('class', 'losingBet');
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

var _CRAPS = {};

var GameState = {
  pointOn: false,
  point: 0
};

$.extend(_CRAPS, {
  debug: function(msg){
    console.log(msg);
  },
  output: function(msg){
    var buffer = document.getElementById("buffer");
    $(buffer).append("<span>" + msg + "</span><br />\n");
    buffer.scrollTop = buffer.scrollHeight;
  },
  dealer: new Dealer(),
  minBet: 10,
  maxBet: 10000,
  placeBet: function(bet){
    betResponse = this.dealer.betManager.validateBet(bet);
    if(betResponse[0] > 0){
      this.dealer.betManager.placeBet(bet);
      if(betResponse[0] == 2){
        betResponse[1]();
      }
      //draw(Board);
    }
    else{
      if(!isNaN(bet.bet.value)){
        bet.bet.player.player.addToBank(bet.bet.value);
      }
      betResponse[1]();
    }
  },
  checkBets: function(){
    this.dealer.betManager.checkBets(_CRAPS.dice);
  },
  dice: null,
  point: false,
  pointOn: function(dice){
    if (dice.validate() && !dice.isCraps() && !dice.isComeOutWinner()){
      GameState.point = dice.getSum();
      _CRAPS.output("Setting point: " + dice.getSum());
    }
  },
  pointOff: function(){
    _CRAPS.output("Killing point: " + this.point);
    GameState.point = false;
  },
  roll: function(){
  // Roll the dice.
    //_CRAPS.output("Before Roll - The point is: " + GameState.point);
    var roll = _CRAPS.dice.roll();
    var diceArray = diceToNum(_CRAPS.dice);
    _CRAPS.output("---Rolling--- " + diceArray[0] + " " + diceArray[1] + " = " + (diceArray[0] + diceArray[1]));
    //_CRAPS.output("The roll is: <b><font size='15'>" + roll + "</font></b>");
    _CRAPS.checkBets();
    PlayerManager.updatePlayerArea();
  // Set & unset the point, as appropriate.
    if (GameState.point > 0){
      if (roll == 7){
        GameState.point = false;
        _CRAPS.output("Seven Out! Pay all Don't Come and Don't Pass! All other bets lose.");
        // Resolve Bets.
        return;
      }

      if (roll == GameState.point){
        GameState.point = false;
        _CRAPS.output("Shooter made the point!");
        _CRAPS.output("All Pass Line bets win!");
        _CRAPS.output("All Single- and Multi-roll bets are off!");
        this.dealer.betManager.turnBetsOff();
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
      this.dealer.betManager.turnBetsOn();
      GameState.point = roll;
    }
    //_CRAPS.output("After Roll - The point is: " + GameState.point);
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
    var _player = _bet.player.player;

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
      }else if(dice.getSum() == 7 || dice.getSum == 11){
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
      }else if(dice.getSum() == point){
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
      }if(bet.repeat){
        newBetArray.push(bet);
      }else{
        _player.addToBank(_bet.value);
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

