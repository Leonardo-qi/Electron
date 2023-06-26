
<script setup>
import { useRouter } from 'vue-router'



const router = useRouter()

const handleSelect = (e) => {
    const path = e == 1 ? '/fileUpdatePage/index' : '/ads'
    router.push(path)
}
</script>

<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="1"
                text-color="#fff" @select="handleSelect" @close="handleClose">
                <el-menu-item index="1">
                    <span>更新文件</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span>文件对比</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped></style>