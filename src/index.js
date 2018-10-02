document.addEventListener("DOMContentLoaded", function() {
  store = []
  cornerArray = [11, 21, 31]
  horizontal = [3, 5, 6, 26, 29];
  leftSpecial = [13, 16, 18]
  rightSpecial = [34, 36, 37, 39]

  bottomRow = [2,4,7,9,10]
  leftRow = [12,14,15,17,19,20]
  topRow = [22, 24, 25, 27, 28, 30]
  rightRow = [32, 33, 35, 38, 40]

  fetch('http://localhost:3000/api/v1/events')
    .then(response => response.json())
    .then(eventData => {
      store = [...eventData];
      store.forEach(event => {
        if (horizontal.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[1].innerText = event.name
          eventId.children[2].innerText = `E: ${event.energy} IQ: ${event.IQ}`
        } else if (leftSpecial.includes(+event.board_id)){
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[0].children[0].innerText = event.name;
          eventId.children[0].children[1].innerText = `E: ${event.energy} IQ: ${event.IQ}`;
        } else if (rightSpecial.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[0].children[0].innerText = event.name;
          eventId.children[0].children[1].innerText = `E: ${event.energy} IQ: ${event.IQ}`;
        }
        else if (bottomRow.includes(+event.board_id)) {
          const eventId = document.getElementById(`${event.board_id}`)
          eventId.children[1].innerText = event.name
          eventId.children[2].innerText = `E: ${event.energy} IQ: ${event.IQ}`
        }else if (leftRow.includes(+event.board_id)) {
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
      }) //end of for each
    })




}) // end of document listener
