<script setup>
</script>

<template>
  <div class="app_main">
    <Sidebar class="sidebar_box"></Sidebar>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
.app_main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .sidebar_box {
    width: 250px;
    height: 100%;

  }
}


/deep/.el-menu {
  height: 100%;
}
</style>