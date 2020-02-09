const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
ctx.canvas.width  = window.innerWidth  - 100;
ctx.canvas.height = window.innerHeight - 10;
const intro = document.getElementById("intro");
var box = cvs.height/12;
var score = 0;
var ystep = box*1.5;
var xstep = box/8
var buffer = 0;
var keepPlaying = true;

//Pinky Lamb
var p = new Image();
p.src = "images/Pinky_Lamb1.png";
p.width = box;
p.height = 1.2*box;

let player = {
  x : cvs.width / 6,
  y : cvs.height / 2,
  width : p.width,
  height : p.height,
  health : 3
}

//Obstacles
let tile = [];
var opening = Math.floor(3+Math.random()*6)*box;
tile [0] = {
  x : cvs.width,
  width : box,
  height: cvs.height/2 - opening/2,
  y1 : 0,
  y2 : cvs.height/2 + opening/2,
  color : getRandomColor()
}

function newTile(){
  opening = Math.floor(3+Math.random()*6)*box;
  var newtile = {
    x : cvs.width,
    width : box,
    height: cvs.height/2 - opening/2,
    y1 : 0,
    y2 : cvs.height/2 + opening/2,
    color : getRandomColor()
  }
  tile.push(newtile);
}

function collision(p, t){
  if ((p.x + p.width - buffer) > t.x && (p.x + p.width - buffer) < (t.x + t.width) && (p.y < t.y1 + t.height)){//top collision
      return true;
  }else if((p.x + p.width - buffer) > t.x && (p.x + p.width - buffer) < (t.x + t.width) && (p.y + p.height > t.y2)){// bottom collcion
      return true;
  }else{
    return false;
  }
}

function getRandomColor() {
 /* var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }*/
  var colors = ["#f9d592", "#ffc095", "#f4aa91" , "#f49595", "	#ee8096", "#eaa289", "#c78989" , "#9a6f8b", "#6e5d85", "#494e67" ];
  color = colors[Math.floor(Math.random()*colors.length)]
  return color;
}

document.addEventListener("keydown", clearIntro);
function clearIntro(){
  intro.textContent = "";
  intro.style.borderStyle = "none";
  intro.style.boxShadow = "none";
}

function playAgain(){
  location.reload();
  /*tile = [];
  player.health = 3;
  score= 0;
  t = 0;
  keepPlaying = true;
  btn.style.display = "none";
  setInterval(draw, 20);*/
}

function drawGhost(){
  var ghost = document.getElementById("ghost");
  ghost.style.left = player.x + "px";
  ghost.style.top = player.y + p.height/2 + "px";
  ghost.style.width = p.width + "px";
  ghost.style.height = p.height + "px";
  ghost.style.display = "block";
}

//Player Controls
document.addEventListener("onclick", flap );
document.addEventListener("ontouchstart", flap);
document.addEventListener("ontouchend", flap);
document.addEventListener("keydown", flap );
document.addEventListener("ontouchend", console.log("I'm touched"));
function flap(){
  player.y -= ystep;
}

var t = 0;
function draw(){
  ctx.canvas.width  = window.innerWidth-100;
  ctx.canvas.height = window.innerHeight-10;
  box = cvs.height/12;
  ystep = box*1.5;
  xstep = box/8;

  //Background
  ctx.fillStyle = "#ceb6d9";
  ctx.fillRect(0, 0, cvs.width, box);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6; 
  ctx.strokeRect(0 , 0, cvs.width, box);
  ctx.fillStyle = "#c5fafc";
  ctx.fillRect(0, box, cvs.width, cvs.height - box);
  ctx.strokeRect(0, box, cvs.width, cvs.height - box);
  
  if(player.y + player.height >= cvs.height)
    player.y = cvs.height - player.height - 1;
  //console.log(tile[0].x + ", " + tile[0].y1 + ", " + tile[0].y2);
  //Tiles 
  for(let i = 0; i < tile.length; i++){
    
    ctx.fillStyle = tile[i].color //"#fa9755"
    ctx.fillRect(tile[i].x, tile[i].y1, tile[i].width, tile[i].height);
    ctx.fillRect(tile[i].x, tile[i].y2, tile[i].width, tile[i].height);
    ctx.strokeStyle = "white";
    ctx.strokeRect(tile[i].x, tile[i].y1, tile[i].width, tile[i].height);
    ctx.strokeRect(tile[i].x, tile[i].y2, tile[i].width, tile[i].height);
    ctx.fillStyle = "white";
    
    //moves tile
    tile[i].x -= xstep;

    //Checks for collisons
    if(collision(player,tile[i])){
      tile.splice(i,1);
      player.health--;
    }
    
    //Removes tile if it is out of bounds
    if(tile[i].x + tile[i].width < 0){
      tile.splice(i,1);
      score++;
    }

    //GAME OVER
    if(player.health == 0){
      keepPlaying = false;
      //p.src = "images/Pinky_Lamb4.png";
      ctx.drawImage(p, player.x, player.y, p.width, p.height);
      //Play Again Button Display
      btn.style.left = cvs.width / 2 - 2*box + "px";
      btn.style.top = cvs.height / 2 + box +"px";
      btn.style.display = "block";
      //Game Over Display
      ctx.fillStyle = "white";
      ctx.font = "bold 100px Courier"
      ctx.fontsize = 2*box + "px";
      ctx.fillText("GAME OVER", cvs.width/4, cvs.height / 2);
      ctx.strokeStyle = "black"
      ctx.strokeText("GAME OVER" , cvs.width/4, cvs.height / 2);
      clearInterval(timer);
    }
  }

  //Player
  if( player.health == 3){
    p.src = "images/Pinky_Lamb1.png";
  }else if ( player.health == 2 ){
    p.src = "images/Pinky_Lamb2.png";
  }else if ( player.health == 1 ){
    p.src = "images/Pinky_Lamb3.png";
  }else{
    p.src = "images/Pinky_Lamb4.png";
  }
  ctx.drawImage(p, player.x, player.y, p.width, p.height);
  player.y += box/12;

  t++
  //console.log(t);
  if(t==75 && keepPlaying){
    newTile();
    t = 0;
  } 

  //Score Display
  ctx.fillStyle = "white";
  ctx.font = "bold 40px Courier"
  ctx.fontsize = 0.8*box + "px";
  ctx.fillText("Score: " + score, box, .8*box);
  ctx.fillText("Lives: " + player.health, box * 8, .8*box);
  intro.style.left = cvs.width / 2 - 4*box + "px";
}
//window.requestAnimationFrame(draw);
timer = setInterval(draw, 20);