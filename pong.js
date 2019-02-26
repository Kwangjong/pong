// Frank Poth 08/13/2017

var context, controller, rectangleP1, rectangleP2, ball, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 800;

rectangleP1 = {

  height:80,
  width:8,
  x:760, // center of the canvas
  y:220,
  y_velocity:0,
  score:0

};

rectangleP2 = {

  height:80,
  width:8,
  x:40, // center of the canvas
  y:220,
  y_velocity:0,
  score:0

};

ball = {

  height:8,
  width:8,
  x:400, // center of the canvas
  y:250,
  x_velocity:2.59807621135, //cos(pi/6)*3
  y_velocity:3.89711431703, //sin(pi/6)*3
  stop:false

};

controller = {

  p1up:false,
  p1down:false,
  p2up:false,
  p2down:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 38:// up key
        controller.p1up = key_state;
      break;
      case 40:// down key
        controller.p1down = key_state;
      break;
      case 87:// up key
        controller.p2up = key_state;
      break;
      case 83:// down key
        controller.p2down = key_state;
      break;

    }

  }

};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

//draw score board
function scoreZero(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x+4*8, y);
  context.lineTo(x+4*8, y+8*8);
  context.lineTo(x, y+8*8);
  context.lineTo(x,y);
  context.stroke();
}

function scoreOne(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x+4*8, y-4);
  context.lineTo(x+4*8, y+8*8+4);
  context.stroke();
}

function scoreTwo(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x-4, y);
  context.lineTo(x+4*8, y);
  context.lineTo(x+4*8, y+4*8-4);
  context.lineTo(x, y+4*8-4);
  context.lineTo(x, y+8*8);
  context.lineTo(x+4*8+4, y+8*8);
  context.stroke();
}

function scoreThree(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x-4, y);
  context.lineTo(x+4*8, y);
  context.lineTo(x+4*8, y+8*8);
  context.lineTo(x-4, y+8*8);
  context.moveTo(x+4*8, y+4*8-4);
  context.lineTo(x-4, y+4*8-4);
  context.stroke();
}

function scoreFour(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x, y-4);
  context.lineTo(x, y+4*8-4);
  context.lineTo(x+4*8, y+4*8-4);
  context.moveTo(x+4*8, y-4);
  context.lineTo(x+4*8, y+8*8+4);
  context.stroke();
}

function scoreFive(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x+4*8+4, y);
  context.lineTo(x, y);
  context.lineTo(x, y+4*8-4);
  context.lineTo(x+4*8, y+4*8-4);
  context.lineTo(x+4*8, y+8*8);
  context.lineTo(x-4, y+8*8);
  context.stroke();
}

function scoreSix(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x+4*8+4, y);
  context.lineTo(x, y);
  context.lineTo(x, y+4*8-4);
  context.lineTo(x+4*8, y+4*8-4);
  context.lineTo(x+4*8, y+8*8);
  context.lineTo(x, y+8*8);
  context.lineTo(x, y+4*8);
  context.stroke();
}

function scoreSeven(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x, y+3*8);
  context.lineTo(x, y);
  context.lineTo(x+4*8, y);
  context.lineTo(x+4*8, y+8*8+4)
  context.stroke();
}


function scoreEight(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x-4, y);
  context.lineTo(x+4*8, y);
  context.lineTo(x+4*8, y+8*8);
  context.lineTo(x, y+8*8);
  context.lineTo(x,y);
  context.moveTo(x+4*8, y+4*8-4);
  context.lineTo(x-4, y+4*8-4);
  context.stroke();
}

function scoreNine(x,y) {
  context.setLineDash([]);
  context.strokeStyle = "#ffffff";
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(x-4, y);
  context.lineTo(x+4*8, y);
  context.lineTo(x+4*8, y+8*8);
  context.lineTo(x-4, y+8*8);
  context.moveTo(x+4*8, y+4*8-4);
  context.lineTo(x, y+4*8-4);
  context.lineTo(x, y);
  context.stroke();
}


function printScoreBoard(score1, score2) {
  var temp = score1.toString(); //score of p1
  var x = 438; //x coordinate of the scoreboard
  var i;
  for(i=0; i<temp.length; i++) {
    switch(temp.substring(i,i+1)) {
      case "0":
        scoreZero(x+i*60,30);
        break;
      case "1":
        scoreOne(x+i*60,30);
        break;
      case "2":
        scoreTwo(x+i*60,30);
        break;
      case "3":
        scoreThree(x+i*60,30);
        break;
      case "4":
        scoreFour(x+i*60,30);
        break;
      case "5":
        scoreFive(x+i*60,30);
        break;
      case "6":
        scoreSix(x+i*60,30);
        break;
      case "7":
        scoreSeven(x+i*60,30);
        break;
      case "8":
        scoreEight(x+i*60,30);
        break;
      case "9":
        scoreNine(x+i*60,30);
        break;
    }
  }
  temp = score2.toString(); //score of p2
  x = 330; //x coordinate of the scoreboard
  for(i=0; i<temp.length; i++) {
    switch(temp.substring(temp.length-i-1,temp.length-i)) {
      case "0":
        scoreZero(x-i*60,30);
        break;
      case "1":
        scoreOne(x-i*60,30);
        break;
      case "2":
        scoreTwo(x-i*60,30);
        break;
      case "3":
        scoreThree(x-i*60,30);
        break;
      case "4":
        scoreFour(x-i*60,30);
        break;
      case "5":
        scoreFive(x-i*60,30);
        break;
      case "6":
        scoreSix(x-i*60,30);
        break;
      case "7":
        scoreSeven(x-i*60,30);
        break;
      case "8":
        scoreEight(x-i*60,30);
        break;
      case "9":
        scoreNine(x-i*60,30);
        break;
    }

  }
}


