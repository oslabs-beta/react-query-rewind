console.log('content.ts loaded');

let appConnected = false;
let backgroundConnected = false;
let messageQueue: any = [];

// handle messages from npm package
window.addEventListener('message', handleMessage, false);

// handle messages from background.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'background-connected') {
    console.log('CONTENT.TS: background.ts connected');
    backgroundConnected = true;
    sendMessages();
  }

  if (message.type === 'background-disconnected') {
    console.log('CONTENT.TS: background.ts disconnected');
  }
});

function handleMessage(event: MessageEvent) {
  if (event.source === window && event.data?.type === 'app-connected') {
    appConnected = true;
    chrome.runtime.sendMessage(event.data).catch(err => {
      console.error('CONTENT.TS: Error sending message to background.ts:', err);
    });
  }

  if (event.source === window && event.data?.type === 'event') {
    if (backgroundConnected) {
      messageQueue.push(event.data);
      sendMessages();
    }
  }
}

function sendMessages() {
  messageQueue.forEach((msg: any) => {
    console.log('CONTENT.TS: Sent message to background.ts');
    chrome.runtime.sendMessage(msg).catch(err => {
      console.error('CONTENT.TS: Error sending message to background.ts:', err);
    });
  });
  messageQueue = [];
}
