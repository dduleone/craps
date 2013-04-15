/*
bets.js
*/

var nextBetId = 1;

var Bet = function(wager, playerId){
  var bet = this;
  
  bet.value = wager;
  
  bet.playerId = playerId;
  
  bet.on = true;
  
  bet.betId = nextBetId;
  
  nextBetId++;
}