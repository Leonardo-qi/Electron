<script setup>
import { onMounted, ref } from 'vue'

let oldStr = ref('')
let newStr = ref('')


onMounted(() => {
    const { oldValue, newValue } = myDiff.getList()
    oldStr.value = oldValue
    newStr.value = newValue
    // console.log(oldValue, newValue);
})


</script>

<template>
    <div class="old_box str_box">
        <pre>{{ oldStr }}</pre>
    </div>
    <div class="new_box str_box">{{ newStr }}</div>
</template>

<style lang="css" scoped>
.str_box {
    padding: 20px;
}

.old_box {
    height: 100%;
    width: 50%;
}

.new_box {
    height: 100%;
    width: 50%;
}
</style>