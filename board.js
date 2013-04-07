
(function() {

    var PassLine = function(board) {
        this.board = board;
        return this;
    };
    PassLine.prototype = {
        name: "Pass Line",
        draw: function() {
            this.drawBorders();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.save();
            ctx.translate(125, 150);
            ctx.rotate(Math.PI * 0.5);
            ctx.textAlign = "left";
            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;
            ctx.font = "60pt Times";
            ctx.fillText("Pass Line", 0, 0);
            ctx.restore();

            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;
            ctx.font = "60pt Times";
            ctx.textAlign = "right";
            ctx.fillText("Pass Line", 950, 825);
        },
        drawBorders: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(100, 100);
            ctx.lineTo(100, 700);
            ctx.quadraticCurveTo(100, 850, 300, 850);
            ctx.lineTo(1000, 850);
            ctx.lineTo(1000, 750);
            ctx.lineTo(300, 750);
            ctx.quadraticCurveTo(200, 750, 200, 650);
            ctx.lineTo(200, 100);
            ctx.lineTo(95, 100);
            ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x < 100 || y > 850 || x > 1000 || y < 100) {
                // short circuit
                return false;
            }
            if (x < 200 && y < 700) {
                return true;
            }
            if (x > 300 && y > 750) {
                return true;
            }
            if (x > 300 || y < 650) {
                return false;
            }
            if (x > 100 && y > 700 && x < 200 && y < 850) {
                //ignore the curve
                return true;
            }
            if (x > 200 && y > 750 && x < 300 && y < 850) {
                //ignore the curve
                return true;
            }
            return false;
        }
    }
    var DontPass = function(board) {
        this.board = board;
        return this;
    };
    DontPass.prototype = {
        name: "Don't Pass",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(200, 100);
            ctx.lineTo(200, 500);
            ctx.lineTo(300, 500);
            ctx.lineTo(300, 100);
            ctx.lineTo(200, 100);
            ctx.stroke();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.save();
            ctx.translate(235, 150);
            ctx.rotate(Math.PI * 0.5);
            ctx.textAlign = "left";
            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;
            ctx.font = "45pt Times";
            ctx.fillText("Don't Pass", 0, 0);
            ctx.restore();

        },
        isClickedRegion: function(x, y) {
            if (x > 200 && x < 300 && y > 100 && y < 500) {
                return true;
            }
            return false;
        }
    };

    var DontCome = function(board) {
        this.board = board;
        return this;
    };
    DontCome.prototype = {
        name: "Don't Come",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(300, 100);
            ctx.lineTo(300, 350);
            ctx.lineTo(500, 350);
            ctx.lineTo(500, 100);
            ctx.lineTo(300, 100);
            ctx.stroke();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;
            ctx.font = "45pt Times";
            ctx.fillText("Don't", 400, 175);
            ctx.fillText("Come", 400, 225);
            ctx.fillText("Bar", 400, 275);

        },
        isClickedRegion: function(x, y) {
            if (x > 300 && x < 500 && y > 100 && y < 350) {
                return true;
            }
            return false;
        }
    };

    var Come = function(board) {
        this.board = board;
        return this;
    };
    Come.prototype = {
        name: "Come",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(300, 350);
            ctx.lineTo(300, 500);
            ctx.lineTo(1000, 500);
            ctx.lineTo(1000, 350);
            ctx.lineTo(300, 350);
            ctx.stroke();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.finalText;
            ctx.strokeStyle = this.board.colors.finalText;
            ctx.font = "75pt Times";
            ctx.fillText("COME", 650, 450);

        },
        isClickedRegion: function(x, y) {
            if (x > 300 && x < 1000 && y > 350 && y < 500) {
                return true;
            }
            return false;
        }
    };

    var DontPass2 = function(board) {
        this.board = board;
        return this;
    };
    DontPass2.prototype = {
        name: "Don't Pass",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(400, 650);
            ctx.lineTo(400, 750);
            ctx.lineTo(1000, 750);
            ctx.lineTo(1000, 650);
            ctx.lineTo(400, 650);
            ctx.stroke();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;
            ctx.font = "45pt Times";
            ctx.fillText("Don't Pass", 700, 725);

        },
        isClickedRegion: function(x, y) {
            if (x > 400 && x < 1000 && y > 650 && y < 750) {
                return true;
            }
            return false;
        }
    };

    var Field = function(board) {
        this.board = board;
        return this;
    };
    Field.prototype = {
        name: "Field",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(300, 500);
            ctx.lineTo(400, 650);
            ctx.lineTo(1000, 650);
            ctx.lineTo(1000, 500);
            ctx.lineTo(300, 500);
            ctx.stroke();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "45pt Times";
            ctx.fillText("FIELD", 660, 620);
            ctx.font = "35pt Times";
            ctx.fillText("2", 470, 585);
            ctx.fillText("3", 540, 560);
            ctx.fillText("4", 600, 555);
            ctx.fillText("9", 660, 550);
            ctx.fillText("10", 720, 555);
            ctx.fillText("11", 790, 560);
            ctx.fillText("12", 870, 585);
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(470, 572, 30, 0, 2* Math.PI, false);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(870, 572, 30, 0, 2* Math.PI, false);
            ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x > 400 && x < 1000 && y > 500 && y < 650) {
                return true;
            }
            if (x > 300 && x < 400 && y > 500 && y < (200 + x)) {
                return true;
            }
            return false;
           
        }
    };

    var Big6 = function(board) {
        this.board = board;
        return this;
    }
    Big6.prototype = {
        name: "Big 6",
        draw: function() {
            var ctx = this.board.context
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.lines;
            ctx.font = "35pt Times";
            ctx.save();
            ctx.translate(350, 575);
            ctx.rotate(Math.PI * 0.25);
            ctx.fillText("B", 0, 50);
            ctx.fillText("I", 0, 100);
            ctx.fillText("G", 0, 150);
            ctx.restore();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context
            ctx.strokeStyle = this.board.colors.finalText;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.finalText;
            ctx.font = "70pt Times";
            ctx.save();
            ctx.translate(270, 550);
            ctx.rotate(Math.PI * 0.25);
            ctx.fillText("6", 5, 50);
            ctx.restore();
        },
        isClickedRegion: function(x, y) {
            if (x < 300 && x > 200 && y > 500 && y < 600) {
                return true;
            }
            if (x < 300 && x > 200 && y > 600 && y < (900 - x)) {
                return true;
            }
            if (x < 350 && x > 300 && y > 400 && y < (900 - x)) {
                return true;
            }
            return false;
        }
    };

    var Big8 = function(board) {
        this.board = board;
        return this;
    }
    Big8.prototype = {
        name: "Big 8",
        draw: function() {
            var ctx = this.board.context
            ctx.strokeStyle = this.board.colors.finalText;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.finalText;
            ctx.font = "70pt Times";
            ctx.save();
            ctx.translate(350, 650);
            ctx.rotate(Math.PI * 0.25);
            ctx.fillText("8", 5, 50);
            ctx.restore();
        },
        isClickedRegion: function(x, y) {
            if (x > 200 && x < 400 && y > 450 && y < 750) {
                return true;
            }
            return false;
        }
    };

    var Place = function(n) {
        var type = function(board) {
            this.board = board;
            return this;
        };
        offset = {4: 0, 5: 100, 6: 200, 8: 300, 9: 400, 10: 500};
        type.prototype = {
            name: "Place " + n,
            value: n,
            draw: function() {
                var ctx = this.board.context;
                ctx.strokeStyle = this.board.colors.lines;
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(500 + offset[n], 100);
                ctx.lineTo(500 + offset[n], 350);
                ctx.lineTo(600 + offset[n], 350);
                ctx.lineTo(600 + offset[n], 100);
                ctx.lineTo(500 + offset[n], 100);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(500 + offset[n], 150);
                ctx.lineTo(600 + offset[n], 150);
                ctx.moveTo(500 + offset[n], 175);
                ctx.lineTo(600 + offset[n], 175);
                ctx.moveTo(500 + offset[n], 325);
                ctx.lineTo(600 + offset[n], 325);
                ctx.stroke();
                this.drawText();
            },
            drawText: function() {
                var ctx = this.board.context;
                if (n != 6 && n != 9) {
                    ctx.textAlign = "center";
                    ctx.fillStyle = this.board.colors.specialText;
                    ctx.strokeStyle = this.board.colors.specialText;
                    ctx.font = "70pt Times";
                    ctx.fillText(n, 550 + offset[n], 275);
                } else if (n == 6) {
                    ctx.save();
                    ctx.translate(527 + offset[n], 285);
                    ctx.rotate(Math.PI * -0.25);
                    ctx.textAlign = "left";
                    ctx.fillStyle = this.board.colors.specialText;
                    ctx.strokeStyle = this.board.colors.specialText;
                    ctx.font = "45pt Times";
                    ctx.fillText("SIX", 0, 0);
                    ctx.restore();
                } else if (n == 9) {
                    ctx.save();
                    ctx.translate(525 + offset[n], 285);
                    ctx.rotate(Math.PI * -0.25);
                    ctx.textAlign = "left";
                    ctx.fillStyle = this.board.colors.specialText;
                    ctx.strokeStyle = this.board.colors.specialText;
                    ctx.font = "30pt Times";
                    ctx.fillText("NINE", 0, 0);
                    ctx.restore();
                   
                }
            },
            isClickedRegion: function(x, y) {
                if (x > 500 + offset[n] && x < 600 + offset[n] && y > 100 && y < 350) {
                    return true;
                }
            }
        };
        return type;
    }

    var Seven = function(board) {
        this.board = board;
        return this;
    }
    Seven.prototype = {
        name: "Seven",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1200, 450);
            ctx.lineTo(1200, 500);
            ctx.lineTo(1900, 500);
            ctx.lineTo(1900, 450);
            ctx.lineTo(1195, 450);
            ctx.stroke();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.finalText;
            ctx.strokeStyle = this.board.colors.finalText;
            ctx.font = "38pt Times";
            ctx.fillText("SEVEN", 1550, 493);
        },
        isClickedRegion: function(x, y) {
            if (x > 1200 && x < 1900 && y > 450 && y < 500) {
                return true;
            }
            return false;
        }
    }

    var Hard6 = function(board) {
        this.board = board;
        return this;
    }
    Hard6.prototype = {
        name: "Hard 6",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1200, 500);
            ctx.lineTo(1200, 600);
            ctx.lineTo(1550, 600);
            ctx.lineTo(1550, 500);
            ctx.lineTo(1200, 500);
            ctx.stroke();
            this.drawDice();
            //this.drawText();
        },
        //drawText: function() {
        //    var ctx = this.board.context;
        //    ctx.textAlign = "center";
        //    ctx.fillStyle = this.board.colors.specialText;
        //    ctx.strokeStyle = this.board.colors.specialText;
        //    ctx.font = "35pt Times";
        //    ctx.fillText("Hard", 1375, 545);
        //    ctx.fillText("SIX", 1375, 590); 
        //},
        drawDice: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1287.5, 512.5, 75, 75);
          ctx.rect(1387.5 , 512.5, 75, 75);
          ctx.fillStyle = 'yellow';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          //first
          this.drawDot(1300, 575);
          this.drawDot(1325, 550);
          this.drawDot(1350, 525);
          //second
          this.drawDot(1400, 575);
          this.drawDot(1425, 550);
          this.drawDot(1450, 525);
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.strokeStyle = 'green';
          ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x > 1200 && x < 1550 && y > 500 && y < 600) {
                return true;
            }
            return false;
        }
    }
    var Hard10 = function(board) {
        this.board = board;
        return this;
    }
    Hard10.prototype = {
        name: "Hard 10",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1550, 500);
            ctx.lineTo(1550, 600);
            ctx.lineTo(1900, 600);
            ctx.lineTo(1900, 500);
            ctx.lineTo(1550, 500);
            ctx.stroke();
            //this.drawText();
            this.drawDice();
        },
        drawDice: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1637.5, 512.5, 75, 75);
          ctx.rect(1737.5 , 512.5, 75, 75);
          ctx.fillStyle = 'yellow';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          //first
          this.drawDot(1650, 525);
          this.drawDot(1650, 575);
          this.drawDot(1675, 550);
          this.drawDot(1700, 525);
          this.drawDot(1700, 575);
          //second
          this.drawDot(1750, 575);
          this.drawDot(1750, 525);
          this.drawDot(1775, 550);
          this.drawDot(1800, 525);
          this.drawDot(1800, 575);
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.strokeStyle = 'green';
          ctx.stroke();
        },
        //drawText: function() {
        //    var ctx = this.board.context;
        //    ctx.textAlign = "center";
        //    ctx.fillStyle = this.board.colors.specialText;
        //    ctx.strokeStyle = this.board.colors.specialText;
        //    ctx.font = "35pt Times";
        //    ctx.fillText("Hard", 1725, 545);
        //    ctx.fillText("10", 1725, 590); 
        //},
        isClickedRegion: function(x, y) {
            if (x > 1550 && x < 1900 && y > 500 && y < 600) {
                return true;
            }
            return false;
        }
    }
    var Hard8 = function(board) {
        this.board = board;
        return this;
    }
    Hard8.prototype = {
        name: "Hard 8",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1200, 600);
            ctx.lineTo(1200, 700);
            ctx.lineTo(1550, 700);
            ctx.lineTo(1550, 600);
            ctx.lineTo(1200, 600);
            ctx.stroke();
            this.drawDice();
            //this.drawText();
        },
        //drawText: function() {
        //    var ctx = this.board.context;
        //    ctx.textAlign = "center";
        //    ctx.fillStyle = this.board.colors.specialText;
        //    ctx.strokeStyle = this.board.colors.specialText;
        //    ctx.font = "35pt Times";
        //    ctx.fillText("Hard", 1375, 645);
        //    ctx.fillText("8", 1375, 690); 
        //},
        drawDice: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1287.5, 612.5, 75, 75);
          ctx.rect(1387.5 , 612.5, 75, 75);
          ctx.fillStyle = 'yellow';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          //first
          this.drawDot(1300, 675);
          this.drawDot(1300, 625);
          this.drawDot(1350, 625);
          this.drawDot(1350, 675);
          //second
          this.drawDot(1400, 675);
          this.drawDot(1400, 625);
          this.drawDot(1450, 625);
          this.drawDot(1450, 675);
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.strokeStyle = 'green';
          ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x > 1200 && x < 1550 && y > 600 && y < 700) {
                return true;
            }
            return false;
        }
    }
    var Hard4 = function(board) {
        this.board = board;
        return this;
    }
    Hard4.prototype = {
        name: "Hard 4",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1550, 600);
            ctx.lineTo(1550, 700);
            ctx.lineTo(1900, 700);
            ctx.lineTo(1900, 600);
            ctx.lineTo(1550, 600);
            ctx.stroke();
            //this.drawText();
            this.drawDice();
        },
        drawDice: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1637.5, 612.5, 75, 75);
          ctx.rect(1737.5 , 612.5, 75, 75);
          ctx.fillStyle = 'yellow';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          //first
          this.drawDot(1650, 625);
          this.drawDot(1700, 675);
          //second
          this.drawDot(1750, 625);
          this.drawDot(1800, 675);
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.strokeStyle = 'green';
          ctx.stroke();
        },
        //drawText: function() {
        //    var ctx = this.board.context;
        //    ctx.textAlign = "center";
        //    ctx.fillStyle = this.board.colors.specialText;
        //    ctx.strokeStyle = this.board.colors.specialText;
        //    ctx.font = "35pt Times";
        //    ctx.fillText("Hard", 1725, 645);
        //    ctx.fillText("4", 1725, 690); 
        //},
        isClickedRegion: function(x, y) {
            if (x > 1550 && x < 1900 && y > 600 && y < 700) {
                return true;
            }
            return false;
        }
    }

    var AceTwo = function(board) {
        this.board = board;
        return this;
    }
    AceTwo.prototype = {
        name: "Ace Two",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1200, 700);
            ctx.lineTo(1200, 800);
            ctx.lineTo(1430, 800);
            ctx.lineTo(1430, 700);
            ctx.lineTo(1200, 700);
            ctx.stroke();
            //this.drawText();
            this.drawDice();
        },
        //drawText: function() {
        //    var ctx = this.board.context;
        //    ctx.textAlign = "center";
        //    ctx.fillStyle = this.board.colors.specialText;
        //    ctx.strokeStyle = this.board.colors.specialText;
        //    ctx.font = "35pt Times";
        //    ctx.fillText("Ace", 1325, 745);
        //    ctx.fillText("Two", 1325, 790); 
        //},
        drawDice: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1227.5, 712.5, 75, 75);
          ctx.rect(1327.5 , 712.5, 75, 75);
          ctx.fillStyle = 'yellow';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          //first
          this.drawDot(1265, 750);
          //second
          this.drawDot(1340, 725);
          this.drawDot(1390, 775);
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.strokeStyle = 'green';
          ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x > 1200 && x < 1430 && y > 700 && y < 800) {
                return true;
            }
            return false;
        }
    }

    var SnakeEyes = function(board) {
        this.board = board;
        return this;
    }
    SnakeEyes.prototype = {
        name: "Snake Eyes",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1430, 700);
            ctx.lineTo(1430, 800);
            ctx.lineTo(1670, 800);
            ctx.lineTo(1670, 700);
            ctx.lineTo(1430, 700);
            ctx.stroke();
            //this.drawText();
            this.drawDice();
        },
        //drawText: function() {
        //    var ctx = this.board.context;
        //    ctx.textAlign = "center";
        //    ctx.fillStyle = this.board.colors.specialText;
        //    ctx.strokeStyle = this.board.colors.specialText;
        //    ctx.font = "35pt Times";
        //    ctx.fillText("Snake", 1550, 745);
        //    ctx.fillText("Eyes", 1550, 790); 
        //},
        drawDice: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1462.5, 712.5, 75, 75);
          ctx.rect(1562.5 , 712.5, 75, 75);
          ctx.fillStyle = 'yellow';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          //first
          this.drawDot(1500, 750);
          //second
          this.drawDot(1600, 750);
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.strokeStyle = 'green';
          ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x > 1430 && x < 1670 && y > 700 && y < 800) {
                return true;
            }
            return false;
        }
    }

    var Midnight = function(board) {
        this.board = board;
        return this;
    }
    Midnight.prototype = {
        name: "Midnight",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1670, 700);
            ctx.lineTo(1670, 800);
            ctx.lineTo(1900, 800);
            ctx.lineTo(1900, 700);
            ctx.lineTo(1670, 700);
            ctx.stroke();
            //this.drawText();
            this.drawDice();
        },
        //drawText: function() {
        //    var ctx = this.board.context;
        //    ctx.textAlign = "center";
        //    ctx.fillStyle = this.board.colors.specialText;
        //    ctx.strokeStyle = this.board.colors.specialText;
        //    ctx.font = "35pt Times";
        //    ctx.fillText("Six", 1775, 745);
        //    ctx.fillText("Six", 1775, 790); 
        //},
        drawDice: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1697.5, 712.5, 75, 75);
          ctx.rect(1797.5 , 712.5, 75, 75);
          ctx.fillStyle = 'yellow';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          //first
          this.drawDot(1710, 725);
          this.drawDot(1710, 750);
          this.drawDot(1710, 775);
          this.drawDot(1760, 725);
          this.drawDot(1760, 750);
          this.drawDot(1760, 775);
          //second
          this.drawDot(1810, 725);
          this.drawDot(1810, 750);
          this.drawDot(1810, 775);
          this.drawDot(1860, 725);
          this.drawDot(1860, 750);
          this.drawDot(1860, 775);
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.strokeStyle = 'green';
          ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x > 1670 && x < 1900 && y > 700 && y < 800) {
                return true;
            }
            return false;
        }
    }

    var Eleven = function(board) {
        this.board = board;
        return this;
    }
    Eleven.prototype = {
        name: "Yo-leven",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1200, 800);
            ctx.lineTo(1200, 900);
            ctx.lineTo(1550, 900);
            ctx.lineTo(1550, 800);
            ctx.lineTo(1200, 800);
            ctx.stroke();
            //this.drawText();
            this.drawDice();
        },
        //drawText: function() {
        //    var ctx = this.board.context;
        //    ctx.textAlign = "center";
        //    ctx.fillStyle = this.board.colors.specialText;
        //    ctx.strokeStyle = this.board.colors.specialText;
        //    ctx.font = "35pt Times";
        //    ctx.fillText("Five", 1375, 845);
        //    ctx.fillText("Six", 1375, 890); 
        //},
        drawDice: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1287.5, 812.5, 75, 75);
          ctx.rect(1387.5 , 812.5, 75, 75);
          ctx.fillStyle = 'yellow';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          //first
          this.drawDot(1350, 825);
          this.drawDot(1300, 825);
          this.drawDot(1325, 850);
          this.drawDot(1300, 875);
          this.drawDot(1350, 875);
          //second
          this.drawDot(1450, 825);
          this.drawDot(1400, 825);
          this.drawDot(1400, 850);
          this.drawDot(1450, 850);
          this.drawDot(1400, 875);
          this.drawDot(1450, 875);
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.strokeStyle = 'green';
          ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x > 1200 && x < 1550 && y > 800 && y < 900) {
                return true;
            }
            return false;
        }
    }
    var Eleven2 = function(board) {
        this.board = board;
        return this;
    }
    Eleven2.prototype = {
        name: "Yo-leven",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1550, 800);
            ctx.lineTo(1550, 900);
            ctx.lineTo(1900, 900);
            ctx.lineTo(1900, 800);
            ctx.lineTo(1550, 800);
            ctx.stroke();
            //this.drawText();
            this.drawDice();
        },
        //drawText: function() {
        //    var ctx = this.board.context;
        //    ctx.textAlign = "center";
        //    ctx.fillStyle = this.board.colors.specialText;
        //    ctx.strokeStyle = this.board.colors.specialText;
        //    ctx.font = "35pt Times";
        //    ctx.fillText("Five", 1725, 845);
        //    ctx.fillText("Six", 1725, 890); 
        //},
        drawDice: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1637.5, 812.5, 75, 75);
          ctx.rect(1737.5 , 812.5, 75, 75);
          ctx.fillStyle = 'yellow';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'yellow';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          //first
          this.drawDot(1700, 825);
          this.drawDot(1650, 825);
          this.drawDot(1675, 850);
          this.drawDot(1650, 875);
          this.drawDot(1700, 875);
          //second
          this.drawDot(1800, 825);
          this.drawDot(1750, 825);
          this.drawDot(1750, 850);
          this.drawDot(1800, 850);
          this.drawDot(1750, 875);
          this.drawDot(1800, 875);
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.strokeStyle = 'green';
          ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x > 1550 && x < 1900 && y > 800 && y < 900) {
                return true;
            }
            return false;
        }
    }

    var Craps = function(board) {
        this.board = board;
        return this;
    }
    Craps.prototype = {
        name: "Craps",
        draw: function() {
            var ctx = this.board.context;
            ctx.strokeStyle = this.board.colors.lines;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(1200, 900);
            ctx.lineTo(1200, 950);
            ctx.lineTo(1900, 950);
            ctx.lineTo(1900, 900);
            ctx.lineTo(1200, 900);
            ctx.stroke();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.finalText;
            ctx.strokeStyle = this.board.colors.finalText;
            ctx.font = "38pt Times";
            ctx.fillText("CRAPS", 1550, 940);
        },
        isClickedRegion: function(x, y) {
            if (x > 1200 && x < 1900 && y > 900 && y < 950) {
                return true;
            }
            return false;
        }
    }

    var EAndC = function(board) {
        this.board = board;
        return this;
    }
    EAndC.prototype = {
        name: "C and E",
        draw: function() {
            var ctx = this.board.context;
            ctx.lineWidth = 5;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;
            ctx.font = "40pt Times";

            for (var i = 0; i < 6; i++) {
                ctx.strokeStyle = this.board.colors.lines;
                ctx.beginPath();
                ctx.arc(1145, 525 + (75 * i), 30, 2 * Math.PI, false);
                ctx.fillText("C", 1142, 542 + (75 * i));
                ctx.stroke();
            }
            for (var i = 0; i < 7; i++) {
                ctx.strokeStyle = this.board.colors.lines;
                ctx.beginPath();
                ctx.arc(1075, 490 + (75 * i), 30, 2 * Math.PI, false);
                ctx.fillText("E", 1073, 507 + (75 * i));
                ctx.stroke();
            }
        },
        isClickedRegion: function(x, y) {
            if (x > 1045 && x < 1175 && y > 460 && y < 985) {
                return true;
            }
            return false;
        }
    };

    var Horn = function(board) {
        this.board = board;
        return this;
    }
    Horn.prototype = {
        name: "Horn",
        draw: function() {
            var ctx = this.board.context;
            ctx.lineWidth = 5;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;
            ctx.font = "40pt Times";

            ctx.strokeStyle = this.board.colors.lines;
            ctx.beginPath();
            ctx.arc(930, 900, 30, 2 * Math.PI, false);
            ctx.textAlign = "left";
            ctx.font = "14pt Times";
            //ctx.rotate(Math.PI * -0.2);
            ctx.fillText("Horn", 910, 905);
            ctx.stroke();
            ctx.restore();
            
        },
        isClickedRegion: function(x, y) {
            if (x > 900 && x < 960 && y > 870 && y < 930) {
                return true;
            }
            return false;
        }
    };

    var World = function(board) {
        this.board = board;
        return this;
    }
    World.prototype = {
        name: "World",
        draw: function() {
            var ctx = this.board.context;
            ctx.lineWidth = 5;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;
            ctx.font = "40pt Times";

            ctx.strokeStyle = this.board.colors.lines;
            ctx.beginPath();
            ctx.arc(1000, 900, 30, 2 * Math.PI, false);
            ctx.textAlign = "left";
            ctx.font = "14pt Times";
            //ctx.rotate(Math.PI * -0.2);
            ctx.fillText("World", 975, 905);
            ctx.stroke();
            ctx.restore();
            
        },
        isClickedRegion: function(x, y) {
            if (x > 970 && x < 1030 && y > 870 && y < 930) {
                return true;
            }
            return false;
        }
    };

    var Dice = function(board) {
        this.board = board;
        return this;
    }
    Dice.prototype = {
        name: "Dice",
        draw: function(){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.rect(1200, 200, 75, 75);
          ctx.rect(1300, 200, 75, 75);
          ctx.fillStyle = 'red';
          ctx.fill();
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'red';
          ctx.stroke();
          this.drawDots();
        },
        drawDots: function(){
          var dice = diceToNum(_CRAPS.dice);
          var offset = [0, 100];
          for(die in dice){
            switch(dice[die]){
            case false:
              this.drawDot(1262.5 + offset[die], 262.5);
              this.drawDot(1262.5 + offset[die], 212.5);
              this.drawDot(1212.5 + offset[die], 262.5);
              this.drawDot(1212.5 + offset[die], 212.5);
              break;
            case 1:
              this.drawDot(1237.5 + offset[die], 237.5);
              break;
            case 2:
              this.drawDot(1212.5 + offset[die], 212.5);
              this.drawDot(1262.5 + offset[die], 262.5);
              break;
            case 3:
              this.drawDot(1212.5 + offset[die], 262.5);
              this.drawDot(1237.5 + offset[die], 237.5);
              this.drawDot(1262.5 + offset[die], 212.5);
              break;
            case 4:
              this.drawDot(1262.5 + offset[die], 262.5);
              this.drawDot(1262.5 + offset[die], 212.5);
              this.drawDot(1212.5 + offset[die], 262.5);
              this.drawDot(1212.5 + offset[die], 212.5);
              break;
            case 5:
              this.drawDot(1237.5 + offset[die], 237.5);
              this.drawDot(1262.5 + offset[die], 262.5);
              this.drawDot(1262.5 + offset[die], 212.5);
              this.drawDot(1212.5 + offset[die], 262.5);
              this.drawDot(1212.5 + offset[die], 212.5);
              break;
            case 6:
              this.drawDot(1262.5 + offset[die], 262.5);
              this.drawDot(1262.5 + offset[die], 237.5);
              this.drawDot(1212.5 + offset[die], 237.5);
              this.drawDot(1262.5 + offset[die], 212.5);
              this.drawDot(1212.5 + offset[die], 262.5);
              this.drawDot(1212.5 + offset[die], 212.5);
              break;
            default:
              return;
            }
          }
        },
        drawDot: function(x, y){
          var ctx = this.board.context;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI, false);
          ctx.lineWidth = 5;
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.strokeStyle = 'white';
          ctx.stroke();
        },
        isClickedRegion: function(x, y) {
            if (x > 1200 && x < 1375 && y > 200 && y < 275) {
                return true;
            }
            return false;
        }
    };
    
    var Help = function(board) {
        this.board = board;
        return this;
    }
    Help.prototype = {
        name: "Help",
        draw: function() {
            var ctx = this.board.context;
            ctx.lineWidth = 5;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;

            ctx.strokeStyle = this.board.colors.lines;
            ctx.beginPath();
            ctx.arc(50, 950, 30, 2 * Math.PI, false);
            ctx.textAlign = "left";
            ctx.font = "40pt Times";
            //ctx.rotate(Math.PI * -0.2);
            ctx.fillText("?", 40, 968);
            ctx.stroke();
            ctx.restore();
            
        },
        isClickedRegion: function(x, y) {
            if (x > 20 && x < 80 && y > 920 && y < 980) {
                return true;
            }
            return false;
        }
    };

    var regions = [
        PassLine,
        DontPass,
        DontCome,
        DontPass2,
        Come,
        Field,
        Place(4),
        Place(5),
        Place(6),
        Place(8),
        Place(9),
        Place(10),
        Big6,
        Big8,
        Seven,
        Hard6,
        Hard10,
        Hard8,
        Hard4,
        AceTwo,
        SnakeEyes,
        Midnight,
        Eleven,
        Eleven2,
        Craps,
        EAndC,
        Horn,
        World,
        Dice,
        Help
    ];

    var Board = function(canvas, colors) {
        this.canvas = canvas;
        canvas.setAttribute("width", 2000);
        canvas.setAttribute("height", 1000);
        this.context = canvas.getContext("2d");
        this.colors = colors;
        this.regions = [];
        for (var i = 0; i < regions.length; i++) {
            this.regions.push(new regions[i](this));
        }
        return this;
    };

    Board.prototype = {
        draw: function() {
            this.drawBackground();
            for (var i = 0; i < this.regions.length; i++) {
                this.regions[i].draw();
            }
            this.drawTableInfo();
            this.drawBets();
        },
        drawBackground: function() {
            this.context.fillStyle = this.colors.board;
            this.context.fillRect(0, 0, 2000, 1000);
            this.context.strokeStyle = this.colors.border;
            this.context.lineWidth = 10;
            this.context.beginPath();
            this.context.moveTo(0, 0);
            this.context.lineTo(2000, 0);
            this.context.lineTo(2000, 1000);
            this.context.lineTo(0, 1000);
            this.context.lineTo(0, 0);
            this.context.stroke();
        },
        drawTableInfo: function() {
            var ctx = this.context;
            ctx.fillStyle = this.colors.specialText;
            ctx.strokeStyle = this.colors.specialText;
            ctx.font = "20pt Times";
            ctx.fillText('3x-4x-5x Odds', 1200, 100); 
            ctx.fillText('Table Min Bet: $' + _CRAPS.minBet, 1200, 125); 
            ctx.fillText('Table Max Bet: $' + _CRAPS.maxBet, 1200, 150);
            this.drawPoint(ctx, GameState.point);
        },
        drawPoint: function(ctx, point){
          if(!GameState.point){
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.arc(1130, 60, 30, 2 * Math.PI, false);
            ctx.fillStyle = this.colors.pointOff;
            ctx.fill();
            ctx.strokeStyle = this.colors.pointBorder;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = this.colors.text;
            ctx.font = "24pt Times";
            ctx.fillText('OFF', 1100, 70);
            ctx.stroke();
            ctx.closePath();
          }
          switch(GameState.point){
          case 4:
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(550, 162.5, 30, 2 * Math.PI, false);
            ctx.fillStyle = this.colors.pointOn;
            ctx.fill();
            ctx.strokeStyle = this.colors.pointBorder;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = this.colors.buttonText;
            ctx.font = "25pt Times";
            ctx.fillText('ON', 525, 172.5);
            ctx.stroke();
            ctx.closePath();
            break;
          case 5:
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(650, 162.5, 30, 2 * Math.PI, false);
            ctx.fillStyle = this.colors.pointOn;
            ctx.fill();
            ctx.strokeStyle = this.colors.pointBorder;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = this.colors.buttonText;
            ctx.font = "25pt Times";
            ctx.fillText('ON', 625, 172.5);
            ctx.stroke();
            ctx.closePath();
            break;
          case 6:
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(750, 162.5, 30, 2 * Math.PI, false);
            ctx.fillStyle = this.colors.pointOn;
            ctx.fill();
            ctx.strokeStyle = this.colors.pointBorder;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = this.colors.buttonText;
            ctx.font = "25pt Times";
            ctx.fillText('ON', 725, 172.5);
            ctx.stroke();
            ctx.closePath();
            break;
          case 8:
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(850, 162.5, 30, 2 * Math.PI, false);
            ctx.fillStyle = this.colors.pointOn;
            ctx.fill();
            ctx.strokeStyle = this.colors.pointBorder;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = this.colors.buttonText;
            ctx.font = "25pt Times";
            ctx.fillText('ON', 825, 172.5);
            ctx.stroke();
            ctx.closePath();
            break;
          case 9:
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(950, 162.5, 30, 2 * Math.PI, false);
            ctx.fillStyle = this.colors.pointOn;
            ctx.fill();
            ctx.strokeStyle = this.colors.pointBorder;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = this.colors.buttonText;
            ctx.font = "25pt Times";
            ctx.fillText('ON', 925, 172.5);
            ctx.stroke();
            ctx.closePath();
            break;
          case 10:
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(1050, 162.5, 30, 2 * Math.PI, false);
            ctx.fillStyle = this.colors.pointOn;
            ctx.fill();
            ctx.strokeStyle = this.colors.pointBorder;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = this.colors.buttonText;
            ctx.font = "25pt Times";
            ctx.fillText('ON', 1025, 172.5);
            ctx.stroke();
            ctx.closePath();
            break;
          default:
            return;
          }
        },
        drawBets: function(){
          var ctx = this.context;
          var bets = _CRAPS.dealer.betManager.bets;
          for(bet in bets){
            switch(bets[bet].type){
            case 'passline':
              ctx.beginPath();
              ctx.arc(540, 800, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              break;
            case 'passlineOdds':
              ctx.beginPath();
              ctx.arc(540, 880, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              break;
            case 'dontPass':
              ctx.beginPath();
              ctx.arc(485, 695, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              break;
            case 'dontPassOdds':
              ctx.beginPath();
              ctx.arc(485, 705, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              break;
            case 'come':
              if(bets[bet].point == 4){
                ctx.beginPath();
                ctx.arc(575, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 564, 135);
                ctx.stroke();
                ctx.closePath();
              }else if(bets[bet].point == 5){
                ctx.beginPath();
                ctx.arc(675, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 664, 135);
                ctx.stroke();
              }else if(bets[bet].point == 6){
                ctx.beginPath();
                ctx.arc(775, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 764, 135);
                ctx.stroke();
              }else if(bets[bet].point == 8){
                ctx.beginPath();
                ctx.arc(875, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 864, 135);
                ctx.stroke();
              }else if(bets[bet].point == 9){
                ctx.beginPath();
                ctx.arc(975, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 964, 135);
                ctx.stroke();
              }else if(bets[bet].point == 10){
                ctx.beginPath();
                ctx.arc(1075, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 1064, 135);
                ctx.stroke();
              }else{
                ctx.beginPath();
                ctx.arc(425, 415, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
              }
              break;
            case 'comeOdds':
              if(bets[bet].point == 4){
                ctx.beginPath();
                ctx.arc(575, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 564, 125);
                ctx.stroke();
                ctx.closePath();
              }else if(bets[bet].point == 5){
                ctx.beginPath();
                ctx.arc(675, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 664, 125);
                ctx.stroke();
              }else if(bets[bet].point == 6){
                ctx.beginPath();
                ctx.arc(775, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 764, 125);
                ctx.stroke();
              }else if(bets[bet].point == 8){
                ctx.beginPath();
                ctx.arc(875, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 864, 125);
                ctx.stroke();
              }else if(bets[bet].point == 9){
                ctx.beginPath();
                ctx.arc(975, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 964, 125);
                ctx.stroke();
              }else if(bets[bet].point == 10){
                ctx.beginPath();
                ctx.arc(1075, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('C', 1064, 125);
                ctx.stroke();
              }
              break;
            case 'dontCome':
              if(bets[bet].point == 4){
                ctx.beginPath();
                ctx.arc(525, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 514, 135);
                ctx.stroke();
                ctx.closePath();
              }else if(bets[bet].point == 5){
                ctx.beginPath();
                ctx.arc(625, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 614, 135);
                ctx.stroke();
              }else if(bets[bet].point == 6){
                ctx.beginPath();
                ctx.arc(725, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 714, 135);
                ctx.stroke();
              }else if(bets[bet].point == 8){
                ctx.beginPath();
                ctx.arc(825, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 814, 135);
                ctx.stroke();
              }else if(bets[bet].point == 9){
                ctx.beginPath();
                ctx.arc(925, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 914, 135);
                ctx.stroke();
              }else if(bets[bet].point == 10){
                ctx.beginPath();
                ctx.arc(1025, 125, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 1014, 135);
                ctx.stroke();
              }else{
                ctx.beginPath();
                ctx.arc(400, 305, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
              }
              break;
            case 'dontComeOdds':
              if(bets[bet].point == 4){
                ctx.beginPath();
                ctx.arc(525, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 514, 125);
                ctx.stroke();
                ctx.closePath();
              }else if(bets[bet].point == 5){
                ctx.beginPath();
                ctx.arc(625, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 614, 125);
                ctx.stroke();
              }else if(bets[bet].point == 6){
                ctx.beginPath();
                ctx.arc(725, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 714, 125);
                ctx.stroke();
              }else if(bets[bet].point == 8){
                ctx.beginPath();
                ctx.arc(825, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 814, 125);
                ctx.stroke();
              }else if(bets[bet].point == 9){
                ctx.beginPath();
                ctx.arc(925, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 914, 125);
                ctx.stroke();
              }else if(bets[bet].point == 10){
                ctx.beginPath();
                ctx.arc(1025, 115, 20, 0, 2 * Math.PI, false);
                ctx.lineWidth = 2;
                ctx.fillStyle = 'maroon';
                ctx.fill()
                ctx.strokeStyle = 'navy';
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "20pt Verdana";
                ctx.fillText('D', 1014, 125);
                ctx.stroke();
              }
              break;
            case 'field':
              ctx.beginPath();
              ctx.arc(545, 600, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(545, 600, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 538, 607);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'place4':
              ctx.beginPath();
              ctx.arc(545, 290, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(545, 290, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 538, 297);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'place5':
              ctx.beginPath();
              ctx.arc(650, 290, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(650, 290, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 643, 297);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'place6':
              ctx.beginPath();
              ctx.arc(745, 290, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(745, 290, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 738, 297);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'place8':
              ctx.beginPath();
              ctx.arc(850, 290, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(850, 290, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 843, 297);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'place9':
              ctx.beginPath();
              ctx.arc(950, 290, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(950, 290, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 943, 297);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'place10':
              ctx.beginPath();
              ctx.arc(1050, 290, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1050, 290, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1043, 297);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'big6':
              ctx.beginPath();
              ctx.arc(255, 560, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(255, 560, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 247, 567);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'big8':
              ctx.beginPath();
              ctx.arc(340, 667, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(340, 667, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 333, 674);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'any7':
              ctx.beginPath();
              ctx.arc(1425, 477, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1425, 477, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1418, 484);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'hard6':
              ctx.beginPath();
              ctx.arc(1375, 550, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1375, 550, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1368, 557);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'hard10':
              ctx.beginPath();
              ctx.arc(1725, 550, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1725, 550, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1718, 557);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'hard8':
              ctx.beginPath();
              ctx.arc(1375, 650, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1375, 650, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1368, 657);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'hard4':
              ctx.beginPath();
              ctx.arc(1725, 650, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1725, 650, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1718, 657);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'aceTwo':
              ctx.beginPath();
              ctx.arc(1312.5, 750, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1312.5, 750, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1305.5, 757);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'snakeEyes':
              ctx.beginPath();
              ctx.arc(1550, 750, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1550, 750, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1543, 757);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'midnight':
              ctx.beginPath();
              ctx.arc(1782.5, 750, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1782.5, 750, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1775.5, 757);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'yoleven':
              ctx.beginPath();
              ctx.arc(1550, 850, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1550, 850, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1543, 857);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'anyCraps':
              ctx.beginPath();
              ctx.arc(1435, 925, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1435, 925, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1428, 932);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'cAndE':
              ctx.beginPath();
              ctx.arc(1110, 700, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1110, 700, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 1103, 707);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'horn':
              ctx.beginPath();
              ctx.arc(930, 900, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(930, 900, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 923, 907);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            case 'world':
              ctx.beginPath();
              ctx.arc(1000, 900, 20, 0, 2 * Math.PI, false);
              ctx.lineWidth = 2;
              ctx.fillStyle = 'maroon';
              ctx.fill()
              ctx.strokeStyle = 'navy';
              ctx.stroke();
              if(bets[bet].bet.on == false){
                ctx.beginPath();
                ctx.arc(1000, 900, 15, 0, 2 * Math.PI, false);
                ctx.lineWidth = 1;
                ctx.fillStyle = this.colors.pointOff;
                ctx.fill()
                ctx.strokeStyle = this.colors.pointBorder;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = this.colors.text;
                ctx.font = "15pt Verdana";
                ctx.fillText('X', 993, 907);
                ctx.stroke();
                ctx.closePath();
              }
              break;
            default:
              return;
            }
          }
        },
        processClick: function(x, y) {
            var x = (x / this.canvas.clientWidth) * 2000;
            var y = (y / this.canvas.clientHeight) * 1000;
            for (var i = 0; i < this.regions.length; i++) {
                if (this.regions[i].isClickedRegion(x, y)) {
                    return this.regions[i];
                }
            }
            return false;
        }
    }


    window.Board = Board;
})();