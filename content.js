const domain = window.location.hostname;

chrome.storage.sync.get([domain, domain + "_mode"], (data) => {
  const savedColor = data[domain];
  const savedMode = data[domain + "_mode"];

  if (savedColor) 
  {
    document.body.style.backgroundColor = savedColor;
  }

  if (savedMode === "dark") 
  {
    document.body.style.color = "white";
  } 
  else if (savedMode === "light") 
  {
    document.body.style.color = "black";
  }
});
