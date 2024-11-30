<template>
  <div class="imgButton">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.imgButton {
  width: 50px;
  height: 50px;
  margin: 10px;
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平方向居中 */
  align-items: center; /* 垂直方向居中 */
  overflow: hidden; /* 确保内容不溢出 */
  border: 1px solid rgb(123, 126, 126);
  border-radius: 50%;
}

.imgButton > * {
  /* 作用于插槽内的所有直接子元素 */
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片按比例填充，同时不会变形 */
  display: flex; /* 确保图标或其他内容也能撑满 */
  justify-content: center; /* 对图标进行居中处理 */
  align-items: center;
}

.imgButton:hover {
  cursor: pointer;
  filter: brightness(0.8);
}
</style>
