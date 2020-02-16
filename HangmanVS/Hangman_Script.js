const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
ctx.canvas.width = window.innerWidth - 100;
ctx.canvas.height = window.innerHeight - 10;
const intro = document.getElementById("intro");
const c_lable = document.getElementById("c_lable");
let box = cvs.height / 12;
const rx_max = Math.floor(cvs.width / box) - 1;
const ry_max = Math.floor(cvs.height / box) - 3;
let health = 10;
let num_showing = 0;
let num_spaces = 0;
let speed = 1;
let game_over = "";
let t = 0;
let keepPlaying = true;
let score = 0;
let tile = [];
var category = [];

var word = "word";
word = word.toUpperCase();
var ltrs = word.split('');
let wrong_ltrs = new Set();

const PlayAgain = document.getElementById("PlayAgain");
const ShowAnswer = document.getElementById("ShowAnswer");
PlayAgain.style.left = cvs.width / 2 + "px";
PlayAgain.style.top = cvs.height / 2 + 4 * box + "px";
ShowAnswer.style.left = cvs.width / 2 - 4 * box + "px";
ShowAnswer.style.top = cvs.height / 2 + 4 * box + "px";
ShowAnswer.style.display = "block";
/*
tile[0] = {
  x: 2 * box,
  y: cvs.height / 2 + box,
  str: ltrs[0],
  width: box,
  height: box,
  show: false
}*/

function newTile(i) {
  var sp = ltrs[i] === " ";
  var newtile = {
    x: box + i * box,
    y: cvs.height / 2 + box,
    str: ltrs[i],
    width: box,
    height: box,
    show: false,
    space: sp
  }
  tile.push(newtile);
}

document.addEventListener("onload", newWord);
function newWord() {
  randomWord();
  word = word.toUpperCase();
  ltrs = word.split('');
  for (var k = 0; k < ltrs.length; k++) {
    newTile(k);
  }
}
var Countries = ["afghanistan", "albania", "algeria", "andorra", "angola", "antigua and barbuda", "argentina", "armenia",
"australia", "austria", "azerbaijan", "the bahamas", "bahrain", "bangladesh", "barbados", "belarus", "belgium", 
"belize", "benin", "bhutan", "bolivia", "bosnia and herzegovina", "botswana", "brazil", "brunei", "bulgaria", 
"burkina faso", "burundi", "cabo verde", "cambodia", "cameroon", "canada", "central african republic", "chad",
 "chile","china", "colombia", "comoros", "congo, democratic republic of the", "congo, republic of the", "costa rica", 
 "côte d’ivoire", "croatia", "cuba", "cyprus", "czech republic", "denmark", "djibouti", "dominica", "dominican republic",
  "east timor (timor-leste)", "ecuador", "egypt", "el salvador", "equatorial guinea", "eritrea", "estonia", "eswatini",
   "ethiopia", "fiji", "finland", "france", "gabon", "the gambia", "georgia", "germany", "ghana", "greece", "grenada",
    "guatemala", "guinea", "guinea-bissau", "guyana", "haiti", "honduras", "hungary", "iceland", "india", "indonesia", 
    "iran", "iraq", "ireland", "israel", "italy", "jamaica", "japan", "jordan", "kazakhstan", "kenya", "kiribati",
     "north korea", "south korea", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho", "liberia", 
     "libya", "liechtenstein", "lithuania", "luxembourg", "madagascar", "malawi", "malaysia", "maldives", "mali",
      "malta", "marshall islands", "mauritania", "mauritius", "mexico", "micronesia, federated states of", "moldova", 
      "monaco", "mongolia", "montenegro", "morocco", "mozambique", "myanmar", "namibia", "nauru", "nepal", "netherlands", 
      "new zealand", "nicaragua", "niger", "nigeria", "north macedonia", "norway", "oman", "pakistan", "palau", "panama",
       "papua new guinea", "paraguay", "peru", "philippines", "poland", "portugal", "qatar","romania", "russia", "rwanda",
        "saint kitts and nevis", "saint lucia", "saint vincent and the grenadines", "samoa", "san marino", 
        , "saudi arabia", "senegal", "serbia","seychelles", "sierra leone", "singapore", "slovakia", "slovenia", 
        "solomon islands", "somalia", "south africa", "spain", "sri lanka", "sudan", "sudan, south", "suriname", "sweden", 
        "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand", "togo", "tonga", "trinidad and tobago",
         "tunisia", "turkey", "turkmenistan", "tuvalu", "uganda", "ukraine", "united arab emirates", "united kingdom", 
         "united states", "uruguay", "uzbekistan", "vanuatu", "vatican city", "venezuela", "vietnam", "yemen", "zambia",
          "zimbabwe"];
var Methacton_Teachers = ["sawyer", "ryan", "reid", "flanagan", "outland", "lee", "chapin", "messere", "gallagher",
  "alzamora", "meanix", "walton", "ladson", "sorgini", "kochenour", "kistler", "helm", "robbins", "savitz", "ranieri"];
