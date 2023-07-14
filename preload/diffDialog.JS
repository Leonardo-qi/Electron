// 在渲染进程中接收参数
const { ipcRenderer, contextBridge } = require('electron');

let dataObj = {}
let diffData = []

ipcRenderer.on('value', (event, data) => {
    dataObj = data
    diffData = compareFiles(JSON.stringify(JSON.parse(data.oldValue), null, 2), JSON.stringify(JSON.parse(data.newValue), null, 2));
});

const getdiffList = (isDiff) => {
    diffData = compareFiles(JSON.stringify(JSON.parse(dataObj.oldValue), null, 2), JSON.stringify(JSON.parse(dataObj.newValue), null, 2), isDiff);
}

const getList = () => {
    return diffData
}

const compareFiles = (file1, file2, isDiff = true) => {
    const lines1 = file1.split('\n');
    const lines2 = file2.split('\n');
    const diff = [];

    for (let i = 0; i < lines1.length || i < lines2.length; i++) {
        if (lines1[i] !== lines2[i]) {
            diff.push({
                line: i + 1,
                content1: lines1[i] || '',
                content2: lines2[i] || ''
            });
        } else {
            if (isDiff) {
                diff.push({
                    line: i + 1,
                    text: lines1[i] || '',
                });
            }
        }
    }
    return diff;
}

contextBridge.exposeInMainWorld('myDiff', {
    getList,
    getdiffList
})
