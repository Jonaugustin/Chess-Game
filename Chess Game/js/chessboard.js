//Initalize Board
"use strict";
//Global Objects, Variables & Arrays
const size = 8;
let preset = [["BR", "BN", "BA", "BQ", "BK", "BA", "BN", "BR"],
["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
["E", "E", "E", "E", "E", "E", "E", "E"],
["E", "E", "E", "E", "E", "E", "E", "E"],
["E", "E", "E", "E", "E", "E", "E", "E"],
["E", "E", "E", "E", "E", "E", "E", "E"],
["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
["WR", "WN", "WA", "WQ", "WK", "WA", "WN", "WR"]];

let board = [];
let tempieces = [];

//Classes
class Piece {
    //Properties
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.attack = false;
        this.eliminate = true;
        this.highlight = false;
        this.select = false;
        this.team = "W";
        this.unit = -1;
    }
    //Methods
    update(i, j) {
        let temp = this;
        board[this.x][this.y] = "EMPTY";
        document.getElementById("" + this.x + "" + "_" + "" + this.y + "").innerHTML = "";
        temp.x = Number(i);
        temp.y = Number(j);
        let element = document.getElementById("" + this.x + "" + "_" + "" + this.y + "");
        switch (this.team) {
            case "W":
                element.style.color = "white";
                break;
            case "B":
                element.style.color = "black";
                break;
        }
        element.innerHTML = this.image;
        board[i][j] = temp;

        this.clearlight();

        console.log(board);
    }
    light(r, c) {

        if (board[r][c] == "EMPTY") {
            let element = document.getElementById("" + r + "" + "_" + "" + c + "");
            element.style.color = "yellow";
            element.innerHTML = this.image;
            board[r][c] = "HIGHLIGHT";
        }

    }
    redlight(r, c) {
        if (board[r][c].team != this.team && board[r][c].name != "King") {
            let element = document.getElementById("" + r + "" + "_" + "" + c + "");
            element.style.color = "red";
            board[r][c].attack = true;
        }
    
    }
    attack() {

    }
    clearlight() {
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                let element = document.getElementById("" + r + "" + "_" + "" + c + "");
                if (board[r][c] == "HIGHLIGHT") {
                    element.innerHTML = "";
                    board[r][c] = "EMPTY";
                } 
          
                    switch (board[r][c].team) {
                        case "W":
                            element.style.color = "white";
                            break;
                        case "B":
                            element.style.color = "black";
                    }

            }
        }
    }
}
class Rook extends Piece {
    //Properties
    constructor(x, y) {
        super(x, y);
        this.name = "Rook";
        this.image = "♜";
        this.castle = false;
    }
    //Methods
    move() {

        for (let r = this.x - 1; r >= 0; r--) {
            if (board[r][this.y] != "EMPTY") {
                console.log(this);
                this.redlight(r, this.y);
                break;
            } else {
                this.light(r, this.y);
            }
        }
        for (let r = this.x + 1; r < 8; r++) {
            if (board[r][this.y] != "EMPTY") {
                this.redlight(r, this.y);
                break;
            } else {
                this.light(r, this.y);
            }
        }
        for (let c = this.y + 1; c < 8; c++) {
            if (board[this.x][c] != "EMPTY") {
                this.redlight(this.x, c);
                break;
            } else {
                this.light(this.x, c);
            }
        }
        for (let c = this.y - 1; c >= 0; c--) {
            if (board[this.x][c] != "EMPTY") {
                this.redlight(this.x, c);
                break;
            } else {
                this.light(this.x, c);
            }
        }
    }
}
class Knight extends Piece {
    //Properties
    constructor(x, y) {
        super(x, y);
        this.name = "Knight";
        this.image = "♘";
    }
    //Methods
    move() {
        if ((this.x + 1) < 8 && (this.y + 2) < 8) {
            if (board[this.x + 1][this.y + 2] == "EMPTY") {
                this.light(this.x + 1, this.y + 2);
            }
        }
        if ((this.x - 2) >= 0 && (this.y - 1) >= 0) {
            if (board[this.x - 2][this.y - 1] == "EMPTY") {
                this.light(this.x - 1, this.y - 2);
            }
        }
        if ((this.x + 2) < 8 && (this.y + 1) < 8) {
            if (board[this.x + 2][this.y + 1] == "EMPTY") {
                this.light(this.x + 2, this.y + 1);
            }
        }
        if ((this.x + 1) < 8 && (this.y - 2) >= 0) {
            if (board[this.x + 1][this.y - 2] == "EMPTY") {
                this.light(this.x + 1, this.y - 2);
            }
        }
        if ((this.x - 1) >= 0 && (this.y + 2) < 8) {
            if (board[this.x - 1][this.y + 2] == "EMPTY") {
                this.light(this.x - 1, this.y + 2);
            }
        }
        if ((this.x - 2) >= 0 && (this.y - 1) >= 0) {
            if (board[this.x - 2][this.y - 1] == "EMPTY") {
                this.light(this.x - 2, this.y - 1);
            }
        }
        if ((this.x + 2) < 8 && (this.y - 1) >= 0) {
            if (board[this.x + 2][this.y - 1] == "EMPTY") {
                this.light(this.x + 2, this.y - 1);
            }
        }
        if ((this.x - 2) >= 0 && (this.y + 1) < 8) {
            if (board[this.x - 2][this.y + 1] == "EMPTY") {
                this.light(this.x - 2, this.y + 1);
            }
        }

    }
}
class Archbishop extends Piece {
    //Properties
    constructor(x, y) {
        super(x, y);
        this.name = "Archbishop";
        this.image = "♝";
    }
    //Methods
    move() {
        let x = this.x + 1;
        let y = this.y + 1;
        while (x < 8 && y < 8) {
            if (board[x][y] != "EMPTY") {
                this.redlight(x,y);
                break;
            }
            this.light(x, y);
            x++;
            y++;
        }
        x = this.x - 1;
        y = this.y - 1;
        while (x >= 0 && y >= 0) {
            if (board[x][y] != "EMPTY") {
                this.redlight(x,y);
                break;
            }
            this.light(x, y);
            x--;
            y--;
        }
        x = this.x - 1;
        y = this.y + 1;
        while (x >= 0 && y < 8) {
            if (board[x][y] != "EMPTY") {
                this.redlight(x,y);
                break;
            }
            this.light(x, y);
            x--;
            y++;
        }
        x = this.x + 1;
        y = this.y - 1;
        while (x < 8 && y >= 0) {
            if (board[x][y] != "EMPTY") {
                this.redlight(x,y);
                break;
            }
            this.light(x, y);
            x++;
            y--;
        }
    }
}
class Queen extends Piece {
    //Properties
    constructor(x, y) {
        super(x, y);
        this.name = "Queen";
        this.image = "♕";
    }
    //Methods
    move() {
        for (let r = this.x - 1; r >= 0; r--) {
            if (board[r][this.y] != "EMPTY") {
                break;
            } else {
                this.light(r, this.y);
            }
        }
        for (let r = this.x + 1; r < 8; r++) {
            if (board[r][this.y] != "EMPTY") {
                break;
            } else {
                this.light(r, this.y);
            }
        }
        for (let c = this.y + 1; c < 8; c++) {
            if (board[this.x][c] != "EMPTY") {
                break;
            } else {
                this.light(this.x, c);
            }
        }
        for (let c = this.y - 1; c >= 0; c--) {
            if (board[this.x][c] != "EMPTY") {
                break;
            } else {
                this.light(this.x, c);
            }
        }
        let x = this.x + 1;
        let y = this.y + 1;
        while (x < 8 && y < 8) {
            if (board[x][y] != "EMPTY") {
                break;
            }
            this.light(x, y);
            x++;
            y++;
        }
        x = this.x - 1;
        y = this.y - 1;
        while (x >= 0 && y >= 0) {
            if (board[x][y] != "EMPTY") {
                break;
            }
            this.light(x, y);
            x--;
            y--;
        }
        x = this.x - 1;
        y = this.y + 1;
        while (x >= 0 && y < 8) {
            if (board[x][y] != "EMPTY") {
                break;
            }
            this.light(x, y);
            x--;
            y++;
        }
        x = this.x + 1;
        y = this.y - 1;
        while (x < 8 && y >= 0) {
            if (board[x][y] != "EMPTY") {
                break;
            }
            this.light(x, y);
            x++;
            y--;
        }
    }
}
class King extends Piece {
    //Properties
    constructor(x, y) {
        super(x, y);
        this.name = "King";
        this.image = "♔";
        this.check = false;
        this.castle = false;
    }
    //Methods
    move() {
        if ((this.x + 1) < 8 && (this.y + 1) < 8) {
            if (board[this.x + 1][this.y + 1] == "EMPTY") {
                this.light(this.x + 1, this.y + 1);
            }
        }
        if ((this.x - 1) >= 0 && (this.y - 1) >= 0) {
            if (board[this.x - 1][this.y - 1] == "EMPTY") {
                this.light(this.x - 1, this.y - 1);
            }
        }
        if ((this.x) < 8 && (this.y + 1) < 8) {
            if (board[this.x][this.y + 1] == "EMPTY") {
                this.light(this.x, this.y + 1);
            }
        }
        if ((this.x + 1) < 8 && (this.y - 1) >= 0) {
            if (board[this.x + 1][this.y - 1] == "EMPTY") {
                this.light(this.x + 1, this.y - 1);
            }
        }
        if ((this.x - 1) >= 0 && (this.y + 1) < 8) {
            if (board[this.x - 1][this.y + 1] == "EMPTY") {
                this.light(this.x - 1, this.y + 1);
            }
        }
        if ((this.x) >= 0 && (this.y - 1) >= 0) {
            if (board[this.x][this.y - 1] == "EMPTY") {
                this.light(this.x, this.y - 1);
            }
        }
        if ((this.x + 1) < 8 && (this.y) >= 0) {
            if (board[this.x + 1][this.y] == "EMPTY") {
                this.light(this.x + 1, this.y);
            }
        }
        if ((this.x - 1) >= 0 && (this.y) < 8) {
            if (board[this.x - 1][this.y] == "EMPTY") {
                this.light(this.x - 1, this.y);
            }
        }
    }
}
class Pawn extends Piece {
    //Properties 
    constructor(x, y) {
        super(x, y);
        this.name = "Pawn";
        this.image = "♟︎";
        this.initial = false;
    }
    //Methods
    move() {
        if (this.initial == false) {
            let temp = this.x;
            for (let r = 0; r < 2; r++) {
                temp += this.unit;
                if (board[temp][this.y] != "EMPTY") {
                    break;
                } else {
                    this.light(temp, this.y);
                }

            }
            this.initial = true;
        } else {
            this.light(this.x + this.unit, this.y);

            console.log(this.x);
        }

    }

}
//Functions
for (let r = 0; r < size; r++) {
    board.push([]);
    for (let c = 0; c < size; c++) {
        let tempbreak = preset[r][c].split("");
        switch (tempbreak[1]) {
            case "R":
                board[r][c] = new Rook(r, c);
                break;
            case "N":
                board[r][c] = new Knight(r, c)
                break;
            case "A":
                board[r][c] = new Archbishop(r, c);
                break;
            case "Q":
                board[r][c] = new Queen(r, c);
                break;
            case "K":
                board[r][c] = new King(r, c);
                break;
            case "P":
                board[r][c] = new Pawn(r, c);
                break;
            default:
                board[r][c] = "EMPTY";
        }
        switch (tempbreak[0]) {
            case "B":
                board[r][c].team = "B";
                board[r][c].unit = 1;
                break;
            case "W":
                board[r][c].team = "W";
                break;
        }
    }
}
console.log(board);



