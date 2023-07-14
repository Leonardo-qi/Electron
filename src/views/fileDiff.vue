<script setup>
import { onMounted, ref } from 'vue'

const isDiff = ref(false)

// 差异弹窗
const dialogVisible = ref(false)

// 差异弹窗数据
let dialogContent = ref({})

// 文件对比差异数组
const diffArr = ref([])

// 无限滚动数组
const visibleItems = ref([])
// 无限滚动数量
let i = ref(0)

// 触底方法
const load = () => {
    visibleItems.value.push(...diffArr.value.slice(i.value * 10, (i.value + 1) * 10));
    i.value += 1
}

// 差异对比按钮
const handleDiff = (item) => {
    dialogContent.value = item
    dialogVisible.value = true
}

// 记录当前切换仅差异时的数据有多少
let difflength = ref()

// 仅显示差异
const handleCheck = (e) => {
    const isDiff = e ? false : true

    if (visibleItems.value.length !== 0) difflength.value = visibleItems.value.length
    // 获取展示数据
    myDiff.getdiffList(isDiff)
    // 重置滚动i
    i.value = difflength.value / 10
    // 清空
    visibleItems.value.length = 0
    diffArr.value = myDiff.getList()
    if (diffArr.value.length !== 0) visibleItems.value.push(...diffArr.value.slice(0, difflength.value));
}

onMounted(() => {
    diffArr.value = myDiff.getList()
})


</script>

<template>
    <div class="main_body">
        <div style="width: 80%;">
            <el-checkbox v-model="isDiff" label="仅显示差异" size="large" @change="handleCheck" />
        </div>

        <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
            <div v-for="item in visibleItems" class="infinite-list-item">
                <pre
                    v-if="item.text"><span class="span_index span_no">{{ item.line }}</span><span class="span_index span_no">{{ item.line }}</span><span class="span_box"></span>{{ item.text }}</pre>
                <pre style="color: black;background: #ffebe9;"
                    v-if="item.content1"><span class="span_index span_del">{{ item.line }}</span><span class="span_index span_del"></span><span class="span_box span_shou" @click="handleDiff(item)">-</span>{{ item.content1 }}</pre>
                <pre style="color: black;background: #e6ffec;"
                    v-if="item.content2"><span class="span_index span_add"></span><span class="span_index span_add">{{ item.line }}</span><span class="span_box span_shou"  @click="handleDiff(item)">+</span>{{ item.content2 }}</pre>
            </div>
            <div v-if="visibleItems.length === 0">当前文件暂无修改或新增文件</div>
        </ul>
    </div>

    <el-dialog v-model="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
        :title="`第${dialogContent.line}行差异`" width="50%" :before-close="handleDiff">
        <div>
            <span>删除文件内容：</span>
            <pre class="diff_pre diff_del">{{ dialogContent.content1 || '无删除' }}</pre>
        </div>
        <div>
            <span>新增文件内容：</span>
            <pre class="diff_pre diff_add">{{ dialogContent.content2 || '无新增' }}</pre>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
.main_body {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.diff_pre {
    height: 30px;
    line-height: 30px;
    margin: 10px 0;
    padding: 0;
}

.diff_add {
    color: black;
    background: #e6ffec;
}

.diff_del {
    color: black;
    background: #ffebe9;
}

pre {
    height: 30px;
    line-height: 30px;
    color: #fff;
    background: rgba(12, 10, 10, .8);
    display: flex;
    align-items: center;

    .span_index {
        display: inline-block;
        text-align: center;
        width: 40px;
        height: 30px;
        color: #1f2328;
    }

    .span_no {
        color: #6e7781;
    }

    .span_del {
        background: #ffd7d5;
    }

    .span_add {
        background: #ccffd8;
    }

    .span_box {
        display: inline-block;
        box-sizing: border-box;
        width: 20px;
        margin-right: 50px;
    }

    .span_shou {
        text-align: center;
        cursor: pointer;
    }
}

.infinite-list {
    height: 90vh;
    width: 80%;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    flex-direction: column;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>