loop = function() {

  if (controller.p1up) {
    if(rectangleP1.y>=0)
      rectangleP1.y_velocity -= 0.5;
  }

  if (controller.p1down) {
    if(rectangleP1.y<=500-80)
      rectangleP1.y_velocity += 0.5;
  }
  
  rectangleP1.y += rectangleP1.y_velocity;
  rectangleP1.y_velocity *= 0.9;// friction

  if (controller.p2up) {
    rectangleP2.y_velocity -= 0.5;
  }

  if (controller.p2down) {
    rectangleP2.y_velocity += 0.5;
  }
  
  rectangleP2.y += rectangleP2.y_velocity;
  rectangleP2.y_velocity *= 0.9;// friction

  ball.x+=ball.x_velocity;
  ball.y+=ball.y_velocity;

   // if rectangleP1 is going off the top of the screen
  if (rectangleP1.y < 0) {

    rectangleP1.y = 0;

  } else if (rectangleP1.y > 500-80) {// if rectangleP1 goes past bottom boundary

    rectangleP1.y = 500-80;

  }

   // if rectangleP2 is going off the top of the screen
  if (rectangleP2.y < 0) {

    rectangleP2.y = 0;

  } else if (rectangleP2.y > 500-80) {// if rectangleP2 goes past bottom boundary

    rectangleP2.y = 500-80;

  }

  // if ball is going off the top of the screen
  if (ball.y < 0) {

    ball.y = 0;
    ball.y_velocity = -1*ball.y_velocity;

  } else if (ball.y > 500-8) {// if ball goes past bottom boundary

    ball.y = 500-8;
    ball.y_velocity = -1*ball.y_velocity;

  }
  // if rectangleP1 is going off the left of the screen
  if (ball.x < 0) {

    ball.x = 0;
    sleep(1000); //pause for moment and change ball position to initial position
    ball.x = 400; // center of the canvas
    ball.y = 250;
    ball.x_velocity = -2.59807621135; //cos(pi/6)*3 //p2 missed so ball will start in p2's direction
    ball.y_velocity = 3.89711431703; //sin(pi/6)*3
    rectangleP1.score++;

  } else if (ball.x > 800-8) {// if rectangleP1 goes past right boundary

    ball.x = 800-8;
    sleep(1000);
    ball.x = 400; // center of the canvas
    ball.y = 250;
    ball.x_velocity = 2.59807621135; //cos(pi/6)*3 //p1 missed so ball will start in p1's direction
    ball.y_velocity = 3.89711431703; //sin(pi/6)*3
    rectangleP2.score++;
  }

  // if ball bounces players
  if (ball.x >=rectangleP1.x && ball.x <=rectangleP1.x+8 && ball.y>=rectangleP1.y && ball.y<=rectangleP1.y+80) {
    ball.x = rectangleP1.x-8;
    ball.x_velocity = -1*ball.x_velocity;

  } else if (ball.x <= rectangleP2.x+8 && ball.x >= rectangleP2.x && ball.y>=rectangleP2.y && ball.y<=rectangleP2.y+80) {
    ball.x = rectangleP2.x+8;
    ball.x_velocity = -1*ball.x_velocity;

  }

  context.fillStyle = "#202020";
  context.fillRect(0, 0, 800, 500);// x, y, width, height
  context.fillStyle = "#ffffff";// hex for white
  context.setLineDash([16,16]);
  context.strokeStyle = "#4c255b";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(400, 0);
  context.lineTo(400, 500);
  context.stroke();
  
  printScoreBoard(rectangleP1.score, rectangleP2.score);
  
  //draw ball and players
  context.beginPath();
  context.rect(rectangleP1.x, rectangleP1.y, rectangleP1.width, rectangleP1.height);
  context.fill();
  context.beginPath();
  context.rect(rectangleP2.x, rectangleP2.y, rectangleP2.width, rectangleP2.height);
  context.fill();
  context.beginPath();
  context.rect(ball.x, ball.y, ball.width, ball.height);
  context.fill();
  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
