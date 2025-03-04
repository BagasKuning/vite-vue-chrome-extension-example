chrome.action.onClicked.addListener(async tab => {
  try {
    console.log("chrome action onClicked");
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { toggleVisible: true });
    }
  } catch (error) {
    console.error({ error });
  }
});

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log({ tab });
  return tab;
}

function changePageColor(color) {
  document.body.style.backgroundColor = color;
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type == "POPUP_INIT") {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//       sendResponse(tabs[0]); // Kirim tab aktif ke popup
//     });
//     return true; // ⚠️ WAJIB untuk fungsi async!
//   }
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "POPUP_INIT":
      getCurrentTab().then(sendResponse);
      return true;

    case "CHANGE_COLOR":
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        console.log({ tabs });
        if (tabs.length === 0) return;
        const tabId = tabs[0].id;

        chrome.scripting.executeScript({
          target: { tabId },
          function: changePageColor, // Panggil fungsi untuk mengubah warna
          args: [request.color] // Kirim warna yang diinginkan dari popup
        });
      });
      break;

    default:
      break;
  }
});
