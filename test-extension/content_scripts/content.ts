console.log('CONTENT.TS: Loaded');

let appConnected = false;
let appMessageQueue: any = [];

// create port and connect with background.ts
const backgroundPort = chrome.runtime.connect({ name: 'content-background' });

// handle background.ts messages - send message if connected to app otherwise add to queue
backgroundPort.onMessage.addListener(message => {
  if (appConnected) {
    window.postMessage(message);
  } else {
    appMessageQueue.push(message);
  }
});

// add listener to the window to handle messages from the app
window.addEventListener('message', handleMessageFromApp, false);

function handleMessageFromApp(message: MessageEvent) {
  // initial message from the app to confirm connection
  if (message.data?.type === 'app-connected') {
    console.log('CONTENT.TS: App Connected');
    appConnected = true;
    appMessageQueue.forEach((message: any) => window.postMessage(message));
    appMessageQueue = [];
  }
  // all other messages are send to background.ts
  else {
    console.log('message to background', message);
    backgroundPort.postMessage(message);
  }
}

// when background.ts confirms connection this function will send it queued and new messages
// const sendMessageToBackground = (message: any, retryCount = 0) => {
//   chrome.runtime.sendMessage(message).catch(err => {
//     // after a failed first attempt it will retry 3 times
//     if (retryCount < 3) {
//       console.error(
//         `CONTENT.TS: Retry ${
//           retryCount + 1
//         }: Error sending message to background.ts:`,
//         err,
//         message
//       );
//       setTimeout(
//         () => sendMessageToBackground(message, retryCount + 1),
//         (retryCount + 1) * 2000
//       );
//     } else {
//       console.error(
//         'CONTENT.TS: Max retries reached. Error sending message to background.ts:',
//         err,
//         message
//       );
//     }
//   });
// };

// listen for messages from background.ts
// chrome.runtime.onMessage.addListener(handleMessageFromBackground);

// function handleMessageFromBackground(
//   message: any,
//   sender: any,
//   sendResponse: any
// ) {
//   // confirms background.ts connection and sends queued messages
//   if (message.type === 'background-connected') {
//     console.log('CONTENT.TS: Background.ts Connected');
//     backgroundConnected = true;
//     backgroundMessageQueue.forEach((message: any) => {
//       sendMessageToBackground(message);
//     });
//   }

//   // turns on time travel updates in app ui
//   if (message.type === 'time-travel') {
//     console.log('CONTENT.TS: TimeTravel Setting Changed');
//     const event = new CustomEvent('time-travel', { detail: message.payload });
//     window.dispatchEvent(event);
//   }

//   // data used to update ui with past state
//   if (message.type === 'update-ui') {
//     console.log('CONTENT.TS: Updated UI');
//     const event = new CustomEvent('update-ui', { detail: message.payload });
//     window.dispatchEvent(event);
//   }
// }
