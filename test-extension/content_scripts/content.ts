// Extend the Window interface
declare global {
  interface Window {
    __myUniqueListenerFlag?: boolean;
  }
}

// Ensure this file is treated as a module
export {};

// Define the listener as a named function for reference
function handleMessage(event: MessageEvent) {
  // Only accept messages from the same frame
  if (event.source === window && event.data?.type === 'event') {
    // Send the specific message to the background script
    chrome.runtime.sendMessage(event.data);
  }
}

// Use a flag to check if the listener has already been added
if (!window.__myUniqueListenerFlag) {
  window.__myUniqueListenerFlag = true;

  // Add the listener
  console.log('Adding event listener');
  window.addEventListener('message', handleMessage, false);
}
