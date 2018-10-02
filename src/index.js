let canvas
let ctx
let x
let y
let dx
let dy
let up
document.addEventListener("DOMContentLoaded", function() {
  canvas = document.getElementById("myCanvas")
  ctx = canvas.getContext("2d")

  //ctx.fillStyle = "grey"
  //ctx.fillRect(0, 0, 1000, 1000)
  x = 50;
  y = 250;
  dx = 2;
  dy = 2;
  up
  let upButton = document.getElementById('up')

  make_base()


  const diceDisplay = document.getElementById('diceContainer')
  diceDisplay.addEventListener("click", event => {
    if (event.target.id === "rollDice") {
      AniDice()
    }
    if (event.target.id === "stopRoll") {
      stopDice()
    }

  }) //end of dice roll listener

  //Using Buttons to move Ball
  upButton.addEventListener("click", event => {
    let distance = y - 200
    up = setInterval(() => {
      moveUp(distance)
    }, 10);

    console.log(up);
  })


  function moveUp(distance) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if (y < distance || y < 0) {
      //debugger
      clearInterval(up)
    }
    y -= dy;
  }



}) // end of document listener

function AniDice() {
  MyVar = setInterval(rolldice, 200)
}

function rolldice() {
  var ranNum = Math.floor(1 + Math.random() * 6);
  document.getElementById("dice").innerHTML = ranNum;
}

function stopDice() {
  clearInterval(MyVar)
}

function drawBall() {
  ctx.beginPath();
  //ctx.arc(x, y, 10, 0, Math.PI * 2);
  //ctx.fillStyle = "red";
  //ctx.fill();
  ctx.drawImage(base_image, x, y, 50, 50)
  ctx.closePath();
}

function moveUp(distance) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  console.log(y, distance);
  //debugger
  if (y < distance) {
    debugger
    clearInterval(up)
  }
  y -= dy;
}

function moveDown() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  //x += dx;
  y -= dy;
}

function make_base() {
  base_image = new Image();
  base_image.src = 'https://miro.medium.com/max/2400/1*7Kog7HLU5yoLaLpCi4VcuA.png';
  base_image.onload = function() {
    ctx.drawImage(base_image, 50, 250, 50, 50);
  }
}
