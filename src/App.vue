<script setup>
import { ref } from 'vue'
import codediff from '../src/components/code-diff/index.vue'

let oldStr = ref('')
let newStr = ref('')
let fotmat = ref(false)
let context = ref(10)
let diffStyle = ref('word')
let fileName = ref('')
let isShowNoChange = ref(true)
let drawFileList = ref(true)
let renderNothingWhenEmpty = ref(false)


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
    "a":"a"
}`

  myApi.updateFile(pathUrl.value, obj).then(res => {
    oldStr.value = oldValue
    newStr.value = obj
  })

}

const handleCompare = () => {
  myApi.Compare()
}

const handleClick = () => {
  oldStr.value = `{
      "id": "123456789",
      "name": "无敌奥特曼",
      "age": "1888" ,
      "a":"a"
    }
    `
}
const handleClick1 = () => {
  newStr.value = `{
      "name": "123"
    }
    `
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
  <button type="primary" @click="handleClick">123</button>
  <button type="primary" @click="handleClick1">123</button>
  <codediff :old-string="oldStr" :new-string="newStr" :context="context" :output-format="outputFormat" :draw-file-list="drawFileList" :render-nothing-when-empty="renderNothingWhenEmpty" :diff-style="diffStyle" :file-name="fileName" :is-show-no-change="isShowNoChange" />
</template>

<style lang="css" scoped>
</style>