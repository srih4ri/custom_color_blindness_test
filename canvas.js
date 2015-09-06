function wrapText(ctx, text, x, y, maxWidth, lineHeight, fontsize) {
  fontsize = 150 ;
  x = 0;
  y = fontsize;
  var words = text.split(' ');
  var line = '';
  context.font= 600 + " " +( fontsize )+"pt Sans";
  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += 1.1 * (fontsize);
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
var putDot = function(context,color,x,y,r){
  context.clearRect(x-r, y-r, 2 * r, 2*r);
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI, false);
  context.fillStyle = color||'red';
  context.fill();
}

var drawImage = function(){
  var text = (document.getElementById('inputText').value||'you are not color blind, type in the box!').toUpperCase();
  console.log("Drawing",text);
  var canvas = document.getElementById('myCanvas');
  var ctx = context = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  var randBetween = function randBetween(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Rejoice, not everyone sees all these colors differently.
  var offColors = [
    '#9CA594', '#ACB4A5', '#BBB964', '#D7DAAA', '#E5D57D', '#D1D6AF'
  ];
  var offColors2 = [
    '#F49427', '#C9785D', '#E88C6A', '#F1B081',
    '#F49427', '#C9785D', '#E88C6A', '#F1B081',
    '#F49427', '#C9785D', '#E88C6A', '#F1B081', '#FFCE00'
  ];
  var onColors = [
    '#F9BB82', '#EBA170', '#FCCD84'
  ];
  var onColors2 = [
    '#89B270', '#7AA45E',  '#B6C674',  '#7AA45E',  '#B6C674',
    '#89B270', '#7AA45E',  '#B6C674',  '#7AA45E',  '#B6C674',
    '#89B270', '#7AA45E',  '#B6C674',  '#7AA45E',  '#B6C674', '#FECB05'
  ];

  var w = context.canvas.width;
  var h = context.canvas.height;
  // Draw a text, read it as bitmap, map it into circles to be drawn.

  var circles = [];
  var w = context.canvas.width;
  var h = context.canvas.height;
  var xDotsCount = 150;
  var xIncrement = (w / xDotsCount);
  var yDotsCount = (h / xIncrement);
  var x = 0;
  var y = xIncrement;
  iterations = xDotsCount * yDotsCount;

  wrapText(context, text, xIncrement * 2, xIncrement * 2, w, xIncrement, xIncrement);

  var data32 = new Uint32Array(context.getImageData(0, 0, w, h).data.buffer);
  context.clearRect(0, 0, w, h);

  var msg = [];
  context.clearRect(0, 0, w, h);
  scale = (w * h)/data32.length;
  console.log(scale);
  console.log(data32);
  for(i = 0; i < data32.length; i = i+1) {
    if (data32[i] & 0xff000000) {
      msg.push({
        x: (i % w),
        y: (i / w )
      });
    }
  }


  for(var i=0; i < iterations; i++){
    x =  x + xIncrement;
    radius = xIncrement/2;
    colors = onColors2;
    var color = colors[randBetween(0,colors.length)];
    circles.push({x: x, y: y, radius: radius});
    putDot(context,color,x,y,radius);
    if((x + (2 * xIncrement)) > w){
      x = 0;
      y = y + xIncrement;
    }
  }
  for(var i = 0; i < msg.length; i++) {

   var m = msg[i];
    colors = offColors2;
    var color = colors[randBetween(0,colors.length)];
    x = (parseInt(m.x/xIncrement) ) * xIncrement;
    y = (parseInt(m.y/xIncrement) )* xIncrement;
    putDot(context,color,x,y,xIncrement/2);
  }

}
drawImage();
