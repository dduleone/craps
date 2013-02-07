function getRandomNumber(n){
	n = (typeof n == 'undefined') ? 6 : n;
	return Math.floor(Math.random() * n) + 1;
}