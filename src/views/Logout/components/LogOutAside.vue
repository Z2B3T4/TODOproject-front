<template>
  <div :class="['app-aside', isCollapse ? 'collapsed' : 'expanded']">
    <div class="shadow">
      <div class="aside-title" @click="changeShadow">
        <div class="icon">
          <el-icon><OfficeBuilding /></el-icon>
        </div>
        <div
          class="text"
          v-if="!isCollapse"
          :class="{ 'fade-in': !isCollapse }"
        >
          TODO管理系统
        </div>
      </div>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <RouterLink :to="`/work`">
        <el-menu-item index="1">
          <el-icon><Grid /></el-icon>
          <template #title>工作台</template>
        </el-menu-item>
      </RouterLink>
      <RouterLink :to="`/todo`">
        <el-menu-item index="2">
          <el-icon><Tickets /></el-icon>
          <template #title>TODO事项</template>
        </el-menu-item>
      </RouterLink>

      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <RouterLink :to="`/user`">
        <el-menu-item index="4">
          <el-icon><UserFilled /></el-icon>
          <template #title>个人中心</template>
        </el-menu-item>
      </RouterLink>
    </el-menu>
  </div>
</template>

<script setup lang="js">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

const isCollapse = ref(true); // 是否折叠
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const changeShadow = () => {
  isCollapse.value = !isCollapse.value; // 切换折叠状态
};
</script>

<style lang="scss">
.app-aside {
  transition: width 0.3s ease; /* 添加平滑过渡 */
  height: 1200px;
}

.app-aside.expanded {
  width: 200px; /* 展开时的宽度 */
}

.app-aside.collapsed {
  width: 63px; /* 折叠时的宽度 */
}

.aside-title {
  display: flex;
  height: 50px;
  cursor: pointer;
  background-color: gray;
  color: rgb(255, 226, 2);
  align-items: center; /* 使图标和文本垂直居中 */
}

.icon {
  transition: width 0.3s ease; /* 平滑过渡 */
  width: 75px; /* 展开时的宽度 */
  background-color: gray;
  text-align: center;
  line-height: 50px; /* 使图标垂直居中 */
}

.text {
  display: inline-block;
  margin-left: 10px;
  opacity: 0; /* 默认文本不可见 */
  transition: opacity 2s ease-in-out; /* 文本浮现的过渡效果 */
  font-weight: bold;
}

.text.fade-in {
  opacity: 1; /* 展开时文本逐渐浮现 */
}

.el-menu-vertical-demo {
  transition: all 0.3s ease; /* 使菜单过渡也变得平滑 */
  min-height: 1200px;
}

.el-menu-vertical-demo.el-menu--collapse {
  min-height: 1200px;
}
</style>
