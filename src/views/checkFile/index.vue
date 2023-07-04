<script setup>
import { onMounted, ref } from 'vue'

let fileStr = ref('')
let size = ref('')


onMounted(() => {
    fileStr.value = myCheckFile.getList().oldValue
    size.value = myCheckFile.getList().size
})


</script>

<template>
    <div class="str_box">
        <span>文件大小：{{ size.fileSizeInKilobytes }}</span>
        <pre class="pre_bg">{{ fileStr }}</pre>
    </div>
</template>

<style lang="less" scoped>
.str_box {
    padding: 20px;
    height: 100%;
    width: 80%;

    .pre_bg {
        margin-top: 20px;
        color: #fff;
        background: rgba(12, 10, 10, .8);
    }
}
</style>