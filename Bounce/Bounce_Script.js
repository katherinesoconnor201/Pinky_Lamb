const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
ctx.canvas.width = window.innerWidth - 100;
ctx.canvas.height = window.innerHeight - 50;

const intro = document.getElementById("intro");
const Single_Player = document.getElementById("Single_Player");
const Two_Player = document.getElementById("Two_Player");
const vs_Computer = document.getElementById("vs_Computer");

var box = cvs.height / 12;
var step = box / 5;
let score = 0;
let t = 0; // increases every 0.1 seconds
var nf = -100; // when t == nf, a new food is genrated
const rx_max = Math.floor(cvs.width / box) - 1;
const ry_max = Math.floor(cvs.height / box) - 3;

const f = new Image();
f.src = "images/cookie.png";
f.width = "40";
f.height = "40";

const b = new Image();
b.src = "images/flower.png";
b.width = "40";
b.height = "40";

let player = [];
let food = [];

var p1 = new Image()
p1.src = "images/Pinky_Lamb1.png";
p1.width = box;
p1.height = 1.2 * box;
var src1 = ["images/Pinky_Lamb4.png", "images/Pinky_Lamb3.png", "images/Pinky_Lamb2.png", "images/Pinky_Lamb1.png"];

var p2 = new Image();
p2.src = "images/Bear1.png";
p2.width = box;
p2.height = 1.2 * box;
var src2 = ["images/Bear4.png", "images/Bear3.png", "images/Bear2.png", "images/Bear1.png"];

function Start_Game(str) {
  score = 0;
  Single_Player.style.display = "none";
  Two_Player.style.display = "none";
  vs_Computer.style.display = "none";
  nf = 100;
  player[0] = {
    x: cvs.width / 2,
    y: cvs.height / 2,
    width: box,
    height: 1.2 * box,
    health: 3,
    image: p1,
    pics: src1,
    computer: false,
    name: "Pinky Lamb"
  }
  var comp = (str == "vs_Computer");
  if (str != "Single_Player") {
    k = ["0", "1", "2", "3"];
    player[1] = {
      x: 3 * box + cvs.width / 2,
      y: cvs.height / 2,
      width: box,
      height: 1.2 * box,
      health: 3,
      image: p2,
      pics: src2,
      computer: comp,
      name: "Bear"
    }
  }

  food[0] = {
    x: 0,
    y: cvs.height / 2 - f.height,
    X_step: Math.floor(Math.random() * 5 + 3),
    Y_step: Math.floor(Math.random() * 10 - 5),
    good: false,
    width: f.width,
    height: f.height
  
  }
}


function drawPlayer(rect1) {
  rect1.image.src = rect1.pics[rect1.health];

  ctx.drawImage(rect1.image, rect1.x, rect1.y, rect1.width, rect1.height);
  ctx.fillStyle = "black";
  //ctx.fillText(rect1.x + ", " + rect1.y, rect1.x, rect1.y, 400);
}

function NewFood() {
  var isGood = (Math.floor(Math.random() * 2) == 1);
  var newFood = {
    x: 0,
    y: cvs.height / 2 - f.height,
    X_step: Math.floor(Math.random() * (step / 2) + 2),
    Y_step: Math.floor(Math.random() * (step / 2) + 2),
    width: f.width,
    height: f.height,
    good: isGood
  }
  food.push(newFood);
}

function drawBackground() {
  ctx.fillStyle = "#e1aaff";
  ctx.fillRect(0, 0, cvs.width, 2 * box);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, cvs.width, 2 * box);
  ctx.fillStyle = "#c1ffaa";
  ctx.fillRect(0, 2 * box, cvs.width, cvs.height - 2 * box);
  ctx.strokeRect(0, 2 * box, cvs.width, cvs.height - 2 * box);
}

function inCompBounds(rect1) {
  if (rect1.y < 3 * box) {
    rect1.y = 3 * box;
  } else if (rect1.y + rect1.height + box > cvs.height) {
    rect1.y = cvs.height - rect1.height - box;
  } else if (rect1.x < box) {
    rect1.x = box;
  } else if (rect1.x + rect1.width + box > cvs.width) {
    rect1.x = cvs.width - rect1.width - box;
  }
}

function inBounds(rect1) {
  if (rect1.y <= 2 * box) {
    rect1.y = 2 * box + 1;
  } else if (rect1.y + rect1.height >= cvs.height) {
    rect1.y = cvs.height - rect1.height - 1;
  } else if (rect1.x <= 0) {
    rect1.x = 1;
  } else if (rect1.x + rect1.width >= cvs.width) {
    rect1.x = cvs.width - rect1.width - 1;
  }
}

function check_game_over() {
  var allDead = true;
  for (var i = 0; i < player.length; i++) {
    if (player[i].health >= 1) {
      allDead = false;
    }
  }
  if (allDead) {
    ctx.fillStyle = "white";
    ctx.font = "bold 100px Courier"
    ctx.fillText("GAMEOVER", cvs.width / 2 - cvs.width / 6, cvs.height / 2);
    ctx.strokeStyle = "black";
    ctx.strokeText("GAMEOVER", cvs.width / 2 - cvs.width / 6, cvs.height / 2);
    clearInterval(game);
  }
}

document.addEventListener("touchmove", clearIntro);
document.addEventListener("keydown", clearIntro);

function clearIntro() {
  intro.textContent = "";
  intro.style.borderStyle = "none";
  intro.style.boxShadow = "none";
}

//User Controls
let d = [];
document.addEventListener("touchmove", t_move);
document.addEventListener("keydown", k_down);
document.addEventListener("keyup", k_up);

