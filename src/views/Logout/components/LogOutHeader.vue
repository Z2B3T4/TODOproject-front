<template>
  <header class="app-header">
    <div class="title">
      <div class="icon">图片</div>
      <div class="text">TODO管理系统</div>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-header {
  background-color: orange;
  .title {
    width: 15%;
    height: 50px;
    display: flex;
    align-items: center;
    .icon {
      width: 30%;
    }
    .text {
      color: red;
      font-size: large;
    }
  }
}
</style>
