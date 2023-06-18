<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

let pathUrl = ref('')
let fileContent = ref('')

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
const fileFormat = [
  { label: 'text', value: '.text' },
  { label: 'json', value: '.json' },
]

const handleFocus = async () => {
  fileForm.fileUrl = await myApi.handleUpdate()
}

const handleRead = async () => {
  if (!pathUrl.value) return myApi.dialogFn({ title: '错误信息', content: '请选择读取文件路径' })

  fileContent.value = await myApi.readFile(pathUrl.value)

}

const ruleFormRef = ref()

const fileForm = reactive({
  name: '',
  fileFormat: '',
  serviceUrl: '',
  fileUrl: '',
})

const rules = reactive({
  name: [
    { required: true, message: '请输出文件名称', trigger: 'blur' },
  ],
  fileFormat: [
    { required: true, message: '请选择文件格式', trigger: 'change' },
  ],
  fileUrl: [
    { required: true, message: '请选择文件路径', trigger: 'blur' },
  ],
})


const onSubmit = async (formEl) => {

  if (!formEl) return

  await formEl.validate(async (valid, fields) => {

    if (valid) {

      const filePath = `${fileForm.fileUrl}/${fileForm.name}${fileForm.fileFormat}`
      try {
        const oldValue = await myApi.readFile(filePath)
        writeFile(filePath, oldValue)
      } catch (err) {
        fileDialog(err)
      }

    }
  })
}

const writeFile = (filePath, oldValue) => {
  myApi.updateFile(filePath, newObj).then(res => {
    myApi.dialogMessage({ oldValue, newValue: newObj }, filePath)
  })
}

const fileDialog = (err) => {
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
      writeFile(filePath, '')
    }).catch(() => {
      return
    })
  } else {
    return ElMessage.error(err)
  }

}

const handleReset = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<template>
  <el-form :model="fileForm" label-width="120px" ref="ruleFormRef" :rules="rules">
    <el-form-item label="文件名：" prop="name">
      <el-input v-model="fileForm.name" placeholder="请输出文件名称" />
    </el-form-item>
    <el-form-item label="文件格式：" prop="fileFormat">
      <el-select v-model="fileForm.fileFormat" placeholder="请选择文件格式">
        <el-option :label="item.label" :value="item.value" v-for="item in fileFormat" :key="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="服务地址：" prop="serviceUrl">
      <el-select v-model="fileForm.serviceUrl" placeholder="请选择服务地址">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="文件路径：" prop="fileUrl">
      <el-input v-model="fileForm.fileUrl" @click="handleFocus" placeholder="请选择文件路径" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">更新</el-button>
      <el-button @click="handleReset(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
  <!-- <div @click="handleRead">读取文件</div> -->
</template>

<style lang="css" scoped></style>