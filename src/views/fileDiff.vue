<script setup>
import { onMounted, ref } from 'vue'
import codediff from '../components/code-diff/index.vue'

let oldStr = ref('')
let newStr = ref('')
let context = ref(10)
let diffStyle = ref('word')
let fileName = ref('')
let isShowNoChange = ref(true)
let drawFileList = ref(true)
let renderNothingWhenEmpty = ref(false)


onMounted(() => {
    const {oldValue,newValue} = myDiff.getList()
    oldStr.value = oldValue
    newStr.value = newValue
})


</script>

<template>
    <codediff :old-string="oldStr" :new-string="newStr" :context="context" :output-format="outputFormat"
        :draw-file-list="drawFileList" :render-nothing-when-empty="renderNothingWhenEmpty" :diff-style="diffStyle"
        :file-name="fileName" :is-show-no-change="isShowNoChange" />
</template>

<style lang="css" scoped></style>