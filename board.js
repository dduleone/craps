
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
            ctx.font = "60pt Calibri";
            ctx.fillText("Pass Line", 0, 0);
            ctx.restore();

            ctx.fillStyle = this.board.colors.text;
            ctx.strokeStyle = this.board.colors.text;
            ctx.font = "60pt Calibri";
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
            ctx.font = "45pt Calibri";
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
            ctx.font = "45pt Calibri";
            ctx.fillText("Don't", 400, 175);
            ctx.fillText("Come", 400, 225);
            ctx.fillText("Bar", 400, 275);

        },
        isClickedRegion: function(x, y) {
            if (x > 300 && x < 500 && y > 100 && y < 300) {
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
            ctx.font = "75pt Calibri";
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
            ctx.font = "45pt Calibri";
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
            ctx.font = "45pt Calibri";
            ctx.fillText("FIELD", 700, 600);
        },
        isClickedRegion: function(x, y) {
            if (x > 400 && x < 1000 && y > 500 && y < 650) {
                return true;
            }
            if (x > 300 && x < 400 && y < (200 + x)) {
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
            ctx.font = "35pt Calibri";
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
            ctx.font = "70pt Calibri";
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
            ctx.font = "70pt Calibri";
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
                    ctx.font = "70pt Calibri";
                    ctx.fillText(n, 550 + offset[n], 275);
                } else if (n == 6) {
                    ctx.save();
                    ctx.translate(520 + offset[n], 275);
                    ctx.rotate(Math.PI * -0.1);
                    ctx.textAlign = "left";
                    ctx.fillStyle = this.board.colors.specialText;
                    ctx.strokeStyle = this.board.colors.specialText;
                    ctx.font = "45pt Calibri";
                    ctx.fillText("SIX", 0, 0);
                    ctx.restore();
                } else if (n == 9) {
                    ctx.save();
                    ctx.translate(515 + offset[n], 275);
                    ctx.rotate(Math.PI * -0.1);
                    ctx.textAlign = "left";
                    ctx.fillStyle = this.board.colors.specialText;
                    ctx.strokeStyle = this.board.colors.specialText;
                    ctx.font = "30pt Calibri";
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
            ctx.moveTo(1200, 455);
            ctx.lineTo(1200, 500);
            ctx.lineTo(1900, 500);
            ctx.lineTo(1900, 455);
            ctx.lineTo(1195, 455);
            ctx.stroke();
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.finalText;
            ctx.strokeStyle = this.board.colors.finalText;
            ctx.font = "40pt Calibri";
            ctx.fillText("SEVEN", 1550, 493);
        },
        isClickedRegion: function(x, y) {
            if (x > 1200 && x < 1900 && y > 455 && y < 500) {
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
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "35pt Calibri";
            ctx.fillText("Hard", 1375, 545);
            ctx.fillText("SIX", 1375, 590); 
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
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "35pt Calibri";
            ctx.fillText("Hard", 1725, 545);
            ctx.fillText("10", 1725, 590); 
        },
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
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "35pt Calibri";
            ctx.fillText("Hard", 1375, 645);
            ctx.fillText("8", 1375, 690); 
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
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "35pt Calibri";
            ctx.fillText("Hard", 1725, 645);
            ctx.fillText("4", 1725, 690); 
        },
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
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "35pt Calibri";
            ctx.fillText("Ace", 1325, 745);
            ctx.fillText("Two", 1325, 790); 
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
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "35pt Calibri";
            ctx.fillText("Snake", 1550, 745);
            ctx.fillText("Eyes", 1550, 790); 
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
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "35pt Calibri";
            ctx.fillText("Six", 1775, 745);
            ctx.fillText("Six", 1775, 790); 
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
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "35pt Calibri";
            ctx.fillText("Five", 1375, 845);
            ctx.fillText("Six", 1375, 890); 
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
            this.drawText();
        },
        drawText: function() {
            var ctx = this.board.context;
            ctx.textAlign = "center";
            ctx.fillStyle = this.board.colors.specialText;
            ctx.strokeStyle = this.board.colors.specialText;
            ctx.font = "35pt Calibri";
            ctx.fillText("Five", 1725, 845);
            ctx.fillText("Six", 1725, 890); 
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
            ctx.font = "40pt Calibri";
            ctx.fillText("CRAPS", 1550, 943);
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
            ctx.font = "40pt Calibri";

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
            ctx.font = "40pt Calibri";

						ctx.strokeStyle = this.board.colors.lines;
						ctx.beginPath();
						ctx.arc(930, 900, 30, 2 * Math.PI, false);
						ctx.textAlign = "left";
						ctx.font = "14pt Calibri";
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
            ctx.font = "40pt Calibri";

						ctx.strokeStyle = this.board.colors.lines;
						ctx.beginPath();
						ctx.arc(1000, 900, 30, 2 * Math.PI, false);
						ctx.textAlign = "left";
						ctx.font = "14pt Calibri";
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
				World
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
						//var _bets = _CRAPS.dealer.betManager.bets
						//for(bet in _bets){
						//	_bets[bet].draw();
						//}
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
						ctx.font = "20pt Calibri";
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
						ctx.strokeStyle = this.colors.pointOff;
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.fillStyle = this.colors.text;
						ctx.font = "25pt Calibri";
						ctx.fillText('OFF', 1103, 70);
						ctx.stroke();
						ctx.closePath();
					}
					switch(GameState.point){
					case 4:
						ctx.beginPath();
						ctx.lineWidth = 5;
						ctx.arc(550, 162.5, 30, 2 * Math.PI, false);
						ctx.fillStyle = this.colors.pointOn;
						ctx.fill();
						ctx.strokeStyle = this.colors.pointOn;
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.fillStyle = this.colors.buttonText;
						ctx.font = "25pt Calibri";
						ctx.fillText('ON', 528, 172.5);
						ctx.stroke();
						ctx.closePath();
						break;
					case 5:
						ctx.beginPath();
						ctx.lineWidth = 5;
						ctx.arc(650, 162.5, 30, 2 * Math.PI, false);
						ctx.fillStyle = this.colors.pointOn;
						ctx.fill();
						ctx.strokeStyle = this.colors.pointOn;
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.fillStyle = this.colors.buttonText;
						ctx.font = "25pt Calibri";
						ctx.fillText('ON', 628, 172.5);
						ctx.stroke();
						ctx.closePath();
						break;
					case 6:
						ctx.beginPath();
						ctx.lineWidth = 5;
						ctx.arc(750, 162.5, 30, 2 * Math.PI, false);
						ctx.fillStyle = this.colors.pointOn;
						ctx.fill();
						ctx.strokeStyle = this.colors.pointOn;
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.fillStyle = this.colors.buttonText;
						ctx.font = "25pt Calibri";
						ctx.fillText('ON', 728, 172.5);
						ctx.stroke();
						ctx.closePath();
						break;
					case 8:
						ctx.beginPath();
						ctx.lineWidth = 5;
						ctx.arc(850, 162.5, 30, 2 * Math.PI, false);
						ctx.fillStyle = this.colors.pointOn;
						ctx.fill();
						ctx.strokeStyle = this.colors.pointOn;
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.fillStyle = this.colors.buttonText;
						ctx.font = "25pt Calibri";
						ctx.fillText('ON', 828, 172.5);
						ctx.stroke();
						ctx.closePath();
						break;
					case 9:
						ctx.beginPath();
						ctx.lineWidth = 5;
						ctx.arc(950, 162.5, 30, 2 * Math.PI, false);
						ctx.fillStyle = this.colors.pointOn;
						ctx.fill();
						ctx.strokeStyle = this.colors.pointOn;
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.fillStyle = this.colors.buttonText;
						ctx.font = "25pt Calibri";
						ctx.fillText('ON', 928, 172.5);
						ctx.stroke();
						ctx.closePath();
						break;
					case 10:
						ctx.beginPath();
						ctx.lineWidth = 5;
						ctx.arc(1050, 162.5, 30, 2 * Math.PI, false);
						ctx.fillStyle = this.colors.pointOn;
						ctx.fill();
						ctx.strokeStyle = this.colors.pointOn;
						ctx.stroke();
						ctx.closePath();
						ctx.beginPath();
						ctx.fillStyle = this.colors.buttonText;
						ctx.font = "25pt Calibri";
						ctx.fillText('ON', 1028, 172.5);
						ctx.stroke();
						ctx.closePath();
						break;
					default:
						return;
					}
					//ctx.fillText('Point: ' + ((GameState.point>0)?GameState.point:'None'), 1200, 75);
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
/*
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
		perimeterThicknessAdjust: {
			l: (_l + thick.boardframe/2),
			t: (_t + thick.boardframe/2),
			w: (_w - thick.boardframe),
			h: (_h - thick.boardframe)
		},
		perimeterAdjust: {
			l: function(n){
				return n + thick.boardframe;
			},
			t: function(n){
				return n + thick.boardframe;
			},
			w: function(n){
				return n - thick.boardframe;
			},
			h: function(n){
				return n - thick.boardframe;
			},
			r: function(n){
				return this.w(n);
			},
			b: function(n){
				return this.h(n);
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
		line: function(x1, y1, x2, y2, etc){
			this.preserveContext();
			board.beginPath();
			board.moveTo(x1, y1);
			board.lineTo(x2, y2);
			etc = $.extend({
				color: '#000',
				t: 1 // thickness
			}, etc);
			board.lineWidth = etc.t;
			board.strokeStyle = etc.color;
			board.lineCap = "butt";
			board.stroke();
			this.restoreContext();
		},
		curve: function(x1, y1, x2, y2, xc, yc, etc){ // Starting X, Starting Y, Ending X, Ending Y, Control Point X Control Point Y
			this.preserveContext();
			board.beginPath();
			board.moveTo(x1, y1);
			board.quadraticCurveTo(xc, yc, x2, y2);
			etc = $.extend({
				color: '#000',
				t: 1 // thickness
			}, etc);
			board.lineWidth = etc.t;
			board.strokeStyle = etc.color;
			board.lineCap = "butt";
			board.stroke();
			this.restoreContext();
		},
		fillRect: function(x, y, w, h, color){
			this.preserveContext();
			board.fillStyle = color;
			board.fillRect(x, y, w, h);
			this.restoreContext();
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
			pta = this.perimeterThicknessAdjust;
			d.strokeRect(pta.l, pta.t, pta.w, pta.h, {color: colors.black, t: thick.boardframe});
			//d.strokeRect(_l, _t, _w, _h, {color: colors.black, t: thick.boardframe});
		}
	}
}
*/