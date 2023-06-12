const { app, BrowserWindow } = require('electron')
const path = require('path')
const WinState = require('electron-win-state').default

const createWindow = () => {

    const winState = new WinState({
        defaultWidth: 1000,
        defaultHeight: 800,
    })

    const win = new BrowserWindow({
        ...winState.winOptions,
        webPreferences: {
            nodeIntegration: true,
            preload: path.resolve(__dirname, './preload/index')
        }
    })

    win.loadURL('http://localhost:5173')

    const wc = win.webContents

    wc.openDevTools()

    winState.manage(win)
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