/*
crapsBets.js
*/

var CrapsBet = function(betType, value, player, repeat, attachedBet){
  var $bet = this;
  $bet.type = betType;
  $bet.bet = new Bet(value, player);
  $bet.origBet = null;
  $bet.point = false;
  if(betType == 'passline'){
    repeat = true;
  }
  $bet.repeat = repeat;
  if(betType == 'passlineOdds' || betType == 'dontPassOdds' || betType == 'comeOdds' || betType == 'dontComeOdds'){
    $bet.origBet = attachedBet;
  }
  
  if(betType == 'comeOdds' || betType == 'dontComeOdds'){
    $bet.point = attachedBet.point;
  }
  
  $bet.toString = function(){
    str =  "Bet Type: " + $bet.type + " Value: $" + $bet.bet.value + " Repeat: " + $bet.repeat;
    if($bet.type == 'passlineOdds' || $bet.type == 'dontPassOdds' || $bet.type == 'comeOdds' || $bet.type == 'dontComeOdds'){
      if($bet.origBet == null){
        str = str + " (Original Bet): {null}";
      } else {
        str = str + " (Original Bet): {" + $bet.origBet.toString() + "}";
      }
    }
    if($bet.type == 'come' || $bet.type == 'dontCome'){
      if($bet.point == null){
        str = str + " Bet Point: null";
      } else {
        str = str + " Bet Point: " + $bet.point;
      }
    }
    return str;
  }
}