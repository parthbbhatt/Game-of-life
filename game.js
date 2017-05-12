/* Alan Watson 2017 */

loopSpeed = 1;
loop = true;
deadCellColour = "#555";
AliveCellColour = "#fff";
gridOn = true;

function buildBoard(width,height) {
    //width = 12;
    //height = 12;
    if (!width) {
        var width = document.getElementById('width').value;
    }
    if (!height) {
        var height = document.getElementById('height').value;
    }
    game = [];
    var i=0,
        i1, i2;
    for (i1 = 0; i1<height; i1++) {
        var row = [];
        for (i2 = 0; i2 < width; i2++) {
            row.push({id:i,alive:false,type:AliveCellColour,x:i2,y:i1});
            i++;
        }
        game.push(row);
    }
    gameLength = i;
    displayBoard();
}


function changeLoopSpeed() {
    loopSpeed = document.getElementById('loopSpeed').value;
}
function startLoop(start) {
    if (start) {
        loopRunning = true;
    }
    setTimeout(function () {
        updateBoard();
        if (loopRunning) {
            startLoop();
        }
    }, 1000/loopSpeed);
}

function updateBoard() {
    
    var height = game.length,
        tempGame = deepCopy(game),
        i1, i2,
        i=0;
    
    for (i1 = 0; i1<height; i1++) {
        var width = game[i1].length;
        for (i2 = 0; i2 < width; i2++) {
            //console.log(i1,i2)
            var dataCell = game[i1][i2],
                cell = document.getElementById('gameCell'+game[i1][i2].id);
            
            surroundings = totalSurroundings(tempGame,i2,i1,loop);
            
            if (surroundings <= 0) {
                game[i1][i2].alive = false;
            } else if (surroundings == 1) {
                game[i1][i2].alive = false;
            } else if (surroundings == 2) {
            } else if (surroundings == 3) {
                game[i1][i2].alive = true;
            } else if (surroundings >= 4) {
                game[i1][i2].alive = false;
            }
            
            
            i++;
        }
    }
    
    for (i1 = 0; i1<height; i1++) {
        var width = game[i1].length;
        for (i2 = 0; i2 < width; i2++) {
            //console.log(i1,i2)
            var dataCell = game[i1][i2],
                cell = document.getElementById('gameCell'+game[i1][i2].id);
            
            if (game[i1][i2].alive == true) {
                cell.style.backgroundColor = game[i1][i2].type;
                cell.alive = true;
            } else if (game[i1][i2].alive == false) {
                cell.alive = true;
                cell.style.backgroundColor = deadCellColour;
            }
            
            i++;
        }
    }
}

function displayBoard() {
    
    var height = game.length,
        i=0,
        board = "",
        i1, i2;
    for (i1 = 0; i1<height; i1++) {
        var width = game[i1].length;
        var row = "<tr>";
        for (i2 = 0; i2 < width; i2++) {
            var cell = '<td id="gameCell'+i+'" alive="false" class="gameSquare" x="'+i2+'" y="'+i1+'" onclick="cellClick('+i2+','+i1+')"></td>';
            row = row+cell;
            i++;
        }
        board = board+row;
    }
    document.getElementById('gameBoard').innerHTML = board;
}

function totalSurroundings(data,x,y,wrap) {
    var count = 0,
        width = data[0].length,
        height = data.length;
    //Up Row
    if (data[y-1] && y-1>=0) {
        //Up Left
        if (data[y-1][x-1] && x-1>=0) {
            if (data[y-1][x-1].alive == true) {
                count++;
            }
        }
        //Up Middle
        if (data[y-1][x].alive == true) {
            count++;
        }
        //Up Right
        if (data[y-1][x+1]) {
            if (data[y-1][x+1].alive == true) {
                count++;
            }
        }
    }
    //Middle Row
    if (data[y] && y>=0) {
        //Middle Left
        if (data[y][x-1] && x-1>=0) {
            if (data[y][x-1].alive == true) {
                count++;
                //console.log("thing")
            }
        }
        //Middle Right
        if (data[y][x+1] && x+1>=0) {
            if (data[y][x+1].alive == true) {
                count++;
                //console.log("thing");
            }
        }
    }
    //Down Row
    if (data[y+1] && y+1>=0) {
        //Down Left
        if (data[y+1][x-1] && x-1>=0) {
            if (data[y+1][x-1].alive == true) {
                count++;
            }
        }
        //Down Middle
        if (data[y+1][x]) {
            if (data[y+1][x].alive == true) {
                count++;
            }
        }
        //Down Right
        if (data[y+1][x+1]) {
            if (data[y+1][x+1].alive == true) {
                count++;
                //console.log('otherThing');
            }
        }
    }
    
    if (loop === true) {
        if (x == 0) {
            if (data[y-1]) {if (data[y-1][width-1]) {if (data[y-1][width-1].alive) {count++}}};
            if (data[y]) {if (data[y][width-1]) {if (data[y][width-1].alive) {count++}}};
            if (data[y+1]) {if (data[y+1][width-1]) {if (data[y+1][width-1].alive) {count++}}};
        } else if (x == width-1) {
            if (data[y-1]) {if (data[y-1][0]) {if (data[y-1][0].alive) {count++}}};
            if (data[y]) {if (data[y][0]) {if (data[y][0].alive) {count++}}};
            if (data[y+1]) {if (data[y+1][0]) {if (data[y+1][0].alive) {count++}}};
        }
        if (y == 0) {
            if (data[height-1]) {if (data[height-1][x-1]) {if (data[height-1][x-1].alive) {count++}}};
            if (data[height-1]) {if (data[height-1][x]) {if (data[height-1][x].alive) {count++}}};
            if (data[height-1]) {if (data[height-1][x+1]) {if (data[height-1][x+1].alive) {count++}}};
        } else if (y == height-1) {
            if (data[0]) {if (data[0][x-1]) {if (data[0][x-1].alive) {count++}}};
            if (data[0]) {if (data[0][x]) {if (data[0][x].alive) {count++}}};
            if (data[0]) {if (data[0][x+1]) {if (data[0][x+1].alive) {count++}}};
        }
    }
    
    return count;
}


function deepCopy(data) {
    var string = JSON.stringify(data);
    string = JSON.parse(string);
    return string;
}
function cellClick(x,y) {
    game[y][x].alive = !game[y][x].alive;
    
    if (game[y][x].alive) {
        document.getElementById('gameCell'+game[y][x].id).style.backgroundColor = game[y][x].type;
    } else {
        document.getElementById('gameCell'+game[y][x].id).style.backgroundColor = deadCellColour;
    }
}


function toggleGrid(btn) {
    gridOn = btn.checked;
    
    if (gridOn) {
        document.getElementById('gameBoard').style.backgroundColor = "#000";
    } else {
        document.getElementById('gameBoard').style.backgroundColor = "#555";
    }
    
    console.log(gridOn);
}



function toggleLoop(btn) {
    loop = btn.checked;
}

