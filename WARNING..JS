document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('promptData', (data) => {
      if (data.promptData?.type === 'deviation') {
        // 1. Handle intention text (with fallback)
        document.getElementById('intentionText').textContent = 
          data.promptData.currentIntention || "No intention set";
        
        // 2. Safely handle URL display
        let currentSite;
        try {
          const url = new URL(data.promptData.url);
          currentSite = url.hostname.replace('www.', ''); // Cleaner display
        } catch (e) {
          // Fallback for invalid URLs:
          currentSite = data.promptData.url 
            ? `${data.promptData.url.slice(0, 30)}${data.promptData.url.length > 30 ? "..." : ""}`
            : "Unknown site";
        }
        document.getElementById('currentSite').textContent = currentSite;
      }
    });
  
    // 3. Close button behavior (unchanged)
    document.getElementById('acknowledgeBtn').addEventListener('click', () => {
      window.close();
    });
  });

**THIS IS WARNING.JS**
