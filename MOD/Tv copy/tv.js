var canvas;
var ctx;
var video;
var volumbar;
var cameras = [];
var procesoID;

function main() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  CreateScene();

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  video.addEventListener('play', render);
  volumbar.addEventListener('change', VolumeControl);
  var i = 1;
  procesoID = setInterval( function() { ChooseCam(i);if(i >= 4) {i=1} else {i++}}, 5000);
}

function CreateScene() {
  //asignamos las barras del tiempo del video y del volumen
  volumbar = document.getElementById("volume-bar");
  volumbar.value = 1;

  //cámaras y guardarlas en un array
  var c1 = document.getElementById("cam1");
  var c2 = document.getElementById("cam2");
  var c3 = document.getElementById("cam3");
  var c4 = document.getElementById("cam4");
  cameras.push(c1,c2,c3,c4);

  //selector cámaras
  ChooseCam(1);
}

function render() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(render);
}

function Play() {
  if (video.paused || video.ended) {
    document.getElementById("play-pause").innerHTML = "u";
    for (var i = 0; i < cameras.length; i++) {
      cameras[i].play();
    }
  }else {
    document.getElementById("play-pause").innerHTML = "P";
    for (var i = 0; i < cameras.length; i++) {
      cameras[i].pause();
    }
  };
}

function VolumeControl() {
  video.volume = volumbar.value;
}

function ChooseCam(x) {
  if (x == 1) {
      Select(1);
    }
  else if (x == 2) {
      Select(2);
    }
  else if (x == 3) {
      Select(3);
    }
  else {
      Select(4);
  }
}

function Select(y) {
    if (video != undefined){video.muted = true;}

    video = document.getElementById("cam" + y);
    video.muted = false;
    for (var i = 1; i <= cameras.length; i++) {
      if (i == y) {
        document.getElementById("cam" + i).style.border = "thick solid green";
      }else {
        document.getElementById("cam" + i).style.border = "none";
      }
    }
  }