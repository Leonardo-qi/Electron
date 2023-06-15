const path = require('path')

const WinState = require('electron-win-state').default

const { app, ipcMain, dialog, BrowserWindow } = require('electron')

// 失败提示框
ipcMain.handle('on-dialog-event', (e, { title, content }) => {
    dialog.showErrorBox(title, content)
})

// 文件更新成功的对话框
ipcMain.handle('on-message-event', (e, data) => {

    const res = dialog.showMessageBoxSync({
        type: 'none',
        title: '文件更新成功',
        message: '更新成功',
        buttons: [ '查看对比差异', '关闭'],
    })

    if (res === 0) {

        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                preload: path.resolve(__dirname, '../preload/diffDialog.js'),
            },
            show: false
        })

        // 向新窗口传递参数
        win.webContents.on('did-finish-load', () => {
            win.webContents.send('value', data);
        });

        win.loadURL('http://localhost:5173/fileDiff')

        win.maximize();

        win.on('ready-to-show', () => {
            win.show()
        })

    }
})