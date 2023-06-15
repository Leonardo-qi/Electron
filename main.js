const { log } = require('console')
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const WinState = require('electron-win-state').default

require('./controller/getPath')
require('./controller/dialog')

const createWindow = () => {
  const winState = new WinState({
    defaultWidth: 1000,
    defaultHeight: 800,
  })

  const win = new BrowserWindow({
    ...winState.winOptions,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, './preload/index.js'),
    },
    show: false,
  })

  win.loadURL('http://localhost:5173')

  const wc = win.webContents

    wc.openDevTools()

  winState.manage(win)

  win.on('ready-to-show', () => {
    win.show()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
