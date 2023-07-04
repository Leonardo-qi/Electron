//查看文件渲染进程
const { log } = require('console');
const { ipcRenderer, contextBridge } = require('electron');

let dataObj = {}

ipcRenderer.on('value', (event, data) => {
    dataObj = { ...data, oldValue: JSON.parse(data.oldValue) }
});

const getList = () => {
    return dataObj
}
contextBridge.exposeInMainWorld('myCheckFile', {
    getList
})