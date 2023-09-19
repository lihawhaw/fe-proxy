console.log("background!!!");

let rules = [];
chrome.storage.local.get(["rules"], (data) => {
  rules = JSON.parse(data.rules) || [];
});
chrome.storage.onChanged.addListener((changes) => {
  // const { newValue } = JSON.parse(changes);
  // rules = newValue;
  console.log("changes", changes);
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (
      details.url ===
      "http://datamap-pre.didichuxing.com/dataMap/api/web/v1/common/avatar"
    ) {
      return {
        redirectUrl: `data:application/json;charset=utf-8,{"resultCode": "0","returnMsg": "success","data": ""}`,
      };
    }
  },
  {
    urls: [
      "http://datamap-pre.didichuxing.com/dataMap/api/web/v1/common/avatar",
    ],
  },
  ["blocking"]
);
