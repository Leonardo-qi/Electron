const { ipcMain, dialog } = require('electron')

// 选择文件路径
ipcMain.handle('on-update-event', async (e) => {
  const res = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  })
  return res.filePaths[0]
})
