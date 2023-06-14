<script setup>
import { ref } from 'vue';


let pathUrl = ref('')
let fileContent = ref('')

const handleFocus = async () => {
  pathUrl.value = await myApi.handleUpdate()
}

const handleRead = async () => {
  if (!pathUrl.value) return myApi.dialogFn({ title: '错误信息', content: '请选择读取文件路径' })

  fileContent.value = await myApi.readFile(pathUrl.value)

}

const handleBtn = async () => {
  if (!pathUrl.value) return myApi.dialogFn({ title: '错误信息', content: '请选择读取文件路径' })

  let obj = `{ 
    "id": "123456789", 
    "name": "无敌奥特曼", 
    "age": "1888" ,

    "a":"a"
}`

  const res = myApi.updateFile(pathUrl.value, obj)

  console.log('res', res);
}

const handleCompare = () => {
  myApi.Compare()
}

</script>

<template>
  <span>文件路径：</span>
  <input type="text" v-model="pathUrl" @click="handleFocus">
  <div @click="handleBtn">更新文件</div>
  <div @click="handleRead">读取文件</div>
  <div @click="handleCompare">内容对比</div>
  <div v-if="fileContent">
    <span>文件内容:</span>
    <div>{{ fileContent }}</div>
  </div>
</template>

<style lang="css" scoped></style>