<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'



const router = useRouter()

const activeIndex = ref('1')
const handleSelect = (key) => {
    const path = key == 1 ? '/fileUpdatePage/index' : '/localFilePage/index'
    router.push(path)
}
</script>

<template>
    <div class="layout">
        <div class="layout-menu">
            <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">远程文件更新</el-menu-item>
                <el-menu-item index="2">本地文件更新</el-menu-item>
            </el-menu>
        </div>
        <div class="layout-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="less" scoped>
.layout {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: auto;

    ::-webkit-scrollbar {
        display: none;
    }

    .layout-menu {
        height: 50px;
    }

    .layout-content {
        min-height: 200px;
        overflow: auto;

        ::-webkit-scrollbar {
            display: none;
        }

        max-height: 100vh;
        padding: 20px;
    }
}</style>