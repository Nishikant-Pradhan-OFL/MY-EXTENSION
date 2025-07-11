document.getElementById('colorPicker').addEventListener('input', function ()
 {
  const color = this.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) 
  {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;

    chrome.storage.sync.set({ [domain]: color });

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
      args: [color]
    });
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) 
{
  const url = new URL(tabs[0].url);
  const domain = url.hostname;

  chrome.storage.sync.get(domain, (data) => {
    if (data[domain]) {
      document.getElementById('colorPicker').value = data[domain];
    }
  });
});

document.getElementById('colorPicker').addEventListener('input', function () {
  const color = this.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;

    chrome.storage.sync.set({ [domain]: color });

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
      args: [color]
    });
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) 
{
  const url = new URL(tabs[0].url);
  const domain = url.hostname;

  chrome.storage.sync.get(domain, (data) => {
    if (data[domain]) {
      document.getElementById('colorPicker').value = data[domain];
    }
  });

  document.getElementById('resetBtn').addEventListener('click', function () 
  {
    chrome.storage.sync.remove(domain, () => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          document.body.style.backgroundColor = "";
        }
      });
      window.close();
    });
  });
});

function getDomain(tabs) 
{
  const url = new URL(tabs[0].url);
  return url.hostname;
}

document.getElementById('colorPicker').addEventListener('input', function () 
{
  const color = this.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) 
  {
    const domain = getDomain(tabs);
    chrome.storage.sync.set({ [domain]: color });
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (color) => document.body.style.backgroundColor = color,
      args: [color]
    });
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) 
{
  const domain = getDomain(tabs);

  chrome.storage.sync.get([domain, domain + "_mode"], (data) => {
    if (data[domain]) {
      document.getElementById('colorPicker').value = data[domain];
    }

    const mode = data[domain + "_mode"] || "light";
    const modeToggle = document.getElementById("modeToggle");
    modeToggle.checked = mode === "dark";
    document.getElementById("modeLabel").textContent = mode === "dark" ? "Dark Mode" : "Light Mode";
  });

  document.getElementById('modeToggle').addEventListener('change', function () 
  {
    const mode = this.checked ? "dark" : "light";
    document.getElementById("modeLabel").textContent = mode === "dark" ? "Dark Mode" : "Light Mode";
    chrome.storage.sync.set({ [domain + "_mode"]: mode });
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (mode) => {
        if (mode === "dark") 
        {
          document.body.style.color = "white";
        } 
        else 
        {
          document.body.style.color = "black";
        }
      },
      args: [mode]
    });
  });

  document.getElementById('resetBtn').addEventListener('click', function () 
  {
    chrome.storage.sync.remove([domain, domain + "_mode"], () => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          document.body.style.backgroundColor = "";
          document.body.style.color = "";
        }
      });
      window.close();
    });
  });
});
