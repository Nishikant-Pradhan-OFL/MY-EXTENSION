chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeColor
  });
});

function changeColor() {
  document.body.style.backgroundColor = "#222";
}
