document.addEventListener("DOMContentLoaded", function() {
  store = []
  cornerArray = [1, 11, 21, 31]
  horizontal = [5, 6, 26, 29];
  leftSpecial = [13, 16]
  rightSpecial = [36, 37, 39]
  topCorner = [21, 31]
  botCorner = [1, 11]

  bottomRow = [2, 4, 7, 9, 10]
  leftRow = [12, 14, 15, 17, 19, 20]
  topRow = [22, 24, 25, 27, 28, 30]
  rightRow = [32, 33, 35, 38, 40]
  feedback = [8, 23]
  pairingLab = [3, 18, 34]

  eventDisplay = document.getElementById('eventInfo')
  boardDisplay = document.getElementById('board')
  diceDisplay = document.getElementById('diceContainer')
  gameDisplay = document.getElementById('gameStats')
  user1Display = document.getElementById('user1stats')
  user2Display = document.getElementById('user2stats')
  turnDisplay = document.getElementById('turn')

  turn = true
  let user1 = {}
  let diceValue = 0
  let turnNum = 0;
  user1 = {
    name: "user1",
    img: "assets/img/dog.png",
    energy: 1000,
    iq: 0,
    location: 1
  }
  user2 = {
    name: "user2",
    img: "assets/img/monopoly-iron-piece.jpg",
    energy: 1000,
    iq: 0,
    location: 1
  }



  fetch('http://localhost:3000/api/v1/events')
    .then(response => response.json())
    .then(eventData => {
      store = [...eventData];
      store.forEach(event => {
        if (horizontal.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[1].innerText = event.name
          eventId.children[2].innerText = `E: ${event.energy} IQ: ${event.IQ}`
        } else if (leftSpecial.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[0].children[0].innerText = event.name;
          eventId.children[0].children[1].innerText = `E: ${event.energy} IQ: ${event.IQ}`;
        } else if (rightSpecial.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[0].children[0].innerText = event.name;
          eventId.children[0].children[1].innerText = `E: ${event.energy} IQ: ${event.IQ}`;
        } else if (bottomRow.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[1].innerText = event.name
          eventId.children[2].innerText = `E: ${event.energy} IQ: ${event.IQ}`
        } else if (leftRow.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[0].children[0].innerText = event.name
          eventId.children[0].children[1].innerText = `E: ${event.energy} IQ: ${event.IQ}`
        } else if (topRow.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[1].innerText = event.name
          eventId.children[2].innerText = `E: ${event.energy} IQ: ${event.IQ}`
        } else if (rightRow.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[0].children[0].innerText = event.name
          eventId.children[0].children[1].innerText = `E: ${event.energy} IQ: ${event.IQ}`
        }
      }) //end of forEach
    }) //end of then statement
    .then(() => {
      const eventId = document.getElementById(`${user1.location}`)
      eventId.innerHTML += `<img data-id="user1" class="user1" src="${user1.img}", style="width:50px;height:50px;bottom:50px">
      `
      const eventId2 = document.getElementById(`${user2.location}`)
      eventId2.innerHTML += `<img data-id="user2" class="user2" src="${user2.img}", style="width:50px;height:50px;bottom:50px">
      `
      turnDisplay.innerHTML = `
        <h1>Player 1 Rolls<h2>
      `
    })



  board.addEventListener("click", event => {
    if (event.target.id) {
      const clickObj = store[event.target.id-1]
      console.log(clickObj);
      eventDisplay.innerHTML = `
        <p>${clickObj.name}</p>
        <p>${clickObj.description}</p>
        <p>${clickObj.energy} energy</p>
        <p>${clickObj.IQ} IQ</p>
      `
    }
  }) //end of info event listener

  gameDisplay.addEventListener("click", event => {
    if (event.target.id === "user1stats"){
      eventDisplay.innerHTML = `
        <p>add user 1 properties here </p>
      `
    }
    else if (event.target.id === "user2stats"){
      eventDisplay.innerHTML = `
        <p>add user 2 properties here </p>
      `
    }
  }) //end of game listener


  function aniDice() {
    MyVar = setInterval(rolldice, 10)
  }

  function rolldice() {
    var ranNum = Math.floor(1 + Math.random() * 6);
    // ranNum = 30
    document.getElementById("dice").innerHTML = ranNum;
  }

  function stopDice() {
    clearInterval(MyVar)
    if (turn === true) {
      console.log(`user1: ${user1.location}`);
      document.querySelector(`[data-id="user1"]`).remove()
    }
    if (turn === false) {
      console.log(`user2:${user2.location}`);
      document.querySelector(`[data-id="user2"]`).remove()
    }
    diceValue = +event.target.parentNode.children[0].innerText
    console.log(diceValue, `turn:${turn}`);
  }

  diceDisplay.addEventListener("click", event => {
    // function user1Turn() {
    //   alert("It is User1's turn. Please roll")
    if (turnNum < 10) {
      if (event.target.id === "rollDice") {
        aniDice()
      } else if (event.target.id === "stopDice") {
        stopDice()
        if (turn === true) {
          user1.location = (user1.location + diceValue)%40
          if (user1.location === 31){
            alert("Oh No! You FAILED the code challenge, you have to go home early")
            user.location = 11
          }
          displayFunction(user1)
          console.log(`user1 after: ${user1.location}`);
          turn = false
          turnNum += 1
          console.log(`energy: ${store[user1.location-1].energy}`)
          user1.energy += store[user1.location-1].energy
          user1.iq += store[user1.location-1].IQ
          user1Display.innerHTML = `
            <h2>Energy Left: ${user1.energy}</h2>
            <h2>IQ Gained: ${user1.iq}</h2>
          `
          user2Display.innerHTML =
          `
            <h2>Energy Left: ${user2.energy}</h2>
            <h2>IQ Gained: ${user2.iq}</h2>
          `
          diceValue=0
          turnDisplay.innerHTML = `
            <h1>Player 2 Rolls<h2>
          `
          eventDisplay.innerHTML = `
            <p>${store[user1.location-1].name}</p>
            <p>${store[user1.location-1].description}</p>
            <p>${store[user1.location-1].energy} energy</p>
            <p>${store[user1.location-1].IQ} IQ</p>
          `

        } else {
          user1.location = (user1.location + diceValue)%40
          displayFunction(user2)
          if (user1.location === 31){
            alert("Oh No! You FAILED the code challenge, you have to go home early")
            user.location = 11
          }
          console.log(`user2 after: ${user2.location}`)
          turn = true
          turnNum += 1
          console.log(`energy: ${store[user2.location-1].energy}`)
          user2.energy += store[user2.location-1].energy
          user2.iq += store[user2.location-1].IQ
          user1Display.innerHTML = `
            <h2>Energy Left: ${user1.energy}</h2>
            <h2>IQ Gained: ${user1.iq}</h2>
          `
          user2Display.innerHTML =
          `
            <h2>Energy Left: ${user2.energy}</h2>
            <h2>IQ Gained: ${user2.iq}</h2>
          `
          diceValue = 0
          turnDisplay.innerHTML = `
            <h1>Player 1 Rolls<h2>
          `
          eventDisplay.innerHTML = `
            <p>${store[user2.location-1].name}</p>
            <p>${store[user2.location-1].description}</p>
            <p>${store[user2.location-1].energy} energy</p>
            <p>${store[user2.location-1].IQ} IQ</p>
          `
        }
        // setTimeout(function() {
        //   for (let i = user1.location; i < user1.location + diceValue; i++) {
        //     //document.querySelector(`[data-id="user1"]`).remove()
        //     console.log(i);
        //     user1.location = i
        //     displayFunction(user1, i);
        //   }
        // }, 1000) // end of setTimeout
      }
    }
    // user1.location = futureValue
  }) //end of dice listener
  // } //end of user1Turn

  function user2Turn() {
    alert("It is User2's turn. Please roll")
    diceDisplay.addEventListener("click", event => {
      if (event.target.id === "rollDice") {
        aniDice()
      } else if (event.target.id === "stopDice") {
        stopDice()
        user2.location += diceValue
        // setTimeout(function() {
        //   for (let i = user1.location; i < user1.location + diceValue; i++) {
        //     //document.querySelector(`[data-id="user1"]`).remove()
        //     console.log(i);
        //     user1.location = i
        //     displayFunction(user1, i);
        //   }
        // }, 1000) // end of setTimeout
        displayFunction(user2)
        turn = true
      }
      // user1.location = futureValue
    }) //end of dice listener
  } //end of user1Turn


  function displayFunction(userObj) {
    const eventId = document.getElementById(`${userObj.location}`)
    if (horizontal.includes(userObj.location)) {
      eventId.innerHTML += `
        <img data-id="${userObj.name}" src="${userObj.img}", style="width:50px;height:50px">
      `
    } else if (leftSpecial.includes(userObj.location)) {
      //debugger
      eventId.innerHTML += `
        <img data-id="${userObj.name}" src="${userObj.img}", style="width:50px;height:50px">
      `
    } else if (rightSpecial.includes(userObj.location)) {
      //debugger
      eventId.innerHTML += `
        <img data-id="${userObj.name}" src="${userObj.img}", style="width:50px;height:50px">
      `
    } else if (bottomRow.includes(userObj.location)) {
      //debugger
      eventId.children[1].innerHTML += `
        <img data-id="${userObj.name}" class="user1" src="${userObj.img}", style="width:50px;height:50px">
      `
    } else if (leftRow.includes(userObj.location)) {
      //debugger
      eventId.children[0].children[0].innerHTML += `
              <img data-id="${userObj.name}" class="user1" src="${userObj.img}", style="width:50px;height:50px">
            `
    } else if (topRow.includes(userObj.location)) {
      //debugger
      eventId.children[1].innerHTML += `
        <img data-id="${userObj.name}" class="user1" src="${userObj.img}", style="width:50px;height:50px">
      `
    } else if (rightRow.includes(userObj.location)) {
      //debugger
      eventId.children[0].children[0].innerHTML += `
              <img data-id="${userObj.name}" class="user1" src="${userObj.img}", style="width:50px;height:50px">
            `
    } else if (topCorner.includes(userObj.location)) {
      eventId.innerHTML += `<img data-id="${userObj.name}" class="user1" src="${userObj.img}", style="width:50px;height:50px;top:50px">
      `
    } else if (botCorner.includes(userObj.location)) {
      eventId.innerHTML += `<img data-id="${userObj.name}" class="user1" src="${userObj.img}", style="width:50px;height:50px;bottom:50px">
      `
    }
  }



}) // end of document listener
