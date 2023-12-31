console.log('CONTENT.TS: Loaded');

let appConnected = false;
let backgroundConnected = false;
let contentMessageQueue: any = [];

// handle messages from npm package
window.addEventListener('message', handleMessage, false);

function handleMessage(event: MessageEvent) {
  if (event.source === window && event.data?.type === 'app-connected') {
    console.log('CONTENT.TS: App Connected');
    appConnected = true;
    messageToBackground(event.data);
  }

  if (event.source === window && event.data?.type === 'event') {
    contentMessageQueue.push(event.data);
    if (backgroundConnected) {
      messageToBackground(event.data);
    }
  }
}

const messageToBackground = (message: any, retryCount = 0) => {
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
        () => messageToBackground(message, retryCount + 1),
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

// listen for messages from background.ts
chrome.runtime.onMessage.addListener(handleMessageFromBackground);

function handleMessageFromBackground(
  message: any,
  sender: any,
  sendResponse: any
) {
  if (message.type === 'background-connected') {
    console.log('CONTENT.TS: Background.ts Connected');
    backgroundConnected = true;
    contentMessageQueue.forEach((message: any) => {
      messageToBackground(message);
    });
  }

  if (message.type === 'time-travel') {
    console.log('CONTENT.TS: TimeTravel Setting Changed');
    const event = new CustomEvent('time-travel', { detail: message.payload });
    window.dispatchEvent(event);
  }

  if (message.type === 'update-ui') {
    console.log('CONTENT.TS: Updated UI');
    const event = new CustomEvent('update-ui', { detail: message.payload });
    window.dispatchEvent(event);
  }
}
