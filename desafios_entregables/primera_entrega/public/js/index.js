const socket = io();

socket.on("para_todos", data => {
    console.log(data)
})