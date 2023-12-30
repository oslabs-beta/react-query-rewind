console.log('CONTENT.TS: Loaded');

let appConnected = false;
let backgroundConnected = false;
let contentMessageQueue: any = [];

// handle messages from npm package
window.addEventListener('message', handleMessage, false);

// handle messages from background.ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'background-connected') {
    console.log('CONTENT.TS: Background.ts Connected');
    backgroundConnected = true;
    contentMessageQueue.forEach((message: any) => {
      sendMessageToBackground(message);
    });
  }

  if (message.type === 'background-disconnected') {
    console.log('CONTENT.TS: Background.ts Disconnected');
    backgroundConnected = false;
  }
});

function handleMessage(event: MessageEvent) {
  if (event.source === window && event.data?.type === 'app-connected') {
    console.log('CONTENT.TS: App Connected');
    appConnected = true;
    sendMessageToBackground(event.data);
  }

  if (event.source === window && event.data?.type === 'event') {
    contentMessageQueue.push(event.data);
    if (backgroundConnected) {
      sendMessageToBackground(event.data);
    }
  }
}

const sendMessageToBackground = (message: any, retryCount = 0) => {
  chrome.runtime.sendMessage(message).catch(err => {
    if (retryCount < 3) {
      console.error(
        `CONTENT.TS: Retry ${
          retryCount + 1
        }: Error sending message to background.ts:`,
        err,
        message
      );
      setTimeout(
        () => messageToContentScript(message, retryCount + 1),
        (retryCount + 1) * 2000
      );
    } else {
      console.error(
        'CONTENT.TS: Max retries reached. Error sending message to background.ts:',
        err,
        message
      );
    }
  });
};
