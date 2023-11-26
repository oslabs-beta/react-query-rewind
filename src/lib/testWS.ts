// import WebSocket, { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 4040 });

// // connection even happens when client connects
// wss.on('connection', function connection(ws) {

//   // logs when connection from client happens
//   console.log('Connected to client client');

//   // event listener for incoming messages
//   ws.on('message', function incoming(message) {
//     console.log('Received: ', message);
//   });

//   // send message back on connection
//   ws.send('Succesfully connected to server');
// });

// export const sendToChrome = (simplifiedEventObj) => {
//   // assume 1 client for now. There is no send method on wss - need to iterate through connected clients
//   wss.clients.forEach(client => {
//     client.send(JSON.stringify(simplifiedEventObj))
//   });
// }

const socket = new WebSocket('ws://localhost:4040');

socket.onopen = function(event) {
  console.log('Connection established');
  // You can now send messages to the server
};

socket.onmessage = function(event) {
  console.log('Message from server:', event.data);
  // Handle incoming messages
};

socket.onerror = function(error) {
  console.error('WebSocket error:', error);
  // Handle errors
};

socket.onclose = function(event) {
  console.log('Connection closed');
  // Handle connection closure
};

export const sendToChrome = (simplifiedEventObj) => {
  socket.send(JSON.stringify(simplifiedEventObj))
}