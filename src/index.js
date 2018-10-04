document.addEventListener("DOMContentLoaded", function() {
  store = []
  cornerArray = [1, 11, 21, 31]
  horizontal = [5, 29];
  leftSpecial = [13]
  rightSpecial = [39]
  topCorner = [21, 31]
  botCorner = [1, 11]

  bottomRow = [2, 4, 7, 9, 10]
  leftRow = [12, 14, 15, 17, 19, 20]
  topRow = [22, 24, 25, 27, 28, 30]
  rightRow = [32, 33, 35, 38, 40]
  feedback = [6, 8, 23, 26, 36, 37]
  pairingLab = [3, 18, 34] //8, 23, 37
  pictures = [1, 3, 6, 8, 11, 16, 18, 21, 23, 26, 31, 34, 36, 37]
  utilities = [13,29]

  pair = [8, 23, 37]
  instructor = [3, 18, 34]
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
  let endGame = 50
  user1 = {
    name: "user1",
    img: "assets/img/dog.png",
    energy: 1000,
    iq: 0,
    location: 1,
    events: {}
  }
  user2 = {
    name: "user2",
    img: "assets/img/monopoly-iron-piece.jpg",
    energy: 1000,
    iq: 0,
    location: 1,
    events: {}
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
      eventId.innerHTML += `<img data-id="user1" class="user1" src="${user1.img}", style="width:40%;height:40%;bottom:50px">
      `
      const eventId2 = document.getElementById(`${user2.location}`)
      eventId2.innerHTML += `<img data-id="user2" class="user2" src="${user2.img}", style="width:40%;height:40%;bottom:50px">
      `
      turnDisplay.innerHTML = `
        <h1>Player 1 Rolls<h2>
      `
    })



  board.addEventListener("click", event => {
    console.log(event.target);
    if (event.target.id) {
      const clickObj = store[event.target.id - 1]
      eventDisplay.innerHTML = `
        <p>${clickObj.name}</p>
        <p>${clickObj.description}</p>
        <p>Energy Cost: ${clickObj.energy}</p>
        <p>IQ: ${clickObj.IQ}</p>
      `
    }
    else if (event.target.parentNode.parentNode.id) {
      const clickObj = store[event.target.parentNode.parentNode.id - 1]
      debugger
      eventDisplay.innerHTML = `
        <p>${clickObj.name}</p>
        <p>${clickObj.description}</p>
        <p>Energy Cost: ${clickObj.energy}</p>
        <p>IQ: ${clickObj.IQ}</p>
      `
    }
    else if (event.target.parentNode.parentNode.parentNode.id) {
      const clickObj = store[event.target.parentNode.parentNode.parentNode.id - 1]
      eventDisplay.innerHTML = `
        <p>${clickObj.name}</p>
        <p>${clickObj.description}</p>
        <p>Energy Cost: ${clickObj.energy}</p>
        <p>IQ: ${clickObj.IQ}</p>
      `
    }
  }) //end of info event listener

  gameDisplay.addEventListener("click", event => {
    if (event.target.id === "user1stats") {
      eventDisplay.innerHTML = ""
      for (const location in user1.events) {
        //debugger
        eventDisplay.innerHTML += `
        <p>${user1.events[location].name}</p>
      `
      }
    } else if (event.target.id === "user2stats") {
      eventDisplay.innerHTML = ""
      for (const location in user2.events) {
        //debugger
        eventDisplay.innerHTML += `
        <p>${user2.events[location].name}</p>
      `
      }
    } // end of else
  }) //end of game listener


  function aniDice() {
    MyVar = setInterval(rolldice, 10)
  }

  function rolldice() {
    // var ranNum = Math.floor(1 + Math.random() * 12);
    ranNum = 1
    document.getElementById("dice").innerHTML = ranNum;
  }

  function stopDice() {
    clearInterval(MyVar)
    if (turn === true) {
      document.querySelector(`[data-id="user1"]`).remove()
    }
    if (turn === false) {
      document.querySelector(`[data-id="user2"]`).remove()
    }
    diceValue = +event.target.parentNode.children[0].innerText
  }

  diceDisplay.addEventListener("click", event => {
    // function user1Turn() {
    //   alert("It is User1's turn. Please roll")
    if (turnNum < endGame) {
      if (event.target.id === "rollDice") {
        aniDice()
      } else if (event.target.id === "stopDice") {
        stopDice()
        //PLAYER 1 GOES
        if (turn === true) {
          user1.location = (user1.location + diceValue) % 40
          fail(user1, user1.location)
          instruction(user1)
          pairP(user1)
          utility(user1, diceValue)
          displayFunction(user1)
          turn = false
          turnNum += 1
          user1.energy += store[user1.location - 1].energy
          user1.iq += store[user1.location - 1].IQ
          duplicate(user1, store[user1.location - 1])
          user1.events[store[user1.location - 1].board_id] = store[user1.location - 1]
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
            <h2 style="background: #EC5E98">Player 2 Rolls<h2>
            <h3>turn: ${turnNum}</h3>
          `
          eventDisplay.innerHTML = `
            <p>${store[user1.location-1].name}</p>
            <p>${store[user1.location-1].description}</p>
            <p>Energy Cost: ${store[user1.location-1].energy}</p>
            <p>IQ: ${store[user1.location-1].IQ}</p>
          `
          //PLAYER 2 GOES
        } else {
          user2.location = (user2.location + diceValue) % 40
          fail(user2, user2.location)
          instruction(user2)
          pairP(user2)
          utility(user2, diceValue)
          displayFunction(user2)
          turn = true
          turnNum += 1
          user2.energy += store[user2.location - 1].energy
          user2.iq += store[user2.location - 1].IQ
          duplicate(user2, store[user2.location - 1])
          user2.events[store[user2.location - 1].board_id] = store[user2.location - 1]
          user2Display.innerHTML = `
            <h2>Energy Left: ${user2.energy}</h2>
            <h2>IQ Gained: ${user2.iq}</h2>
          `
          user2Display.innerHTML =
            `
            <h2>Energy Left: ${user2.energy}</h2>
            <h2>IQ Gained: ${user2.iq}</h2>
          `
          diceValue = 0
          turnDisplay.innerHTML = `
          <h2 style="background: #EAFA1D">Player 1 Rolls<h2>
          <h3>turn: ${turnNum}</h3>
          `
          eventDisplay.innerHTML = `
            <p>${store[user2.location-1].name}</p>
            <p>${store[user2.location-1].description}</p>
            <p>Energy Cost:${store[user2.location-1].energy}</p>
            <p>IQ: ${store[user2.location-1].IQ}</p>
          `
        }
      }
    } else {
      alert("Game Over!!!")
    }
  }) //end of dice listener


  function displayFunction(userObj) {
    const eventId = document.getElementById(`${userObj.location}`)
    if (horizontal.includes(userObj.location)) {
      eventId.innerHTML += `
        <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}" style="width:40%;height:40%">
      `
    } else if (leftSpecial.includes(userObj.location)) {
      //debugger
      eventId.innerHTML += `
        <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}" style="width:40%;height:40%">
      `
    } else if (rightSpecial.includes(userObj.location)) {
      //debugger
      eventId.innerHTML += `
        <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}" style="width:40%;height:40%">
      `
    } else if (bottomRow.includes(userObj.location)) {
      eventId.children[1].innerHTML += `
        <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%">
      `
    } else if (leftRow.includes(userObj.location)) {
      //debugger
      eventId.children[0].children[0].innerHTML += `
              <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%">
            `
    } else if (topRow.includes(userObj.location)) {
      //debugger
      eventId.children[1].innerHTML += `
        <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%">
      `
    } else if (rightRow.includes(userObj.location)) {
      //debugger
      eventId.children[0].children[0].innerHTML += `
              <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%">
            `
    } else if (topCorner.includes(userObj.location)) {
      eventId.innerHTML += `<img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%;top:50px">
      `
    } else if (botCorner.includes(userObj.location)) {
      eventId.innerHTML += `<img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%;bottom:50px">
      `
    } else if (pictures.includes(userObj.location)) {
      eventId.innerHTML += `<img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%;bottom:50px">
      `
    }
  }

  function duplicate(user, location) {
    if (Object.keys(user.events).includes(location.board_id.toString())) {
      alert("Sorry you already gained knowledge on this square!")
      user.energy -= store[user.location - 1].energy
      user.iq -= store[user.location - 1].IQ
    }
  }

  function fail(user, location){
    if (location === 31){
      alert("Oh No! You Failed the code challenge, you have to go home early (Move back to the Go Home Early space)")
      user.location = 11
    }
  }

  function instruction(user){
    if (instructor.includes(user.location)){
      random = 1+ Math.floor(Math.random() * 31)
      if (Math.floor(Math.random() * 2) == 0){
        alert(`Good news, your feedback was great! You earned ${random} IQ points`)
        user.iq += random
      } else {
        alert(`Bad news. Instructor says you have been slacking. Lose ${random} IQ points`)
        user.iq -= random
      }
    }
  }

  function pairP(user){
    if (pair.includes(user.location)){
      random = 1+Math.floor(Math.random() * 11)
      if (Math.floor(Math.random() * 2) == 0){
        alert(`Your pair lab went great! You earned ${random} IQ points`)
        user.iq += random
      } else {
        alert(`Your pair lab sucked. Lose ${random} IQ points`)
        user.iq -= random
      }
    }
  }

  function utility(user, diceValue){
    if (utilities.includes(user.location)){
      if (user.location === 13){
        alert(`You learned SQL, but how well did you absorb it? You earn double your roll in IQ points(${diceValue*2})`)
        user.iq += (diceValue*2)
      } else {
        alert(`You just had your FSP, but did it go well? You earn double your roll in IQ points(${diceValue*2})`)
        user.iq += (diceValue*2)
      }
    }
  }

  function displayFunction2(userObj) {
    const eventId = document.getElementById(`${userObj.location}`)
    if (horizontal.includes(userObj.location)) {
      eventId.innerHTML += ` <div class="left" >
        <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}" style="width:40%;height:40%">
        </div>
      `
    } else if (leftSpecial.includes(userObj.location)) {
      //debugger
      eventId.innerHTML += `
        <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}" style="width:40%;height:40%">
      `
    } else if (rightSpecial.includes(userObj.location)) {
      //debugger
      eventId.innerHTML += `
        <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}" style="width:40%;height:40%">
      `
    } else if (bottomRow.includes(userObj.location)) {
      //debugger
      eventId.innerHTML += `<img data-id="${userObj.name}" class=${userObj.name}  src="${userObj.img}" style="width:40%;height:40%">
      `
    } else if (leftRow.includes(userObj.location)) {
      //debugger
      eventId.children[0].children[0].innerHTML += `
              <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%">
            `
    } else if (topRow.includes(userObj.location)) {
      //debugger
      eventId.children[1].innerHTML += `
        <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%">
      `
    } else if (rightRow.includes(userObj.location)) {
      //debugger
      eventId.children[0].children[0].innerHTML += `
              <img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%">
            `
    } else if (topCorner.includes(userObj.location)) {
      eventId.innerHTML += `<img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%;top:50px">
      `
    } else if (botCorner.includes(userObj.location)) {
      eventId.innerHTML += `<img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%;bottom:50px">
      `
    } else if (pictures.includes(userObj.location)) {
      eventId.innerHTML += `<img data-id="${userObj.name}" class=${userObj.name} src="${userObj.img}", style="width:40%;height:40%;bottom:50px">
      `
    }
  }


}) // end of document listener
