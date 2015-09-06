function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

var drawImage = function(){
  var text = (document.getElementById('inputText').value||'TYPE IN THE BOX!').toUpperCase();
  console.log("Drawing",text);
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var iterations = 100000;

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
  context.clearRect(0, 0, w, h);
  // Draw a text, read it as bitmap, map it into circles to be drawn.
  context.font="200 30px Sans";
  wrapText(context, text, 5, 30, 180, 24);
  var data32 = new Uint32Array(context.getImageData(0, 0, w, h).data.buffer);
  var msg = [];
  var scale = 8;
  context.clearRect(0, 0, w, h);
  for(i = 0; i < data32.length; i = i+1) {
    if (data32[i] & 0xff000000) {
      msg.push({
        x: (i % w) * scale,
        y: ((i * scale / w)|0)
      });
    }
  }

  var circles = [];
  for(var i=0; i < iterations; i++){

    var centerX, centerY, radius, colors;

    // We draw the msg first, then fill other parts.
    if(i < msg.length){
      centerX = msg[i].x;
      centerY = msg[i].y;
      radius = randBetween(6, 9);
      colors = onColors2;
    } else {
      centerX = randBetween(0,canvas.width);
      centerY = randBetween(0,canvas.height);
      radius = randBetween(8, 20);
      colors = offColors2;
    }

    var color = colors[randBetween(0,colors.length)];

    // Dumb collision detection.
    var  collided = false;
    for (var j = 0; j < circles.length; j ++) {
      var circle = circles[j];
      var dist = Math.sqrt((circle.x - centerX)*(circle.x - centerX) + (circle.y - centerY)*(circle.y - centerY));
      if (dist < (circle.radius + radius)) {
        collided = true;
        break;
      }
    }

    // Draw the circles on canvas
    if(!collided){
      circles.push({x: centerX, y: centerY, radius: radius});
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();
    }

  }
}
drawImage();
