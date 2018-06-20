var canvas = document.getElementById('puzzle');
var context = canvas.getContext('2d');

// 3, 4 o 5 piezas
var tileCount = document.getElementById('scale').value;

//Tamaño piezas
var pieceWidth;
var pieceHeight;
var puzzleWidth;
var puzzleHeight;

// Pieza clicada
var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

// Pieza vacia
var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

var solved = false;
var boardParts;

var img;

function init(puzzle){
  img = new Image();
  img.src = puzzle;
  img.addEventListener('load', onImage, false);
  setBoard();
  drawTiles();
  cronometro.start();
}

function newPuzzle(imgs) {
  console.log(imgs)
  cronometro.stop();
  cronometro.restart();
  init(imgs.src);

}

function onImage(e){
  pieceWidth = Math.floor(img.width / tileCount);
  pieceHeight = Math.floor(img.height / tileCount);
  puzzleWidth = img.width;
  puzzleHeight = img.height;
  canvas.width = puzzleWidth;
  canvas.height = puzzleHeight;
  canvas.style.border = "1px solid black";

  drawTiles();
}

// Dificultad
document.getElementById('scale').onchange = function() {
  tileCount = this.value;
  pieceWidth = Math.floor(img.width / tileCount);
  pieceHeight = Math.floor(img.height / tileCount);
  setBoard();
  drawTiles();
};


// Cliquear piezas
document.getElementById('puzzle').onclick = function(e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / pieceWidth);
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / pieceHeight);
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
  	console.log(clickLoc);
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    setTimeout(function() {alert("You solved it!");}, 500);
  }
};


// Creando un Board con capsulas para las piezas
function setBoard() {
  boardParts = new Array(tileCount);
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i;
      boardParts[i][j].y = (tileCount - 1) - j;
    }
  }
  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
  solved = false;
}


// Dibujando las piezas en el Board
function drawTiles() {
  context.clearRect ( 0 , 0 , puzzleWidth , puzzleHeight );
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        context.drawImage(img, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight,
            i * pieceWidth, j * pieceHeight, pieceWidth, pieceHeight);
      }
    }
  }
}

// Mover piezas
function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  } else {
  	cronometro.stop();
  }
}

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}


function checkSolved() {
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}