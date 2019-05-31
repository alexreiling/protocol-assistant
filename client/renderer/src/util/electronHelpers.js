var userAgent = navigator.userAgent.toLowerCase();
const {dialog,app} = window.electron.remote;
var fs = window.electron.remote.require('fs')

export const isElectron = userAgent.indexOf(' electron/') > -1
export const ipcRenderer = isElectron ? window.electron.ipcRenderer : null;
export function sendToMain(message,params) {
  if(isElectron) ipcRenderer.send(message,params)  
}
export const saveFile = (content, saveOptions, callback) => {
  saveOptions.defaultPath = saveOptions.defaultPath || app.getPath('documents')
  dialog.showSaveDialog(saveOptions, (fileName) => {
    if (fileName === undefined){
        console.log("You didn't save the file");
        return;
    }
    // fileName is a string that contains the path and filename created in the save file dialog.  
    console.log(fs)
    fs.writeFile(fileName, content, (err) => {
        if(err){
            alert("Ein Fehler ist beim Speichern der Datei aufgetreten: "+ err.message)
        }
        callback && callback()
    });
  });
}