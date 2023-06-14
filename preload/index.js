const fs = require('fs')
const path = require('path')
const exec = require('child_process').execFile;
const { contextBridge, ipcRenderer } = require('electron');
const { log } = require('console');
var fileDiff = require("diff");

const handleUpdate = async (data) => {
    const res = await ipcRenderer.invoke('on-update-event')
    return res
}

const dialogFn = (data) => {
    ipcRenderer.invoke('on-dialog-event', data)
}

const readFile = (url) => {
    return new Promise((resolve, rejects) => {
        fs.readFile(url, 'utf-8', (err, dataStr) => {
            if (err) {
                rejects('文件读取失败:' + url)
            } else {
                resolve(dataStr)
            }
        })
    })
}

const updateFile = async (url, data) => {

    const oldStr = await readFile(url)

    // let compareUrl = url.replace(path.basename(url), path.basename(url,'.json')+'(old).json')

    // fs.writeFile(compareUrl, oldStr, (err) => {
    // })

    var difference = fileDiff.diffChars(oldStr,data);
    console.log('difference',difference)


    return new Promise((resolve, rejects) => {
        fs.writeFile(url, data, (err) => {
            if (err) {
                rejects('更新文件失败')
            } else {
                resolve('更新成功')
            }
        })
    }) 
}

const Compare = () => {
    const path = "C:\\Program Files\\Notepad++\\notepad++.exe"
    exec(path, function(err, data) { if (err) { throw err; } console.log(data.toString()); }); 
}

contextBridge.exposeInMainWorld('myApi', {
    handleUpdate,
    dialogFn,
    readFile,
    updateFile,
    Compare
})