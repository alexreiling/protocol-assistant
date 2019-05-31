
// Modules to control application life and create native browser window
const electron = require('electron')
const { app, ipcMain, dialog } = electron;

var MainWindow = require('./mainWindow')
var SimTools = require('./simTools')
const { sendToWebContents } = require('./util/electronHelpers')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', MainWindow.create)

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (MainWindow.window === null) {
    MainWindow.create()
  }
})

// event handlers
ipcMain.on('toggle-width', (e, args) => {
  MainWindow.toggleCollapse()
})

ipcMain.on('close-app', (e, args) => {
  dialog.showMessageBox({
    title: 'Anwendung schließen',
    message: 'Wollen Sie Elisa wirklich beenden?',
    type: 'question',
    defaultId: 1,
    cancelId: 1,
    buttons: ['Ja', 'Nein']
  }, (response) => {
    if (response === 0) {
      MainWindow.close();
      SimTools.close();
    }
  })
})
ipcMain.on('open-dev', (e, args) => {
  MainWindow.window.openDevTools({ mode: 'detach' })
})
ipcMain.on('store-action', (event, args) => {
  sendToWebContents(MainWindow.window, 'store-action', args)
})
ipcMain.on('recorder-action', (event, args) => {
  sendToWebContents(MainWindow.window, 'recorder-action', args)
})
ipcMain.on('store-action-response', (event, args) => {
  sendToWebContents(SimTools.window, 'store-action-response', args)
})
ipcMain.on('recorder-state', (event, args) => {
  if (SimTools && SimTools.window) sendToWebContents(SimTools.window, 'recorder-state', args)
})
ipcMain.on('open-sim-tools', (e, args) => {
  if (!SimTools.window) SimTools.create()
  else SimTools.window.focus()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})