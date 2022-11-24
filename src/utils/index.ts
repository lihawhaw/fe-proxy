export function jump(path: string) {
  const extensionId = chrome.runtime.id
  window.open(`chrome-extension://${extensionId}${path}.html`)
}
