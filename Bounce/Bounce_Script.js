const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
ctx.canvas.width = window.innerWidth - 100;
ctx.canvas.height = window.innerHeight - 50;

const intro = document.getElementById("intro");
var box = cvs.height / 12;
var step = box / 5;
const rx_max = Math.floor(cvs.width / box) - 1;
const ry_max = Math.floor(cvs.height / box) - 3;
var p = new Image();
p.src = "images/Pinky_Lamb1.png";
p.width = "60";
p.height = "70";

const f = new Image();
f.src = "images/cookie.png";
f.width = "40";
f.height = "40";

const b = new Image();
b.src = "images/flower.png";
b.width = "40";
b.height = "40";

let player = /*= [];
player[0] = */{
  x: cvs.width / 2,
  y: cvs.height / 2,
  width: p.width,
  height: p.height,
  health: 3
}

let food = [];
food[0] = {
  x: 0,
  y: cvs.height / 2 - f.height,
  X_step: Math.floor(Math.random() * 5 + 3),
  Y_step: Math.floor(Math.random() * 10 - 5),
  good: Math.floor(Math.random() * 3),
  width: f.width,
  height: f.height

}

let score = 0;

document.addEventListener("touchmove", clearIntro);
document.addEventListener("keydown", clearIntro);

function clearIntro() {
  intro.textContent = "";
  intro.style.borderStyle = "none";
  intro.style.boxShadow = "none";
}

function drawGhost() {
  var ghost = document.getElementById("ghost");
  ghost.style.left = player.x + "px";
  ghost.style.top = player.y + p.height / 2 + "px";
  ghost.style.width = p.width + "px";
  ghost.style.height = p.height + "px";
  ghost.style.display = "block";
}

//User Controls
let d = [];
document.addEventListener("touchmove", t_move);
document.addEventListener("keydown", k_down);
document.addEventListener("keyup", k_up);

function t_move(event) {
  console.log(event.touches[0].screenX);
  player.x = event.touches[0].screenX - cvs.offsetLeft - p.width / 2;
  player.y = event.touches[0].screenY - 175;
}

function k_down(event) {
  let k = event.keyCode;
  if (k == 37) d[0] = true;
  if (k == 38) d[1] = true;
  if (k == 39) d[2] = true;
  if (k == 40) d[3] = true;
}

function k_up(event) {
  let k = event.keyCode;
  if (k == 37) d[0] = false;
  if (k == 38) d[1] = false;
  if (k == 39) d[2] = false;
  if (k == 40) d[3] = false;
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
    player.x += step;// move right
    player.y += step;//move down
  } else if (isRight && isAbove) {//food is right & above
    player.x -= step;// move left
    player.y += step;//move down
  } else if (isRight && isBelow) {//food is right & below
    player.x -= step;// move left
    player.y -= step;//move up
  } else if (isLeft && isBelow) {//food is left & below
    player.x += step;// move right
    player.y -= step;//move up
  }/* else if (isLeft) {
    player.x += step;
  } else if (isRight) {
    player.x -= step;
  } else if (isAbove) {
    player.y += step;
  } else if (isBelow) {
    player.y -= step;
  }*/
  inCompBounds();
};

function inCompBounds() {
  if (player.y < 3*box) {
    player.y = 3*box;
  } else if (player.y + player.height + box >= cvs.height) {
    player.y = cvs.height - player.height - box;
  } else if (player.x < box) {
    player.x = box;
  } else if (player.x + player.width + box > cvs.width) {
    player.x = cvs.width - player.width - box;
  }
}

function inBounds() {
  if (player.y <= 100) {
    player.y = 101;
  } else if (player.y + player.height >= cvs.height) {
    player.y = cvs.height - player.height - 1;
  } else if (player.x <= 0) {
    player.x = 1;
  } else if (player.x + player.width >= cvs.width) {
    player.x = cvs.width - player.width - 1;
  }
}

let t = 0;
var nf = 100;

