var userAgent = navigator.userAgent.toLowerCase();
export const isElectron = userAgent.indexOf(' electron/') > -1
export const ipcRenderer = isElectron ? window.electron.ipcRenderer : null;
export function sendToMain(message,params) {
  console.log('Sending to main:', 'Message:', message, 'params:', params)
  if(isElectron) ipcRenderer.send(message,params)  
}
