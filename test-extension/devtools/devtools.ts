chrome.devtools.panels.create(
  'My Panel', // Title for the panel tab
  'images/icon.png', // Icon for the panel tab
  'panel.html', // HTML file for the panel content
  panel => {
    // Code to execute on panel creation
  }
);
