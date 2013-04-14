/*
bets.js
*/

var nextBetId = 1;

var Bet = function(wager, player){
  var bet = this;
  
  bet.value = wager;
  
  bet.player = player;
  
  bet.on = true;
  
  bet.betId = nextBetId;
  
  nextBetId++;
}