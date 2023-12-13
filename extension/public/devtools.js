// Create a tab in the devtools area
chrome.devtools.panels.create(
  'RQRewind',
  './icon-16.png',
  'panel.html',
  function (panel) {
    // listen for the panel to be shown
    panel.onShown.addListener(function (panelWindow) {
      // send a message to the background script when the DevTools panel is shown
      chrome.runtime.sendMessage({ type: 'devtoolsOpened' });
    });
  }
);