var Stuffed_Animals = ["Pinky Lamb", "Bear", "Big Bear", "Homework Bear", "Florida Bear", "Pinky Bear", "Pinky Lamb Jr", "Teddy",
  "Sealy", "Fluff"];
var Superheroes = ["ant man", "aquaman", "the avengers", "batgirl", "batman", "batwoman", "black panther",
  "captain america", "captain marvel", "catwoman", "conan the barbarian", "doctor strange", "fantastic four",
  "green arrow", "green lantern", "guardians of the galaxy", "hawkeye", "hellboy", "incredible hulk", "iron man",
  "robin", "spider man", "supergirl", "superman", "thor", "wolverine", "wonder woman", "x-men"];
var US_States = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware",
  "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine",
  "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada",
  "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma",
  "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont",
  "virginia", "washington", "west virginia", "wisconsin", "wyoming"];

category = Methacton_Teachers;

function ChangeCategory(cat) {
  category = cat;
  playAgain();
  clearIntro();
 /* ctx.fillStyle = "white";
  ctx.font = "bold 40px Courier"
  ctx.fontsize = 0.8 * box + "px";
  ctx.fillText( "cat" , 3 * box, 5 * box);*/
}

function randomWord() {
  var r = Math.floor(Math.random() * category.length);
  word = category[r];
  word = word.toUpperCase();
  var ltrs = word.split('');
}

function Win() {
  ctx.fillStyle = "white";
  ctx.font = "bold 100px Courier"
  ctx.fontsize = 2 * box + "px";
  ctx.fillText("WINNER!", cvs.width / 4, cvs.height / 2);
  ctx.strokeStyle = "black"
  ctx.strokeText("WINNER!", cvs.width / 4, cvs.height / 2);
  PlayAgain.style.display = "block";
}

function Game_Over() {
  ctx.fillStyle = "white";
  ctx.font = "bold 100px Courier"
  ctx.fontsize = 2 * box + "px";
  ctx.fillText("GAME OVER", cvs.width / 4, cvs.height / 2);
  ctx.strokeStyle = "black"
  ctx.strokeText("GAME OVER", cvs.width / 4, cvs.height / 2);
  PlayAgain.style.display = "block";
}

function Show_Answer() {
  clearIntro();
  for (let i = 0; i < tile.length; i++) {
    tile[i].show = true;
  }
}

function playAgain() {
  clearIntro();
  if (num_showing == tile.length - num_spaces) {
    score++;
  }
  tile = [];
  newWord();
  health = 10;
  t = 0;
  //keepPlaying = true;
  btn.style.display = "none";
}

document.addEventListener("keydown", clearIntro);
function clearIntro() {
  intro.textContent = "";
  intro.style.borderStyle = "none";
  intro.style.boxShadow = "none";
}

//User Controls
document.addEventListener("keyup", k_up);

function k_up(event) {
  let k = event.keyCode;
  let ltr = String.fromCharCode(k);
  console.log(ltr)
  let correct = false;
  for (let i = 0; i < tile.length; i++) {
    if (ltr == tile[i].str) {
      tile[i].show = true;
      correct = true;
    }
  }
  if (correct == false) {
    health--;
    wrong_ltrs.add(ltr);
  }
}

newWord();

function draw() {
  ctx.canvas.width = window.innerWidth - 100;
  ctx.canvas.height = window.innerHeight - 10;
  box = cvs.height / 12;
  //Background
  ctx.fillStyle = "#2f5e31";
  ctx.fillRect(0, 0, cvs.width, box);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, cvs.width, box);
  ctx.fillStyle = "black";
  ctx.fillRect(0, box, cvs.width, cvs.height - box);
  ctx.strokeRect(0, box, cvs.width, cvs.height - box);

  num_showing = 0;
  num_spaces = 0;
  //Tiles
  for (let i = 0; i < tile.length; i++) {
    if (tile[i].space == false) {
      ctx.fontsize = box * 0.8 + "px";
      ctx.fillStyle = "white";
      ctx.fillRect(tile[i].x + box / 10, tile[i].y + box, tile[i].width - 2 * box / 10, box / 10);
      /*ctx.strokeStyle = "white";
      ctx.strokeRect(tile[i].x, tile[i].y, tile[i].width, tile[i].height);*/
      ctx.fillStyle = "white";
      ctx.font = "bold 45px Courier";
      if (tile[i].show) {
        ctx.fillText(tile[i].str, tile[i].x + tile[i].width / 4, tile[i].y + tile[i].height * 0.7);
        num_showing++;
      }
    } else {
      num_spaces++;
    }
  }

  if (num_showing == tile.length - num_spaces) {
    Win();
  }

  //Score Display
  ctx.fillStyle = "white";
  ctx.font = "bold 40px Courier"
  ctx.fontsize = 0.8 * box + "px";
  ctx.fillText("Score: " + score, box, .8 * box);
  ctx.fillText("Lives: " + health, box * 9, .8 * box);
  intro.style.left = cvs.width / 2 - 4 * box + "px";

  if (health <= 0) Game_Over();
  console.log(health);
}
//window.requestAnimationFrame(draw);
timer = setInterval(draw, 20);