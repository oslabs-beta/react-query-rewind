console.log('background.ts loaded');

let devToolsPort: chrome.runtime.Port | null = null;
let contentScriptTabId: number | undefined = undefined;
let backgroundMessageQueue: any = [];

function messageToContentScript(
  tabId: any,
  message: any,
  retryCount: number = 0
) {
  chrome.tabs.sendMessage(tabId, message).catch(err => {
    if (retryCount < 3) {
      console.error(
        `BACKGROUND.TS: Retry ${
          retryCount + 1
        }: Error sending connection message to content.ts`,
        err
      );
      setTimeout(
        () => messageToContentScript(tabId, message, retryCount + 1),
        1000
      );
    } else {
      console.error(
        'BACKGROUND.TS: Max retries reached. Error sending message to content.ts:',
        err
      );
    }
  });
}

chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
  if (port.name === 'devtools-panel') {
    console.log('BACKGROUND.JS: DevTool connected');
    devToolsPort = port;

    devToolsPort.onDisconnect.addListener(() => {
      console.log('BACKGROUND.JS: DevTool disconnected');
      devToolsPort = null;
    });

    sendDevToolMessages();
  }
});

chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
  console.log('BACKGROUND.TS: Message from content.js');

  if (message.type === 'app-connected') {
    console.log(
      'BACKGROUND.TS: TabId saved and sent connection message to content.js'
    );
    contentScriptTabId = sender.tab?.id;

    messageToContentScript(contentScriptTabId, {
      type: 'background-connected',
    });
  } else {
    backgroundMessageQueue.push(message);
  }

  if (devToolsPort) {
    sendDevToolMessages();
  }
});

const sendDevToolMessages = () => {
  console.log('BACKGROUND.TS: Sent all messages to Dev Tool');
  backgroundMessageQueue.forEach((curMsg: any) => {
    if (devToolsPort) {
      devToolsPort.postMessage(curMsg);
    }
  });
  backgroundMessageQueue = [];
};