function t_move(event) {
  console.log(event.touches[0].screenX);
  player[0].x = event.touches[0].screenX - cvs.offsetLeft - player[0].width / 2;
  player[0].y = event.touches[0].screenY - 175;
}

function k_down(event) {
  let k = event.keyCode;
  if (k == 37) d[0] = true;
  if (k == 38) d[1] = true;
  if (k == 39) d[2] = true;
  if (k == 40) d[3] = true;
  if (k == 65) d[4] = true;
  if (k == 87) d[5] = true;
  if (k == 68) d[6] = true;
  if (k == 83) d[7] = true;
}

function k_up(event) {
  let k = event.keyCode;
  if (k == 37) d[0] = false;
  if (k == 38) d[1] = false;
  if (k == 39) d[2] = false;
  if (k == 40) d[3] = false;
  if (k == 65) d[4] = false;
  if (k == 87) d[5] = false;
  if (k == 68) d[6] = false;
  if (k == 83) d[7] = false;
}

function collision(rect1, rect2, buffer) {
  if (rect1.x + buffer < rect2.x + rect2.width && //food is left
    rect1.x + rect1.width - buffer > rect2.x && //fod is right
    rect1.y + buffer < rect2.y + rect2.height && //food is above
    rect1.y + rect1.height - buffer > rect2.y) { //food is below
    // collision detected!
    return true;
  } else {
    return false;
  }
}

function CompMove(rect1, rect2) {
  var b = box;

  var isLeft = Math.abs(rect2.x + rect2.width - rect1.x) <= b;
  var isRight = Math.abs(rect1.x + rect1.width - rect2.x) <= b;
  var isAbove = Math.abs(rect2.y + rect2.height - rect1.y) <= b;
  var isBelow = Math.abs(rect1.y + rect1.height - rect2.y) <= b;

  /*if (isLeft) { player.x += step };
  if (isRight) { player.x -= step };
  if (isAbove) { player.y += step };
  if (isBelow) { player.y -= step };*/
  if (isLeft && isAbove) {//food is left & abpve
    rect1.x += step;// move right
    rect1.y += step;//move down
  } else if (isRight && isAbove) {//food is right & above
    rect1.x -= step;// move left
    rect1.y += step;//move down
  } else if (isRight && isBelow) {//food is right & below
    rect1.x -= step;// move left
    rect1.y -= step;//move up
  } else if (isLeft && isBelow) {//food is left & below
    rect1.x += step;// move right
    rect1.y -= step;//move up
  }/* else if (isLeft) {
    rect1.x += step;
  } else if (isRight) {
    rect1.x -= step;
  } else if (isAbove) {
    rect1.y += step;
  } else if (isBelow) {
    rect1.y -= step;
  }*/
  inCompBounds(rect1);
};

function movePlayers() {
  if (d[0]) player[0].x -= step;//left
  if (d[1]) player[0].y -= step;//up
  if (d[2]) player[0].x += step;//right
  if (d[3]) player[0].y += step;//down
  if (d[4]) player[1].x -= step;//left
  if (d[5]) player[1].y -= step;//up
  if (d[6]) player[1].x += step;//right
  if (d[7]) player[1].y += step;//down
  inBounds(player[0]);
  inBounds(player[1]);
}

function draw() {
  ctx.canvas.width = window.innerWidth - 100;
  ctx.canvas.height = window.innerHeight - 50;
  drawBackground();
  for (var i = 0; i < player.length; i++) {
    drawPlayer(player[i]);
  }

  //tiles of food
  for (let i = 0; i < food.length; i++) {
    if (food[i].good == false) {
      ctx.drawImage(b, food[i].x, food[i].y, b.width, b.height);
    } else {
      ctx.drawImage(f, food[i].x, food[i].y, f.width, f.height);
    }

    //moves food
    food[i].x += food[i].X_step;
    food[i].y += food[i].Y_step;

    //keeps food in bounds
    if (food[i].x >= (cvs.width - food[i].width) || food[i].x <= 0) {
      food[i].X_step = -1 * food[i].X_step;
    }
    if (food[i].y >= (cvs.height - food[i].height) || food[i].y <= 100) {
      food[i].Y_step = -1 * food[i].Y_step;
    }


    for (var k = 0; k < player.length; k++) {
      //moves computer if bad food is close to the computer
      if (food[i].good == false && player[k].computer) {
        CompMove(player[k], food[i]);
      }
      //Checks if you have eaten food
      if (collision(player[k], food[i], box / 8)) {
        if (food[i].good == false && player[k].health > 0) {
          player[k].health--;
          check_game_over(player[k]);
        }
        score++;
        food.splice(i, 1);
        break;
      }
    }
  }
  //done going through tiles of food

  movePlayers();

  t++;
  if (t == nf) {
    t = 0;
    nf--;
    NewFood();
  }

  //GAMEOVER
  /* if (foodX < 0 || foodX >= cvs.width || foodY < 2 * box || foodY >= cvs.height || collision(newHead, food)){
     clearInterval(game);
   }*/

  ctx.fillStyle = "white";
  ctx.font = "bold 45px Courier"
  ctx.fillText("Score: " + (food.length + score), box, 1.2 * box);
  //ctx.fillText("Lives: " + player[0].health, box * 7, 1.2 * box);

  if (player[0].health <= 0 && player[1].health > 0) {
    ctx.fillText("Bear Won!", 8*box, 1.2 * box);
  } else if (player[1].health <= 0 && player[0].health > 0){
    ctx.fillText("Pinky Lamb Won!", 8*box, 1.2 * box);
  }
};

//window.requestAnimationFrame(draw);
let game = setInterval(draw, 20);