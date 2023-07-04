const fs = require('fs')
const { contextBridge, ipcRenderer } = require('electron')
const Moment = require('moment')

const handleUpdate = async (data) => {
  const res = await ipcRenderer.invoke('on-update-event')
  return res
}

const dialogFn = (data) => {
  ipcRenderer.invoke('on-dialog-event', data)
}

const dialogMessage = (data, filePath) => {
  ipcRenderer.invoke('on-message-event', data, filePath)
}

const checkFileBox = (data, filePath) => {
  ipcRenderer.invoke('on-check-file', data, filePath)
}

// 获取文件大小
const fileSize = (url) => {
  return new Promise((resolve, rejects) => {
    fs.stat(url, (err, stats) => {
      if (err) {
        rejects('文件大小获取失败')
      } else {
        const fileSizeInBytes = stats.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024;
        const fileSizeInMegabytes = fileSizeInKilobytes / 1024;
        resolve({
          fileSizeInBytes: `${fileSizeInBytes.toFixed(2)} bytes`,
          fileSizeInKilobytes: `${fileSizeInKilobytes.toFixed(2)} KB`,
          fileSizeInMegabytes: `${fileSizeInMegabytes.toFixed(2)} MB`
        })
      }
    });
  })
}

// 读取文件内容
const readFile = (url) => {
  return new Promise((resolve, rejects) => {
    fs.readFile(url, 'utf-8', (err, dataStr) => {
      if (err) {
        fs.access(url, (errorStr) => {
          if (errorStr) {
            rejects('当前目录中没有该文件')
          } else {
            rejects('未知错误请重试')
          }
        })
      } else {
        resolve(dataStr)
      }
    })
  })
}

// 更新文件
const updateFile = async (url, data) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(url, data, (err) => {
      if (err) {
        rejects({ msg: '更新文件失败' })
      } else {
        const updateTime = new Date()
        resolve({
          msg: '更新成功',
          time: Moment().format('YYYY-MM-DD HH:mm:ss'),
        })
      }
    })
  })
}

contextBridge.exposeInMainWorld('myApi', {
  handleUpdate,
  dialogFn,
  readFile,
  fileSize,
  updateFile,
  dialogMessage,
  checkFileBox
})
