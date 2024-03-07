//content script accesses current DOM of tab the user is currently in
let script;

//inject script into current DOM
const inject = fileName => {
  // console.log("CONTENTSCRIPT.JS: INJECTING SCRIPT");
  script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', chrome.runtime.getURL(fileName));
  document.body.appendChild(script);
  // console.log("CONTENTSCRIPT.JS: SCRIPT INJECTION SUCCESSFULL");
};

//invoke inject function to inject script
inject('inject.js');

//wait for message from inject.js, when recieved send another message to app.tsx
window.addEventListener('message', event => {
  // console.log("message from inject.js", event.data.eventListStr);
  if (event.data.type && event.data.type === 'EVENT_LIST') {
    // console.log("event", event);
    chrome.runtime.sendMessage({
      action: event.data.type,
      data: event.data.eventListStr,
    });
  }
});

//testing
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle the message received from the popup
  // console.log("message received from popup");
  const event = new CustomEvent('CustomEventFromContentScript', {
    detail: { message: 'Hello from content script!' },
  });
  document.dispatchEvent(event);
  // console.log(message);
});

const windowListener = event => {
  // Validate the message origin and structure
  if (
    event.source === window &&
    event.data.type &&
    event.data.type === 'react-query-rewind'
  ) {
    // Handle the data
    console.log('Message from the window:', event.data.payload);
    const message = event.data.payload;
    chrome.runtime.sendMessage({ sender: 'content script', message: message });
  }
};
window.addEventListener('message', windowListener);

const messageListener = async (message, sender, sendResponse) => {
  if (message.sender === 'UpdateUI') {
    const event = new CustomEvent('UpdateUI', {
      detail: { currentQuery: message.currentQuery },
    });
    window.dispatchEvent(event);
  }
  if (message.sender === 'TimeTravel') {
    const event = new CustomEvent('TimeTravel', {
      detail: { timeTravel: message.timeTravel },
    });
    window.dispatchEvent(event);
  }
  return true;
};

chrome.runtime.onMessage.addListener(messageListener);

// sends message to the window to reload when the chrome dev tool opens
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'reloadPage') {
    window.location.reload();
  }
});
