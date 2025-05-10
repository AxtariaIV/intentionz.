async function checkIntentionDeviation(url, tabId) {
  if (!currentIntention) {
    promptForIntention(url);
    return;
  }

  // Skip checking for these URLs:
  const warningPageUrl = "chrome-extension://knmcliefcanmpgdmljpllhnpdeffogai/warning.html";
  if (url.startsWith('chrome://') || 
      url === warningPageUrl ||
      url === chrome.runtime.getURL("warning.html")) {
    return;
  }

  if (url !== lastUrl) {
    const urlKeywords = new URL(url).hostname.toLowerCase();
    const intentionKeywords = currentIntention.toLowerCase().split(' ');
    
    const matches = intentionKeywords.some(keyword => 
      urlKeywords.includes(keyword)
    );

    if (!matches) {
      showDeviationWarning(url, tabId);
    }
    
    lastUrl = url;
  }
}

// ... rest of your existing code remains exactly the same ...
function promptForIntention(url) {
  chrome.storage.local.set({
    'promptData': {
      type: 'intention',
      url: url
    }
  });
}

function showDeviationWarning(url, tabId) {
  chrome.windows.create({
    url: chrome.runtime.getURL("warning.html"),
    type: "popup",
    width: 400,
    height: 300,
    focused: true
  });
  chrome.storage.local.set({
    'promptData': {
      type: 'deviation',
      url: url,
      currentIntention: currentIntention
    }
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'setIntention') {
    currentIntention = request.intention;
    // Save to storage
    chrome.storage.local.set({ 'currentIntention': currentIntention });
  }
  sendResponse({success: true});
});

// Load saved intention on startup
chrome.storage.local.get('currentIntention', (data) => {
  if (data.currentIntention) {
    currentIntention = data.currentIntention;
  }
});

**THIS IS BACKGROUND.JS**
