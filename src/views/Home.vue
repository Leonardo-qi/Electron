<script setup>
import { ref } from 'vue'

let pathUrl = ref('')
let fileContent = ref('')

const handleFocus = async () => {
  console.log('myapi', myApi)
  pathUrl.value = await myApi.handleUpdate()
}

const handleRead = async () => {
  if (!pathUrl.value) return myApi.dialogFn({ title: '错误信息', content: '请选择读取文件路径' })

  fileContent.value = await myApi.readFile(pathUrl.value)

}

const handleBtn = async () => {
  if (!pathUrl.value) return myApi.dialogFn({ title: '错误信息', content: '请选择读取文件路径' })

  const oldValue = await myApi.readFile(pathUrl.value)

  let obj = `{
    "id": "123456789",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "id": "123456789",
    "name": "无敌奥特曼",
    "age": "1888" ,
    "a":"a"
}`

  myApi.updateFile(pathUrl.value, obj).then(res => {
    myApi.dialogMessage({ oldValue, newValue: obj })
  })

}

</script>

<template>
  <span>文件路径：</span>
  <span style="cursor: pointer;" @click="handleFocus" v-if="pathUrl">{{ pathUrl }}</span>
  <span style="cursor: pointer;" @click="handleFocus" v-else>请选择文件路径</span>
  <div @click="handleBtn">更新文件</div>
  <div @click="handleRead">读取文件</div>
  <div v-if="fileContent">
    <span>文件内容:</span>
    <div>{{ fileContent }}</div>
  </div>
</template>

<style lang="css" scoped></style>