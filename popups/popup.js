// flipkart search query
// https://www.flipkart.com/search?q={PRODUCT_NAME}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off

// amazon search query
// https://www.amazon.in/s?k={PRODUCT_NAME}&i=computers&crid=1XD4RZX73V5X3&sprefix={PRODUCT_NAME}

// to get the product name
// https://www.amazon.in/{PRODUCT_NAME}  --> put this in the search query of flipkart
// https://www.flipkart.com/{PRODUCT_NAME} --> put this in the search query of amazon

async function getCurrentTabUrl() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  if (tab && tab.url) {
    return tab.url;
  }
  return null;
}

function generateFlipkartUrl(productName) {
  const encodedProduct = encodeURIComponent(productName);
  return `https://www.flipkart.com/search?q=${encodedProduct}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`;
}

function generateAmazonUrl(productName) {
  const encodedProduct = encodeURIComponent(productName);
  return `https://www.amazon.in/s?k=${encodedProduct}&i=computers&crid=1XD4RZX73V5X3&sprefix=${encodedProduct}`;
}

async function redirectToOtherPlatform() {
  const url = await getCurrentTabUrl();

  if (!url) {
    console.error("No active URL found.");
    return;
  }

  const currentUrl = new URL(url);
  const productName = currentUrl.pathname.split("/")[1];

  if (currentUrl.hostname === "www.amazon.in") {
    chrome.tabs.create({
      url: generateFlipkartUrl(productName),
    });
  } else if (currentUrl.hostname === "www.flipkart.com") {
    chrome.tabs.create({
      url: generateAmazonUrl(productName),
    });
  } else {
    console.error("Unsupported platform.");
  }
}

redirectToOtherPlatform();

