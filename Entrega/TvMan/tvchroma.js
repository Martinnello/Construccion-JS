document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');
    var backcontext2 = back.getContext('2d');

    var cw,ch;

    v.addEventListener('play', function(){
        cw = canvas.width;
        ch = canvas.height;
        back.width = cw;
        back.height = ch;
        //draw(v,ctx,backcontext,cw,ch);
        drawrgb(v,ctx,backcontext2,cw,ch);
    },false);

},false);



function drawrgb(v,c,bc,w,h) {
    if(v.paused || v.ended) return false;
    // First, draw it into the backing canvas
    bc.drawImage(v,0,0,w,h);
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(0,0,w,h);
    // Loop through the pixels, turning them grayscale
    for(var i = 0; i < (idata.width * idata.height); i++) {
        idata[i * 4] = 0;
    }
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setTimeout(function(){ draw(v,c,bc,w,h); }, 0);
}