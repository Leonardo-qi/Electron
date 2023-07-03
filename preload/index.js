const fs = require('fs')
const path = require('path')
const exec = require('child_process').execFile
const { contextBridge, ipcRenderer } = require('electron')
const { log } = require('console')
var fileDiff = require('diff')
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
  updateFile,
  dialogMessage,
})
