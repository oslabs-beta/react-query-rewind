console.log('content.ts loaded');

let appConnected = false;
let backgroundConnected = false;
let contentMessageQueue: any = [];

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
    backgroundConnected = false;
  }
});

function handleMessage(event: MessageEvent) {
  if (event.source === window && event.data?.type === 'app-connected') {
    appConnected = true;
    chrome.runtime.sendMessage(event.data).catch(err => {
      console.error(
        'CONTENT.TS: Error sending connection message to background.ts:',
        err
      );
    });
  }

  if (event.source === window && event.data?.type === 'event') {
    contentMessageQueue.push(event.data);
    if (backgroundConnected) {
      sendMessages();
    }
  }
}

function sendMessages() {
  contentMessageQueue.forEach((msg: any) => {
    chrome.runtime.sendMessage(msg).catch(err => {
      console.error(
        'CONTENT.TS: Error sending event message to background.ts:',
        err
      );
    });
  });
  contentMessageQueue = [];
}
