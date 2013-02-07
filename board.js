var DrawCanvas = function(board, l, t, w, h, c){
	//var _h = 1024, _w = 768;
	var _h = h, _w = w;
	var _l = l, _r = _w;
	var _t = t, _b = _h;

	var colors = c;

	return {
		tmpContext: {},
		preserveContext: function(){
			for(var i in board){
				this.tmpContext[i] = board[i];
			}
		},
		restoreContext: function(){
			for(var i in this.tmpContext){
				board[i] = this.tmpContext[i];
			}
		},
		buildPoints: function(n, i){
			var _u = i/n;
			var _d = (n-i)/n;
			var _T = _b * _u;
			var _L = _r * _u;
			var _R = _r * _d;
			var _B = _b * _d;
			var p = {
				u: _u,
				d: _d,
				t: _t,
				l: _l,
				r: _r,
				b: _b,
				T: _T,
				L: _L,
				R: _R,
				B: _B
			};
			//console.log(p);
			return p;
		},
		line: function(x, y, w, h){
			board.moveTo(x, y);
			board.lineTo(w, h);
			board.stroke();
		},
		fillRect: function(x, y, w, h, color){
			board.fillStyle = color;
			board.fillRect(x, y, w, h);
		},
		strokeRect: function(x, y, w, h, etc){
			// Assumes etc.t is type int.

			etc = $.extend({
				color: '#000',
				t: 1 // thickness
			}, etc);

			this.preserveContext();
			board.lineWidth = etc.t;
			board.strokeStyle = etc.color;
			board.strokeRect(x, y, w, h);
			this.restoreContext();
		},
		fullGrid: function(n){
			for(var j = 0; j <= n; j++){
				var p = this.buildPoints(n,j);
				this.grid(n, j, p);
			}
		},
		grid: function(n, i, p){
			this.line(p.L, p.t, p.L, p.b);
			this.line(p.l, p.T, p.r, p.T);
		},
		fullStar: function(n){
			for(var j = 0; j <= n; j++){
				var p = this.buildPoints(n,j);
				this.star(n, j, p);
			}
		},
		star: function(n, i, p){
			this.line(p.L, p.t, p.R, p.b);
			this.line(p.l, p.T, p.r, p.B);
		},
		fullDiagGrid: function(n){
			for(var j = 0; j <= n; j++){
				var p = this.buildPoints(n,j);
				this.diagGrid(n, j, p);
			}
		},
		diagGrid: function(n, i, p){
			this.line(p.l, p.T, p.L, p.t); // Congruent: this.line(_l, _B, _R, _t);
			this.line(p.L, p.b, p.r, p.T); // Congruent: this.line(_R, _b, _r, _B); this.line(_r, _T, _L, _b);
			this.line(p.L, p.t, p.r, p.B); // Congruent: this.line(_R, _t, _r, _T);
			this.line(p.R, p.b, p.l, p.T); // Congruent: this.line(_L, _b, _l, _B);
		},
		fullConcaveArcs: function(n){
			for(var j = 0; j <= n; j++){
				var p = this.buildPoints(n,j);
				this.concaveArcs(n, j, p);
			}
		},
		concaveArcs: function(n, i, p){
			this.line(p.l, p.T, p.R, p.t); // Top Left | Congruent: this.line(_l, _B, _L, _t); this.line(_L, _t, _l, _B);
			this.line(p.R, p.t, p.r, p.B); // Top Right | Congruent: this.line(_L, _t, _r, _T);
			this.line(p.L, p.b, p.l, p.T); // Bottom Left | Congruent: this.line(_R, _b, _l, _B);
			this.line(p.r, p.B, p.L, p.b); // Bottom Right | Congruent: this.line(_r, _T, _R, _b); this.line(_R, _b, _r, _T); this.line(_L, _b, _r, _B);
		},
		fullPyramid: function(n){
			for(var j = 0; j <= n; j++){
				var p = this.buildPoints(n,j);
				this.pyramid(n, j, p);
			}
		},
		pyramid: function(n, i, p){
			this.line(p.r, p.t, p.L, p.T);
			this.line(p.l, p.t, p.R, p.T);
			this.line(p.r, p.b, p.L, p.B);
			this.line(p.l, p.b, p.R, p.B);
		},
		fullFromCorners: function(n){
			for(var j = 0; j <= n; j++){
				var p = this.buildPoints(n,j);
				this.fromCorners(n, j, p);
			}
		},
		fromCorners: function(n, i, p){
			this.line(p.l, p.t, p.r, p.T); // Top Left Top
			this.line(p.l, p.t, p.L, p.b); // Top Left Bottom
			this.line(p.r, p.t, p.l, p.T); // Top Right Top
			this.line(p.r, p.t, p.L, p.b); // Top Right Bottom
			this.line(p.l, p.b, p.L, p.t); // Bottm Left Top
			this.line(p.l, p.b, p.r, p.T); // Bottom Left Bottom
			this.line(p.r, p.b, p.L, p.t); // Bottom Right Top
			this.line(p.r, p.b, p.l, p.T); // Bottom Right Bottom
		},
		demo: function(n){
			for(var i = 0; i <= n; i++){
				var p = this.buildPoints(n, i);
				this.grid(n, i, p);
				this.star(n, i, p);
				this.diagGrid(n, i, p);
				this.concaveArcs(n, i, p);
				// FIGURE THIS OUT? this.convexArcs
				this.pyramid(n, i, p);
				//this.fromCorners(n, i, p);
			}
			//this.fullGrid(n);
			//this.fullStar(n);
			//this.fullDiagGrid(n);
			//this.fullConcaveArcs(n);
			// FIGURE THIS OUT? this.fullConvexArcs(n);
			//this.fullPyramid(n);
			//this.fullFromCorners(n);
		},
		resetBoard: function(){
			board.clearRect(_l, _t, _w, _h);
			d.fillRect(_l, _t, _w, _h, colors.board);
			d.strokeRect(_l, _t, _w, _h, {color: colors.black, t: 25});
		}
	}
}