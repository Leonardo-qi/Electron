const { ipcMain, dialog } = require('electron')

// 失败提示框
ipcMain.handle('on-dialog-event', (e, { title, content }) => {
    dialog.showErrorBox(title, content)
})
