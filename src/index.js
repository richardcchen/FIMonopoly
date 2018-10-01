document.addEventListener("DOMContentLoaded", function() {

  const diceDisplay = document.getElementById('diceContainer')
  diceDisplay.addEventListener("click", event =>{
    if (event.target.id === "rollDice"){
      AniDice()
    }
    if (event.target.id === "stopRoll"){
      stopDice()
    }

  }) //end of dice roll listener


}) // end of document listener

function AniDice() {
  MyVar = setInterval(rolldice, 200)
}

function rolldice(){
  var ranNum = Math.floor(1 + Math.random() * 6);
  document.getElementById("dice").innerHTML = ranNum;
}

function stopDice(){
  clearInterval(MyVar)
}
