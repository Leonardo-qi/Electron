// 在渲染进程中接收参数
const { log } = require('console');
const { ipcRenderer, contextBridge } = require('electron');

let dataObj = {}

ipcRenderer.on('value', (event, data) => {
    dataObj = data
});

const getList = () => {
    return dataObj
}

contextBridge.exposeInMainWorld('myDiff', {
    getList
})