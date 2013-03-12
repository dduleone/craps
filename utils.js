var UTILS = {};

$.extend(UTILS, {
	getRandomNumber: function(n){
		n = (typeof n == 'undefined') ? 6 : n;
		return Math.floor(Math.random() * n) + 1;
	}
});