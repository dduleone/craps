/* I'm wondering if we shouldn't have:
1) Die
2) Dice (n number of Die)
3) CrapsDice (Dice with properties convenient for Craps)
4) PointOnCrapsDice (Dice with properties which determine winstate/losestate when the point is on.)
5) PointOffCrapsDice (Dice with properties which determine winstate/losestate when the point is off.)
*/

var CrapsDice = function(){
  return {
    dice: makeDice(2),
    getSum: function(){
      return this.dice.total;
    },
    roll: function(){
      return this.dice.roll();
    },
    validate: function(){
      return this.dice.validate();
    },
    isCraps: function(){
      switch(this.dice.total){
        case 2:
        case 3:
        case 12:
          return true;
        break;
        default:
        break;
      }
      return false;
    },
    isComeOutWinner: function(){
      switch(this.dice.total){
        case 7:
        case 11:
          return true;
        break;
        default:
        break;
      }
      return false;
    },
    getDiceAsArray: function(){
      return this.dice.getArray();
    }
  };
}