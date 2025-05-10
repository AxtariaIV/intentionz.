document.addEventListener('DOMContentLoaded', function() {
  const intentionInput = document.getElementById('intentionInput');
  const updateButton = document.getElementById('updateIntention');
  const currentUrlDiv = document.getElementById('currentUrl');
  const warningDiv = document.getElementById('warning');

  // Load current URL
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0] && tabs[0].url) {
      currentUrlDiv.textContent = new URL(tabs[0].url).hostname;
    }
  });

  // Load saved intention
  chrome.storage.local.get('currentIntention', function(data) {
    if (data.currentIntention) {
      intentionInput.value = data.currentIntention;
    }
  });

  // Check for prompts
  chrome.storage.local.get('promptData', function(data) {
    if (data.promptData) {
      if (data.promptData.type === 'deviation') {
        warningDiv.textContent = `Warning: Current activity may not align with your intention: "${data.promptData.currentIntention}"`;
      }
      // Clear the prompt
      chrome.storage.local.remove('promptData');
    }
  });

  updateButton.addEventListener('click', function() {
    const intention = intentionInput.value;
    if (intention) {
      chrome.runtime.sendMessage({
        type: 'setIntention',
        intention: intention
      });
      warningDiv.textContent = 'Intention updated!';
      setTimeout(() => {
        warningDiv.textContent = '';
      }, 2000);
    }
  });
});

**THIS IS POPUP.JS**
