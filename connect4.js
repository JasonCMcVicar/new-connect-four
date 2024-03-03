"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    let thisIsARow = [];

    for (let j = 0; j < WIDTH; j++) {
      thisIsARow.push(null);
    }
    board.push(thisIsARow);
  }
  // let's take a look at our virtual board (board in memory)
  console.log("board variable = ", board);
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  // create the top row that selects which column the piece will drop down
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // TODO: add comment for this code
  // constructs the dotted line 'drop boxes' one row above our actual board
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    let row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");
      // TODO: add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      cell.setAttribute("id", `${y}-${x}`);
      // TODO: append the table cell to the table row
      row.append(cell);
    }
    // TODO: append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  for (let i = 0; i < HEIGHT; i++) {
    if (board[(HEIGHT - 1) - i][x] === null) {
      return ((HEIGHT - 1) - i);
    }
  }
  return null;
}

// COURSE SOLUTION

// function findSpotForCol(x) {
//   for (let y = HEIGHT - 1; y >= 0; y--) {
//     if (!board[y][x]) {
//       return y;
//     }
//   }
//   return null;
// }

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const targetCell = document.getElementById(`${y}-${x}`);
  const playedPiece = document.createElement("div");
  // set attributes
  // set player
  let player = '';
  currPlayer === 1 ? player = 'player1' : player = 'player2';
  playedPiece.classList.add('piece', player);
  targetCell.appendChild(playedPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  const fullCheck = (currentSpot) => currentSpot !== null;
  if (board[0].every(fullCheck)) {
    endGame(`Tie Game`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    // check only color of currPlayer

    // what does 'cells' look like?
    // let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];


    for (let i = 0; i < cells.length; i++) {
      // first of all, x and y have actual numerical values, so...
      // x + 1 has a concrete (knowable) value
      // what is cells[0]?
      // = [y,x]
      // y = cells[i][0]
      // x = cells[i][1]
      // what is cells[1]?
      // = [y, x + 1]
      // therfore, let's make sure the values are in bound...
      // greater than or equal to zero and less than the HEIGHT or WIDTH
      // measure each one individually

      let y = cells[i][0];
      let x = cells[i][1];

      if (y >=0 && y < HEIGHT && x >= 0 && x < WIDTH) {
        if (board[y][x] === currPlayer) {
          continue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;

    // THIS WAS THE COURSE SOLUTION: COVERS THE ENTIRE STUB FUNCTION

    // return cells.every(
    //   ([y, x]) =>
    //     y >= 0 &&
    //     y < HEIGHT &&
    //     x >= 0 &&
    //     x < WIDTH &&
    //     board[y][x] === currPlayer
    // );
}

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  // THIS IS CHECKING THE ENTIRE BOARD
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDR = [[y, x], [y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
// Optional final step to add animation of the piece dropping
// If you change the .piece divs to be positioned absolutely, you can animate
// the top CSS property to animate the pieces so they appear to drop down
// working with relative/absolute positioning
