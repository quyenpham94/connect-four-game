/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])




/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++){
    board.push(Array.from({length: WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board');
  
  // create tag to define row of cells in board
  const top = document.createElement("tr");
  // create attribute to tr tag, its gonna be the first row
  top.setAttribute("id", "column-top");
  // add event listener to the first row, so user can click on the first row
  top.addEventListener("click", handleClick);

  // creating x cell to the first row
  for (var x = 0; x < WIDTH; x++) {
    // create tag td to add data into row, then create attribute 'id' to that td
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    // adding x cell to the first row, id will be number of its column
    top.append(headCell);
    
  }

 board.append(top); // adding those cells of the first row into board/table

  
  // make main part of the board, those cells aren't clickable
  for (let y = 0; y < HEIGHT; y++) {
    // create tag to define row of cells in board
    const row = document.createElement("tr");

    // create tag to define column of cells in board
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // set id to each 'td' that shows the location of cells (row - column)
      cell.setAttribute("id", `${y}-${x}`);
      // adding cell into row
      row.append(cell);
    }
    // adding row into board/table
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  
  for (let y = HEIGHT - 1; y >= 0; y--) { //-1 because the first row is for user click
    if (!board[y][x]) { 
      return y; // if there is undefined, return value of row
    }
  }
  return null; 
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);
  
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
board[y][x] = currPlayer; //currPlayer = 1;
// add line to update in-memory board
placeInTable(y,x);
  


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);// message alert pop up
  }

  // check for tie
  // check if all cells in board are filled; if so call, call endGame
  if(board.every(row => row.every(cell => cell))){
    return endGame('Tie!');// message alert pop up
  }
  
  // switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }


  // this is a nested loop to check 2D-board if there is a column, a row or a diagonal that has four cells in the same color next to each other
  // loop through rows 
  for (var y = 0; y < HEIGHT; y++) {
    // loop through columns
    for (var x = 0; x < WIDTH; x++) {
      // check for 4 pieces in row
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // check for 4 cells in columns
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // check for 4 cells in diagonal to the right
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // check for 4 cells in diagonal to the left
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
makeBoard(),
makeHtmlBoard()
// restart the game
const startBtn = document.querySelector('.start-game');

function restart() {
  restart = location.reload();
}
startBtn.addEventListener('click', restart, false)



ythtj


