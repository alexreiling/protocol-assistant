const electron = require('electron')
const { BrowserWindow } = electron;
const config = require('./config');
const { sendToWebContents } = require('./util/electronHelpers')
const isDev = require('electron-is-dev');
const path = require('path')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function getFullWidth() {
  return Math.round(electron.screen.getPrimaryDisplay().workAreaSize.width * config.fullWidthScreenRatio)
}

module.exports = MainWindow = {
  // props
  get window() {
    return mainWindow
  },
  collapsed: true,

  // methods
  create: () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      //width: Math.max(width/3,400),
      height: electron.screen.getPrimaryDisplay().workAreaSize.height,
      width: config.collapsedWidth,
      resizable: false,
      frame: false,
      minWidth: 0,
      title: 'eLisA',
      show: false,
      minHeight: 0,
      hasShadow: true,
      webPreferences: {
        nodeIntegration: false,
        preload: __dirname + '/preload.js'
      }
    })
    mainWindow.collapsed = true;
    // and load the index.html of the app.
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('navigation', '/app')
    })

    mainWindow.once('ready-to-show', () => {
      MainWindow.dockRight(mainWindow)
      mainWindow.show()
    })
    // Emitted when the mainWindow is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  },
  close: () => {
    mainWindow.close()
  },
  toggleCollapse: () => {
    const appWidth = MainWindow.collapsed ? getFullWidth() : config.collapsedWidth
    MainWindow.resize(appWidth)
    MainWindow.collapsed = !MainWindow.collapsed
    MainWindow.dockRight()

  },
  resize: (width, height) => {
    height = height || mainWindow.getSize()[1]
    mainWindow.setResizable(true)
    mainWindow.setSize(width, height || mainWindow.getSize()[1])
    sendToWebContents(mainWindow, 'toggled', { width, height })
    mainWindow.setResizable(false)
  },
  dockRight: () => {
    const screenWidth = electron.screen.getPrimaryDisplay().workAreaSize.width
    const appWidth = mainWindow.getSize()[0]
    mainWindow.setPosition(screenWidth - appWidth, 0)
  }

}