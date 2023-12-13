let devToolsPort = null;

const connectListener = port => {
  // console.log('Background Connected');
  if (port.name === 'devtools-panel') {
    devToolsPort = port;
  }
};
chrome.runtime.onConnect.addListener(connectListener);

const messageListener = async (newEvent, sender, sendResponse) => {
  if (newEvent.sender === 'content script' && devToolsPort !== null) {
    devToolsPort.postMessage({ event: newEvent.message, type: 'event' });
  }

  if (newEvent.sender === 'UpdateUI') {
    // console.log('mesage for updateUI');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // tabs[0].id is the ID of the active tab
      chrome.tabs.sendMessage(tabs[0].id, {
        sender: 'UpdateUI',
        currentQuery: newEvent.currentQuery,
      });
    });
  }
  if (newEvent.sender === 'TimeTravel') {
    // console.log('mesage for timetravel');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        sender: 'TimeTravel',
        timeTravel: newEvent.timeTravel,
      });
    });
  }
  return true;
};

chrome.runtime.onMessage.addListener(messageListener);

chrome.runtime.onSuspend.addListener(() => {
  chrome.runtime.onConnect.removeListener(connectListener);
  chrome.runtime.onMessage.removeListener(messageListener);
});

//event listener for when the chrome dev tool is shown
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'devtoolsOpened') {
    // find the active tab and send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'reloadPage' });
    });
  }
});
