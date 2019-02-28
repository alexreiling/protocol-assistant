module.exports = {
  sendToWebContents: (browserWindow, message, params) => {
    browserWindow.webContents.send(message, params)
  }
}