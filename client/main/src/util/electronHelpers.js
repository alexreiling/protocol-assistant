module.exports = {
  sendToWebContents: (browserWindow, message, params) => {
    console.log('Sending to webContents:', 'Window:', browserWindow, 'Message:', message, 'params:', params)
    browserWindow.webContents.send(message, params)
  }
}