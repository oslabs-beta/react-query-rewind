console.log('BACKGROUND.TS: Loaded');

let devToolsPort: chrome.runtime.Port | null = null;
let tabId: number | undefined = undefined;
let backgroundMessageQueue: any = [];

// triggered when dev tool starts and connects to background.ts
chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
  if (port.name === 'devtools-panel') {
    console.log('BACKGROUND.TS: DevTool Connected');
    devToolsPort = port;

    // when devtools connect send all messages in the queue
    backgroundMessageQueue.forEach((curMsg: any) => {
      if (devToolsPort) {
        devToolsPort.postMessage(curMsg);
      }
    });
    backgroundMessageQueue = [];

    // notify content.ts when devtool disconnects
    devToolsPort.onDisconnect.addListener(() => {
      console.log('BACKGROUND.TS: DevTool Disconnected');
      devToolsPort = null;
    });
  }
});

// triggered when background.js recieves messages from content.ts
chrome.runtime.onMessage.addListener((message: any, sender) => {
  // if connection message without tabid - update tabid and notify content.ts
  if (message.type === 'app-connected' && tabId === undefined) {
    tabId = sender.tab?.id;
    console.log(`BACKGROUND.TS: Content.js Connected at TabId ${tabId}`);
    messageToContent(tabId, {
      type: 'background-connected',
    });
  }
  // if connection message with tabid already defined - refresh window
  else if (
    message.type === 'app-connected' &&
    tabId !== undefined &&
    sender.tab?.id
  ) {
    tabId = undefined;
    chrome.tabs.reload(sender.tab.id, {}, () => {
      if (chrome.runtime.lastError) {
        console.error(
          `Error Refreshing Tab: ${chrome.runtime.lastError.message}`
        );
      }
    });
  }

  // if devtool is not connected save the message in the queue
  if (!devToolsPort && message.type !== 'app-connected') {
    backgroundMessageQueue.push(message);
  }

  // immediatly send message to devtool if connected
  if (devToolsPort && message.type !== 'app-connected') {
    devToolsPort.postMessage(message);
  }
});

// sends messages to content.js - retries 3 times after failed first attempt
function messageToContent(tabId: any, message: any, retryCount: number = 0) {
  chrome.tabs.sendMessage(tabId, message).catch(err => {
    if (retryCount < 3) {
      console.error(
        `BACKGROUND.TS: Retry ${
          retryCount + 1
        }: Error sending connection message to content.ts`,
        err,
        message
      );
      setTimeout(
        () => messageToContent(tabId, message, retryCount + 1),
        (retryCount + 1) * 2000
      );
    } else {
      console.error(
        'BACKGROUND.TS: Max retries reached. Error sending message to content.ts:',
        err,
        message
      );
    }
  });
}
