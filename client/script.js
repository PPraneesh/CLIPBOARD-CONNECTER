import { io } from "socket.io-client";

const socket = io("http://192.168.0.107:3000");

socket.on("connect", () => {
  console.log(socket.id);
  console.log(socket);
});

socket.on("receive-message", (message) => {
  window.focus();
  displayMessage(message);
});

const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const joinRoomButton = document.getElementById("join-room");
const disconnectButton = document.getElementById("disconnect");
const form = document.getElementById("form");

disconnectButton.addEventListener("click", () => {
  socket.disconnect();
  displayMessage("Disconnected from server");
});
joinRoomButton.addEventListener("click", () => {
  displayMessage("Joined room " + roomInput.value);
  const room = roomInput.value;
  socket.emit("join-room", room);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  console.log(message);
  const room = roomInput.value;
  if (message === "") return;
  displayMessage(message);
  // navigator.clipboard.readText().then(text => {
  //   console.log("Pasted content: ", text);
  // });
  socket.emit("send-message", message, room);
});

function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  document.getElementById("message-container").append(messageElement);
}
