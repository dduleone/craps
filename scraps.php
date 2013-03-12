<?php 
/*
			function gogogo(){
				window.timer = setInterval(drawit, 100);
				console.log(window.timer);
			}


			var drawit = function(q){
				if(typeof q != 'undefined'){
					this.i = 0;
					return;
				}

				if(typeof this.i == 'undefined'){
					this.i = 0;
				}

				this.i++;
				console.log(this.i);
				this.n = 36;
				var p = d.buildPoints(this.n, this.i);
				d.grid(this.n, this.i, p);
				d.star(this.n, this.i, p);
				//d.diagGrid(this.n, this.i, p);
				d.pyramid(this.n, this.i, p);
				d.concaveArcs(n, i, p);
				if(this.i>=this.n){
					clearInterval(window.timer);
					setTimeout(d.resetBoard, 1000);
					//gogogo('reset');
					//setTimeout(gogogo, 500);
				}
			}
	*/
			//setInterval(gogogo, 5000);

/*
			d.line(_r* 1/12, _t, _r* 1/12, _b);
			d.line(_r* 2/12, _t, _r* 2/12, _b);
			d.line(_r* 3/12, _t, _r* 3/12, _b);
			d.line(_r* 4/12, _t, _r* 4/12, _b);
			d.line(_r* 5/12, _t, _r* 5/12, _b);
			d.line(_r* 6/12, _t, _r* 6/12, _b);
			d.line(_r* 7/12, _t, _r* 7/12, _b);
			d.line(_r* 8/12, _t, _r* 8/12, _b);
			d.line(_r* 9/12, _t, _r* 9/12, _b);
			d.line(_r*10/12, _t, _r*10/12, _b);
			d.line(_r*11/12, _t, _r*11/12, _b);

			d.line(_l, _b* 1/12, _r, _b* 1/12);
			d.line(_l, _b* 2/12, _r, _b* 2/12);
			d.line(_l, _b* 3/12, _r, _b* 3/12);
			d.line(_l, _b* 4/12, _r, _b* 4/12);
			d.line(_l, _b* 5/12, _r, _b* 5/12);			
			d.line(_l, _b* 6/12, _r, _b* 6/12);
			d.line(_l, _b* 7/12, _r, _b* 7/12);
			d.line(_l, _b* 8/12, _r, _b* 8/12);
			d.line(_l, _b* 9/12, _r, _b* 9/12);
			d.line(_l, _b*10/12, _r, _b*10/12);
			d.line(_l, _b*11/12, _r, _b*11/12);

			d.line(_r* 0/12, _t, _r*12/12, _b);
			d.line(_r* 1/12, _t, _r*11/12, _b);
			d.line(_r* 2/12, _t, _r*10/12, _b);
			d.line(_r* 3/12, _t, _r* 9/12, _b);
			d.line(_r* 4/12, _t, _r* 8/12, _b);
			d.line(_r* 5/12, _t, _r* 7/12, _b);
			d.line(_r* 6/12, _t, _r* 6/12, _b);
			d.line(_r* 7/12, _t, _r* 5/12, _b);
			d.line(_r* 8/12, _t, _r* 4/12, _b);
			d.line(_r* 9/12, _t, _r* 3/12, _b);
			d.line(_r*10/12, _t, _r* 2/12, _b);
			d.line(_r*11/12, _t, _r* 1/12, _b);
			d.line(_r*12/12, _t, _r* 0/12, _b);

			d.line(_l, _b* 0/12, _r, _b*12/12);
			d.line(_l, _b* 1/12, _r, _b*11/12);
			d.line(_l, _b* 2/12, _r, _b*10/12);
			d.line(_l, _b* 3/12, _r, _b* 9/12);
			d.line(_l, _b* 4/12, _r, _b* 8/12);
			d.line(_l, _b* 5/12, _r, _b* 7/12);			
			d.line(_l, _b* 6/12, _r, _b* 6/12);
			d.line(_l, _b* 7/12, _r, _b* 5/12);
			d.line(_l, _b* 8/12, _r, _b* 4/12);
			d.line(_l, _b* 9/12, _r, _b* 3/12);
			d.line(_l, _b*10/12, _r, _b* 2/12);
			d.line(_l, _b*11/12, _r, _b* 1/12);
			d.line(_l, _b*12/12, _r, _b* 0/12);
*/			
/*
			d.line(_l, _t, _r, _b);
			d.line(_l, _b, _r, _t);
			d.line(_r*1/2, _t, _r*1/2, _b);
			d.line(_l, _b*1/2, _r, _b*1/2);
			d.line(_l, _b*1/4, _r, _b*3/4);
			d.line(_l, _b*3/4, _r, _b*1/4);
			d.line(_r*1/4, _t, _r*3/4, _b);
			d.line(_r*3/4, _t, _r*1/4, _b);

			d.line(_r*1/6, _t, _r*5/6, _b);
			d.line(_r*2/6, _t, _r*4/6, _b);
			d.line(_r*4/6, _t, _r*2/6, _b);
			d.line(_r*5/6, _t, _r*1/6, _b);

			d.line(_l, _b*1/6, _r, _b*5/6);
			d.line(_l, _b*2/6, _r, _b*4/6);
			d.line(_l, _b*4/6, _r, _b*2/6);
			d.line(_l, _b*5/6, _r, _b*1/6);
*/


/*
						var tmp = {};
						tmp.lineWidth = board.lineWidth;
						tmp.strokeStyle = board.strokeStyle;

						console.log(tmp);
						console.log(board);

						console.log("before board.lw: " + board.lineWidth);
						console.log("before tmp.lw: " + tmp.lineWidth);

						board.lineWidth = etc.t;
						board.strokeStyle = etc.color;

						console.log("during tmp.lw: " + tmp.lineWidth);
						console.log("during board.lw: " + board.lineWidth);
						console.log("during tmp.lw: " + tmp.lineWidth);
						board.strokeRect(x, y, w, h);

						board.lineWidth = tmp.lineWidth;
						board.strokeStyle = tmp.strokeStyle;

						console.log("after board.lw: " + board.lineWidth);
						console.log("after tmp.lw: " + tmp.lineWidth);
						/*
						for(var i = 0; i < etc.t; i++){
							board.strokeRect(x+i, y+i, w-(2*i), h-(2*i));
						}
						*/