function draw() {
  ctx.canvas.width = window.innerWidth - 100;
  ctx.canvas.height = window.innerHeight - 50;
  //Background
  ctx.fillStyle = "#e1aaff";
  ctx.fillRect(0, 0, cvs.width, 2 * box);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, cvs.width, 2 * box);
  ctx.fillStyle = "#c1ffaa";
  ctx.fillRect(0, 2 * box, cvs.width, cvs.height - 2 * box);
  ctx.strokeRect(0, 2 * box, cvs.width, cvs.height - 2 * box);

  // Draw Pinky Lamb
  if (player.health == 3) {
    p.src = "images/Pinky_Lamb1.png";
  } else if (player.health == 2) {
    p.src = "images/Pinky_Lamb2.png";
  } else if (player.health == 1) {
    p.src = "images/Pinky_Lamb3.png";
  } else {
    p.src = "images/Pinky_Lamb4.png";
  }

  ctx.drawImage(p, player.x, player.y, p.width, p.height);
  //Lines
  //console.log("(" + player.x + ", " + player.y + "), ( " + food[0].x + ", " + food[0].y + ")");
  //console.log(collision(player, food[0]));
  //food
  //tiles of food
  for (let i = 0; i < food.length; i++) {
    if (food[i].good == 0) {
      ctx.drawImage(b, food[i].x, food[i].y, b.width, b.height);
    } else {
      ctx.drawImage(f, food[i].x, food[i].y, f.width, f.height);
    }
    //moves food
    food[i].x += food[i].X_step;
    food[i].y += food[i].Y_step;

    if (food[i].x >= (cvs.width - food[i].width) || food[i].x <= 0) {
      food[i].X_step = -1 * food[i].X_step;
    }
    if (food[i].y >= (cvs.height - food[i].height) || food[i].y <= 100) {
      food[i].Y_step = -1 * food[i].Y_step;
    }
    if (food[i].good == 0) {
      CompMove(player, food[i]);
    }
    //Checks if you have eaten food
    if (collision(player, food[i], box / 8)) {
      if (food[i].good == 0) {
        player.health--;
        if (player.health == 0) {
          p.src = "images/Pinky_Lamb4.png";
          console.log(p);
          ctx.drawImage(p, player.x, player.y, p.width, p.height);
          ctx.fillStyle = "white";
          ctx.font = "bold 100px Courier"
          ctx.fillText("GAMEOVER", cvs.width / 2 - cvs.width / 6, cvs.height / 2);
          ctx.strokeStyle = "black"
          ctx.strokeText("GAMEOVER", cvs.width / 2 - cvs.width / 6, cvs.height / 2);
          clearInterval(game);
        }
      }
      score++;
      food.splice(i, 1);
    }
  }
  //done going through tiles of food

  //Pinky Lab Moves
  //Changes Direction
  if (d[0]) player.x -= step;//left
  if (d[1]) player.y -= step;//up
  if (d[2]) player.x += step;//right
  if (d[3]) player.y += step;//down

  inBounds();

  t++;
  if (t == nf) {
    t = 0;
    nf--;
    var newFood = {
      x: 0,
      y: cvs.height / 2 - f.height,
      X_step: Math.floor(Math.random() * (step/2) + 2),
      Y_step: Math.floor(Math.random() * (step/2) + 2),
      width: f.width,
      height: f.height,
      good: Math.floor(Math.random() * 2),

    }
    food.push(newFood);
  }

  //GAMEOVER
  /* if (foodX < 0 || foodX >= cvs.width || foodY < 2 * box || foodY >= cvs.height || collision(newHead, food)){
     clearInterval(game);
   }*/

  ctx.fillStyle = "white";
  ctx.font = "bold 45px Courier"
  ctx.fillText("Score: " + (food.length + score), box, 1.2 * box);
  ctx.fillText("Lives: " + player.health, box * 7, 1.2 * box);
};

//window.requestAnimationFrame(draw);
let game = setInterval(draw, 20);