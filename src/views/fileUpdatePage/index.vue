
<script setup>
import axios from "axios"
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CirclePlus } from '@element-plus/icons-vue'

const newObj = `{
    "id": "123456789",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
}`

// 服务地址
const serviceUrl = [
    { label: 'http://172.17.17.81:10205/v2/api-docs', value: '/api/v2/api-docs' },
    { label: '本地内容', value: 1 },
]

// 文件格式
const fileFormat = [
    { label: 'text', value: '.text' },
    { label: 'json', value: '.json' },
]

// 表单ref
const ruleFormRef = ref()

// 表单数组
const ruleFormRefArr = ref([
    {
        fileForm: {
            name: '',
            fileFormat: '',
            serviceUrl: '',
            fileUrl: '',
        },
        rules: {
            name: [
                { required: true, message: '请输出文件名称', trigger: 'blur' },
            ],
            fileFormat: [
                { required: true, message: '请选择文件格式', trigger: 'change' },
            ],
            serviceUrl: [
                { required: true, message: '请选择服务地址', trigger: 'change' },
            ],
            fileUrl: [
                { required: true, message: '请选择文件路径', trigger: 'blur' },
            ],
        }
    }
])

// 路径选择
const handleFocus = async (index) => {
    ruleFormRefArr.value[index].fileForm.fileUrl = await myApi.handleUpdate()
}

// 更新文件
const onSubmit = async (formEl, index) => {

    if (!formEl[index]) return

    const fileForm = ruleFormRefArr.value[index].fileForm

    await formEl[index].validate(async (valid) => {

        if (valid) {

            const filePath = `${fileForm.fileUrl}/${fileForm.name}${fileForm.fileFormat}`
            try {
                const oldValue = await myApi.readFile(filePath)
                writeFile(filePath, oldValue, index)
            } catch (err) {
                fileDialog(err, index)
            }

        }
    })
}

// 将内容写入文件
const writeFile = (filePath, oldValue, index) => {
    const fileForm = ruleFormRefArr.value[index].fileForm
    if (fileForm.serviceUrl === 1) {
        myApi.updateFile(filePath, newObj).then(res => {
            myApi.dialogMessage({ oldValue, newValue: newObj }, filePath)
        })
    } else {
        axios.get(fileForm.serviceUrl).then(res => {
            let newValue = JSON.stringify(res.data)
            myApi.updateFile(filePath, newValue).then(res => {

                myApi.dialogMessage({ oldValue, newValue }, filePath)

                // const file2Content =fs.readFileSync(filePath, 'utf-8');

            })
        })
    }

}

// 新建文件并 写入内容
const fileDialog = (err, index) => {
    const fileForm = ruleFormRefArr.value[index].fileForm
    const content = `当前选择目录中没有${fileForm.name}文件，需要新建${fileForm.name}${fileForm.fileFormat}文件么？`
    const title = '更新提示'
    const btn = {
        confirmButtonText: '新建',
        cancelButtonText: '取消',
        type: 'warning',
    }
    if (err === '当前目录中没有该文件') {
        ElMessageBox.confirm(content, title, btn).then(() => {
            const filePath = `${fileForm.fileUrl}/${fileForm.name}${fileForm.fileFormat}`
            writeFile(filePath, '', index)
        }).catch(() => {
            return
        })
    } else {
        return ElMessage.error(err)
    }

}

// 删除表单
const handleDelete = (index) => {
    ruleFormRefArr.value.splice(index, 1)
}

// 新增
const handleAdd = () => {
    ruleFormRefArr.value.push({
        ...ruleFormRefArr.value[0],
        fileForm: {
            name: '',
            fileFormat: '',
            serviceUrl: '',
            fileUrl: '',
        },
    })
}
</script>

<template>
    <div class="main_body">
        <div class="add_box">
            <el-button type="primary" :icon="CirclePlus" @click="handleAdd">新增</el-button>
        </div>
        <div class="update_box">
            <el-form v-for="(item, index) in ruleFormRefArr" :model="item.fileForm" ref="ruleFormRef" :rules="item.rules"
                label-position="top">
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="文件名：" prop="name">
                            <el-input class="input_width" v-model="item.fileForm.name" placeholder="请输出文件名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="文件格式：" prop="fileFormat">
                            <el-select v-model="item.fileForm.fileFormat" placeholder="请选择文件格式">
                                <el-option :label="item.label" :value="item.value" v-for="item in fileFormat"
                                    :key="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="服务地址：" prop="serviceUrl">
                            <el-select v-model="item.fileForm.serviceUrl" placeholder="请选择服务地址">
                                <el-option :label="item.label" :value="item.value" v-for="item in serviceUrl"
                                    :key="item.value" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="文件路径：" prop="fileUrl">
                            <el-input class="input_width" v-model="item.fileForm.fileUrl" @click="handleFocus(index)"
                                placeholder="请选择文件路径" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="display: flex;align-items: end;justify-content: end;">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit(ruleFormRef, index)">更新</el-button>
                            <el-button type="danger" @click="handleDelete(index)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>

    <!-- <div @click="handleRead">读取文件</div> -->
</template>

<style lang="less" scoped>
.main_body {
    width: 100%;
    height: 100%;
    padding: 40px;

    .add_box {
        width: 100%;
        height: 70px;
        background: rgb(192, 191, 191);
        border-radius: 10px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        padding: 0 20px;
    }

    .update_box {
        width: 100%;
        height: calc(100% - 60px);
        background: rgb(221, 220, 220);
        padding: 20px;
        border-radius: 10px;
        overflow: hidden;
        overflow-y: auto;

        .input_width {
            width: 214px;
        }
    }
}
</style>