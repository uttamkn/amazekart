// flipkart search query
// https://www.flipkart.com/search?q={PRODUCT_NAME}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off

// amazon search query
// https://www.amazon.in/s?k={PRODUCT_NAME}&i=computers&crid=1XD4RZX73V5X3&sprefix={PRODUCT_NAME}

// to get the product name
// https://www.amazon.in/{PRODUCT_NAME}  --> put this in the search query of flipkart
// https://www.flipkart.com/{PRODUCT_NAME} --> put this in the search query of amazon

async function getCurrentTabUrl() {
    let queryOptions = { active: true, lastFocusedWindow: true };

    // `tab` will either be a `tabs.Tab`(object) or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions); // this returns an array of objects
    //[tab] will be assigned to the first element(details about the current tab) of the array of objects returned

    // Check if tab is defined and has a URL
    if (tab && tab.url) {
      return tab.url;
    } else {
      return null; // Return null if tab or URL is not available
    }
  }

  
  getCurrentTabUrl().then(url => {
    let PRODUCT_NAME;
    let arrayUrl = url.split('/');
    PRODUCT_NAME = arrayUrl[3];

    if(arrayUrl[2] == 'www.amazon.in'){
        chrome.tabs.create({ url: `https://www.flipkart.com/search?q=${PRODUCT_NAME}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off` });
    }
    else if(arrayUrl[2] == 'www.flipkart.com'){
        chrome.tabs.create({ url: `https://www.amazon.in/s?k=${PRODUCT_NAME}&i=computers&crid=1XD4RZX73V5X3&sprefix={PRODUCT_NAME}` });
    }
  });
  