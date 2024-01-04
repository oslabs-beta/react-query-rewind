// Generate a unique identifier for this instance
const scriptInstanceId = Date.now() + Math.random().toString();

// Define a custom event for signaling cleanup
const cleanupEvent = new CustomEvent('contentScriptCleanup', {
  detail: { id: scriptInstanceId },
});

// Function to perform cleanup
function cleanup(event: any) {
  // Only cleanup if the event is for an older instance
  if (event.detail.id !== scriptInstanceId) {
    // Disconnect from the background page
    backgroundPort.disconnect();
    // Remove event listeners
    window.removeEventListener('message', handleMessageFromApp);
    // Reset state
    appConnected = false;
    appMessageQueue.length = 0;
    console.log('Content script cleaned up.');
  }
}

// Check for existing script instance and signal cleanup
if (window.myContentScriptLoaded) {
  window.dispatchEvent(cleanupEvent);
} else {
  window.myContentScriptLoaded = true;
  // Setup listener for cleanup
  window.addEventListener('contentScriptCleanup', cleanup);
}

console.log('CONTENT.TS: Loaded');

let appConnected = false;
let appMessageQueue: any = [];

// Notify app that content.ts is ready
console.log('is this sending?');
window.postMessage({ type: 'content-script-ready' }, '*');

// Create port and connect with background.ts
const backgroundPort = chrome.runtime.connect({ name: 'content-background' });

// Handle background.ts messages - send message if connected to app otherwise add to queue
backgroundPort.onMessage.addListener(message => {
  if (appConnected) {
    window.postMessage(message);
  } else {
    appMessageQueue.push(message);
  }
});

// Handle disconnection of the port
backgroundPort.onDisconnect.addListener(() => {
  console.log('Disconnected from background script');
  appConnected = false;
  // Optionally, handle the message queue appropriately
  // For example, clear it or process remaining messages
  appMessageQueue = [];
  // Re-establish the port connection if necessary
  // backgroundPort = chrome.runtime.connect({ name: 'content-background' });
});

// Add listener to the window to handle messages from the app
window.addEventListener('message', handleMessageFromApp, false);

function handleMessageFromApp(message: MessageEvent) {
  // Initial message from the app to confirm connection
  if (message.data?.type === 'app-connected') {
    console.log('CONTENT.TS: App Connected');
    appConnected = true;
    appMessageQueue.forEach((message: any) => window.postMessage(message));
    appMessageQueue = [];
  }
  // All other messages are send to background.ts
  if (message.data?.type === 'event') {
    console.log('message to background', message.data);
    backgroundPort.postMessage(message.data);
  }
}

export {};
