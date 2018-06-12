var canvas = document.getElementById('puzzle');
var context = canvas.getContext('2d');

var tileCount = document.getElementById('scale').value;

var pieceWidth;
var pieceHeight;
var puzzleWidth;
var puzzleHeight;

var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

var solved = false;
var boardParts;

var img;

var timer = new Timer();

function init(puzzle){
  img = new Image();
  img.src = puzzle;
  img.addEventListener('load', onImage, false);
  setBoard();
}

function newPuzzle(imgs) {
  console.log(imgs);
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

document.getElementById('scale').onchange = function() {
  tileCount = this.value;
  pieceWidth = Math.floor(img.width / tileCount);
  pieceHeight = Math.floor(img.height / tileCount);
  setBoard();
  drawTiles();
};

document.getElementById('puzzle').onclick = function(e) {
    console.log()
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / pieceWidth);
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / pieceHeight);
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    setTimeout(function() {alert("You solved it!");}, 500);
  }
};

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

function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
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