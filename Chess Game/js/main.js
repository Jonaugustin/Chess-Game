//Chess Game Implementation 
"use strict";
//Global Arrays, Objects, & Variables
// const size = 8;
// let board = "";
// for (let i = 0; i < size; i++) {
//     for (let j = 0; j < size; j++){
//         if ((i+j) % 2 == 0) {
//             board += "@";
//         } else {
//             board += "#";
//         }
//     }
//     board += "\n";
// }
// console.log(board);

// let array = [];
// for (let i = 0; i < size; i++) {
//     array.push([]);
//     for (let j = 0; j < size; j++) {
//         if((i+j)%2 == 0) {
//             array[i].push(1)
//         } else {
//             array[i].push(0);
//         }
//     }

// }
//  console.log(array);
let tempiece;
for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
        let element = document.createElement("div");

        if ((r + c) % 2 == 0) {
            element.style.backgroundColor = "burlywood";
        } else {
            element.style.backgroundColor = "bisque";
        }
        element.id = "" + r + "" + "_" + "" + c + "";
        if (board[r][c] != "EMPTY") {
            element.innerHTML = board[r][c].image;
            if (board[r][c].team == "B") {
                element.style.color = "black";
            } else {
                element.style.color = "white";
            }
        }
        element.dataset.column = c;
        element.dataset.row = r;
        element.addEventListener("click", clickHandler);
        document.getElementById("main").appendChild(element);
    }
}

function clickHandler(event) {
    let element = event.target;
    let div = {
        r: element.dataset.row,
        c: element.dataset.column
    };
    let piece = board[div.r][div.c];


    if (piece.attack != true) {
            if (piece != "EMPTY") {
            

        if (piece != "HIGHLIGHT") {
            piece.clearlight();
            piece.highlight = true;
        }

        if (piece.highlight == true) {
            element.style.color = "green";
            piece.highlight = false;
            tempiece = piece;
        }
    }
    if (piece == "HIGHLIGHT") {
        tempiece.update(div.r, div.c);
    }
        switch (piece.name) {
            case "Pawn":
                piece.move();
                break;
            case "Rook":
                piece.move();
                break;
            case "Archbishop":
                piece.move();
                break;
            case "Queen":
                piece.move();
                break;
            case "Knight":
                piece.move();
                break;
            case "King":
                piece.move();
                break;
            case "HIGHLIGHT":
                piece.update(div.r, div.c);
                if (board[div.r][div.c].attack == true) {
                    piece.update(div.r, div.c);
                }
                break;
            case "EMPTY":
                break;
        }
    } else {
        if (piece.select == true && piece.attack == false) {
            tempiece = piece;
        }
        let temp = tempiece; 
        board[tempiece.x][tempiece.y] = "EMPTY";
        document.getElementById("" + tempiece.x + "" + "_" + "" + tempiece.y + "").innerHTML = "";
        let el = document.getElementById("" + tempiece.x + "" + "_" + "" + tempiece.y + "");
        switch (tempiece.team) {
            case "W":
                el.style.color = "white";
                break;
            case "B":
                el.style.color = "black";
                break;
        }
        console.log(temp);
        element.innerHTML = tempiece.image;
        temp.x = div.r;
        temp.y = div.c;
        board[div.r][div.c] = temp;
        console.log(board);
        tempiece.clearlight();

        // board[div.r][div.c] = tempiece;
        // board[tempiece.x][tempiece.y] = "EMPTY";
        // tempiece.clearlight();
        // console.log(board);
    }




}