const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const WinState = require('electron-win-state').default

require('./controller/getPath')
require('./controller/dialog')

// 菜单数组
let mainMenu = Menu.buildFromTemplate([
  {
    label: 'Actions',
    submenu: [
      {
        label: '控制台',
        role: 'toggleDevTools',
        accelerator: 'Command+U',
      },
    ],
  },
])

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

  // wc.openDevTools()

  winState.manage(win)

  // win.maximize()

  Menu.setApplicationMenu(mainMenu)

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on("close", () => {

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
