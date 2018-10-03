document.addEventListener("DOMContentLoaded", function() {
  store = []
  cornerArray = [1, 11, 21, 31]
  horizontal = [3, 5, 6, 26, 29];
  leftSpecial = [13, 16, 18]
  rightSpecial = [34, 36, 37, 39]
  topCorner = [21, 31]
  botCorner = [1, 11]

  bottomRow = [2, 4, 7, 9, 10]
  leftRow = [12, 14, 15, 17, 19, 20]
  topRow = [22, 24, 25, 27, 28, 30]
  rightRow = [32, 33, 35, 38, 40]
  eventDisplay = document.getElementById('eventInfo')
  boardDisplay = document.getElementById('board')
  diceDisplay = document.getElementById('diceContainer')
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
    })



  board.addEventListener("click", event => {
    if (event.target.id) {
      const clickObj = store[event.target.id]
      console.log(clickObj);
      eventDisplay.innerHTML = `
        <h2>Card Info</h2>
        <p>${clickObj.name}</p>

      `
    }

  }) //end of info event listener


  // board.addEventListener("load", event => {
  //   // store.forEach(event => {
  //   //   if (horizontal.includes(+event.board_id)) {
  //   //     //debugger
  //   //     const eventId = document.getElementById(`${event.board_id}`)
  //   //     eventId.innerHTML += `
  //   //       <img src="assets/img/download.jpeg", style="width:50px;height:50px">
  //   //     `
  //   //   } else if (leftSpecial.includes(+event.board_id)) {
  //   //     //debugger
  //   //     const eventId = document.getElementById(`${event.board_id}`)
  //   //     eventId.innerHTML += `
  //   //       <img src="assets/img/download.jpeg", style="width:50px;height:50px">
  //   //     `
  //   //   } else if (rightSpecial.includes(+event.board_id)) {
  //   //     //debugger
  //   //     const eventId = document.getElementById(`${event.board_id}`)
  //   //     eventId.innerHTML += `
  //   //       <img src="assets/img/download.jpeg", style="width:50px;height:50px">
  //   //     `
  //   //   } else if (bottomRow.includes(+event.board_id)) {
  //   //     //debugger
  //   //     const eventId = document.getElementById(`${event.board_id}`)
  //   //     eventId.children[1].innerHTML += `
  //   //       <img class="user1" src="assets/img/download.jpeg", style="width:50px;height:50px">
  //   //     `
  //   //   } else if (leftRow.includes(+event.board_id)) {
  //   //     //debugger
  //   //     const eventId = document.getElementById(`${event.board_id}`)
  //   //     eventId.children[0].children[0].innerHTML += `
  //   //             <img class="user1" src="assets/img/download.jpeg", style="width:50px;height:50px">
  //   //           `
  //   //   } else if (topRow.includes(+event.board_id)) {
  //   //     //debugger
  //   //     const eventId = document.getElementById(`${event.board_id}`)
  //   //     eventId.children[1].innerHTML += `
  //   //       <img class="user1" src="assets/img/download.jpeg", style="width:50px;height:50px">
  //   //     `
  //   //   } else if (rightRow.includes(+event.board_id)) {
  //   //     //debugger
  //   //     const eventId = document.getElementById(`${event.board_id}`)
  //   //     eventId.children[0].children[0].innerHTML += `
  //   //             <img class="user1" src="assets/img/download.jpeg", style="width:50px;height:50px">
  //   //           `
  //   //   }
  //   //   else if (topCorner.includes(+event.board_id)) {
  //   //     const eventId = document.getElementById(`${event.board_id}`)
  //   //     eventId.innerHTML +=`<img class="user1" src="assets/img/download.jpeg", style="width:50px;height:50px;top:50px">
  //   //     `
  //   //   }
  //   //   else if (botCorner.includes(+event.board_id)) {
  //   //     const eventId = document.getElementById(`${event.board_id}`)
  //   //     eventId.innerHTML +=`<img class="user1" src="assets/img/download.jpeg", style="width:50px;height:50px;bottom:50px">
  //   //     `
  //   //   }
  //   //
  //   // }) //end of forEach
  // }) //end of board listener



  function aniDice() {
    MyVar = setInterval(rolldice, 10)
  }

  function rolldice() {
    var ranNum = Math.floor(1 + Math.random() * 6);
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
    if (turnNum < 10) {
      if (event.target.id === "rollDice") {
        aniDice()
      } else if (event.target.id === "stopDice") {
        stopDice()
        if (turn === true) {
          user1.location += diceValue
          displayFunction(user1)
          turn = false
          turnNum += 1
        } else {
          user2.location += diceValue
          displayFunction(user2)
          turn = true
          turnNum += 1
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
