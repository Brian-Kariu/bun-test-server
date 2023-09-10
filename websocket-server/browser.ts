const socket = new WebSocket("ws://localhost:3000/chat",{ 
  headers: {
    "authToken": "authorized",
    "X-token": "something"
  },
});

socket.addEventListener("message", event => {
  console.log(event.data);
})
