
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


function makeDice(n){
	count = (typeof n == 'undefined') ? 2 : n;

	var d = [];
	for(var i=0; i<count; i++){
		d.push(makeDie(6));
	}

	return {
		dice: d,
		total: 0,
		roll: function(){
			_CRAPS.output("Rolling...");
			this.total = 0;
			for(var i in this.dice){
				var roll = this.dice[i].roll();
				_CRAPS.output("Die #" + i + ": " + roll);
				this.total += roll;
			}
			return this.total;
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