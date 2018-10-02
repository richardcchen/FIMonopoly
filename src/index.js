document.addEventListener("DOMContentLoaded", function() {
  store = []
  cornerArray = [1, 11, 21, 31]
  specialArray = [3, 5, 6, 8, 13, 16, 18, 23, 26, 29, 34, 36, 37, 39]
  bottomRow = [2, 4, 7, 9, 10]
  leftRow = [12, 14, 15, 17, 19, 20]
  topRow = [22, 24, 25, 27, 28, 30]
  rightRow = [32, 33, 35, 38, 40]
  const start = document.getElementById('1')

  fetch('http://localhost:3000/api/v1/events')
    .then(response => response.json())
    .then(eventData => {
      store = [...eventData];
      store.forEach(event => {
        if (cornerArray.includes(+event.board_id)) {} else if (specialArray.includes(+event.board_id)) {} else if (bottomRow.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[1].innerText = event.name
          eventId.children[2].innerText = `E:${event.energy} IQ:${event.IQ}`
        } else if (leftRow.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[0].children[0].innerText = event.name
          eventId.children[0].children[1].innerText = `E:${event.energy} IQ:${event.IQ}`
        } else if (topRow.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[1].innerText = event.name
          eventId.children[2].innerText = `E:${event.energy} IQ:${event.IQ}`
        } else if (rightRow.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[0].children[0].innerText = event.name
          eventId.children[0].children[1].innerText = `E:${event.energy} IQ:${event.IQ}`
        }
      }) //end of for each
    }).then(
      //input rendering of players on Start Point
      () => {
        for (let i = 1; i < 41; i++) {
          //debugger
          let el = document.getElementById(`${i}`)
          console.log(el)
          el.innerHTML += `
          <img class ="user1" src="https://miro.medium.com/max/2400/1*7Kog7HLU5yoLaLpCi4VcuA.png" height="25" width="25">
        `
        }
      }
    ) // end of then statement





}) // end of document listener
