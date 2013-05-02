function makeDie(sides){
  sides = (typeof sides == 'undefined') ? 6 : sides;

  return {
    value: false,
    roll: function(){
      this.value = UTILS.getRandomNumber(sides);
      return this.value;
    },
    validate: function(){
      if( (this.value < 1) || (this.value > sides) ){
        return false;
      }
      return true;
    }
  };
}

var roller = null;

function makeDice(n){
  count = (typeof n == 'undefined') ? 2 : n;

  var d = [];
  for(var i=0; i<count; i++){
    d.push(makeDie(6));
  }

  return {
    dice: d,
    total: 0,
    roll: function(callback){
      //_CRAPS.output("Rolling...");
      self = this;
      roller = setInterval(function(){
        _dice = self.dice;
        _total = self.total;
        _total = 0;
        for(var i in _dice){_total += _dice[i].roll();}
        draw(Board);
        }, 200);
      setTimeout(function(){
        _total = 0;
        for(var i in _dice){_total += _dice[i].roll();}
        draw(Board);
        clearInterval(roller);
        roller = null;
        callback(_total);
      }, DICE_ROLL);
    },
    validate: function(){
      for(var i in this.dice){
        if(!this.dice[i].validate()){
          return false;
        }
      }
      return true;
    },
    getArray: function(){
      var a = [];
      for(var i in this.dice){
        a.push(this.dice[i].value);
      }
      return a;
    }
  };
}
