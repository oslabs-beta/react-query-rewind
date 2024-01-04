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
  if (message.data?.type === 'event') {
    console.log('message to background', message.data);
    backgroundPort.postMessage(message.data);
  }
}
