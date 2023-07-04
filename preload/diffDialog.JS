// 在渲染进程中接收参数
const { log } = require('console');
const { ipcRenderer, contextBridge } = require('electron');

let dataObj = {}

ipcRenderer.on('value', (event, data) => {
    const old1 = JSON.parse(data.oldValue)
    const new1 = JSON.parse(data.newValue)
    console.log('123',JSON.parse(data.oldValue), JSON.parse(data.newValue))
    dataObj = data
});

const getList = () => {
    return dataObj
}

contextBridge.exposeInMainWorld('myDiff', {
    getList
})