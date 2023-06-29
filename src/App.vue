<script setup>
</script>

<template>
  <div class="app_main">
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
html,
body {
  height: 100%;
}

.app_main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}


/deep/.el-menu {
  height: 100%;
}
</style>