<script setup>
import { onMounted, ref, } from 'vue'

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

onMounted(() => {
    diffArr.value = myDiff.getList()
})


</script>

<template>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <div v-for="(item, index) in visibleItems" class="infinite-list-item">
            <pre
                v-if="item.text"><span class="span_index span_no">{{ index + 1 }}</span><span class="span_index span_no">{{ index + 1 }}</span><span class="span_box"></span>{{ item.text }}</pre>
            <pre style="color: black;background: #ffebe9;"
                v-if="item.content1"><span class="span_index span_del">{{ index + 1 }}</span><span class="span_index span_del"></span><span class="span_box span_shou" @click="handleDiff(item)">-</span>{{ item.content1 }}</pre>
            <pre style="color: black;background: #e6ffec;"
                v-if="item.content2"><span class="span_index span_add"></span><span class="span_index span_add">{{ index + 1 }}</span><span class="span_box span_shou"  @click="handleDiff(item)">+</span>{{ item.content2 }}</pre>
        </div>
    </ul>

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