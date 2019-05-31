const electron = require('electron')
const { BrowserWindow } = electron;
const path = require('path')
const isDev = require('electron-is-dev');

let bWindow
module.exports = SimTools = {
  get window() {
    return bWindow
  },
  create: () => {
    const { width: screenWidth, height: screenHeight } = electron.screen.getPrimaryDisplay().workAreaSize
    bWindow = new BrowserWindow({
      height: screenHeight / 1.5,
      width: screenWidth / 3,
      title: 'eLisA SimTools',
      show: false,
      x: screenWidth / 6,
      y: screenHeight / 4,
      webPreferences: {
        nodeIntegration: false,
        preload: __dirname + '/preload.js'
      }
    })
    bWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    bWindow.webContents.on('did-finish-load', () => {
      bWindow.webContents.send('navigation', '/simtools')
    })


    //bWindow.loadURL('http://localhost:3000/simtools')
    bWindow.once('ready-to-show', () => {
      bWindow.show()
    })
    bWindow.on('closed', () => bWindow = null)
  },
  close: () => bWindow && bWindow.close()
}
