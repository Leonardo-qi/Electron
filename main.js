const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const WinState = require('electron-win-state').default

require('./controller/getPath')
require('./controller/dialog')

// 菜单数组
const mainMenu = Menu.buildFromTemplate([
  {
    label: 'Actions',
    submenu: [
      {
        label: '控制台',
        role: 'toggleDevTools',
        accelerator: 'Ctrl+U',
      },
    ],
  },
])

// // 上下文菜单数组
// const contextMenu = Menu.buildFromTemplate([
//   { label: '退出', click: () => { app.quit(); } }
// ])

// 托盘菜单数组
const trayMenu = Menu.buildFromTemplate([
  { label: '退出', click: () => { app.quit(); } }
])

// 初始化托盘
const createTray = (win) => {
  tray = new Tray('1.jpg')
  tray.setToolTip('桌面应用')

  tray.on('click', e => {

    if (e.shiftKey) {
      app.quit()
    } else {
      win.isVisible() ? win.hide() : win.show()
    }
  })

  tray.setContextMenu(trayMenu)
}

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

  // 右键菜单
  // wc.on('context-menu', (e, params) => {
  //   console.log('123',e, params)
  //   // 上下文menu
  //   contextMenu.popup(contextMenu)

  // })


  winState.manage(win)

  // 窗口 最大化
  win.maximize()

  // 创建菜单
  Menu.setApplicationMenu(mainMenu)

  // 创建托盘
  createTray(win)

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('close', (event) => {
    event.preventDefault(); // 取消默认的关闭行为
    win.hide(); // 隐藏窗口到托盘
  });
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
