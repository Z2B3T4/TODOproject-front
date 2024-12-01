<template>
  <el-tabs type="border-card" class="demo-tabs" v-model="activeTab">
    <el-tab-pane name="0" @click="changeTab">
      <template #label>
        <RouterLink :to="{ path: '/todo/list/0' }">
          <span
            :class="[
              'custom-tabs-label',
              isActive('/todo/list/0') ? 'active' : '',
            ]"
          >
            <el-icon><calendar /></el-icon>
            <span>未完成</span>
          </span>
        </RouterLink>
      </template>
      <RouterView />
    </el-tab-pane>
    <el-tab-pane name="1" @click="changeTab">
      <template #label>
        <RouterLink :to="{ path: '/todo/list/1' }">
          <span
            :class="[
              'custom-tabs-label',
              isActive('/todo/list/1') ? 'active' : '',
            ]"
          >
            <el-icon><calendar /></el-icon>
            <span>已完成</span>
          </span>
        </RouterLink>
      </template>
      <RouterView />
    </el-tab-pane>
    <el-tab-pane name="2" @click="changeTab">
      <template #label>
        <RouterLink :to="{ path: '/todo/list/2' }">
          <span
            :class="[
              'custom-tabs-label',
              isActive('/todo/list/2') ? 'active' : '',
            ]"
          >
            <el-icon><calendar /></el-icon>
            <span>已删除</span>
          </span>
        </RouterLink>
      </template>
      <RouterView />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { Calendar } from "@element-plus/icons-vue";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/taskStore";

const route = useRoute();
const taskStore = useTaskStore();

const activeTab = ref(route.path);

// 判断当前路由是否为选中状态
const isActive = (path) => route.path === path;

// #region 监听路由变化，并实时获取数据
// 定义 flag
const flag = ref(null);
watch(
  () => route.path,
  (newPath) => {
    // 从路径中提取最后一个数字
    const match = newPath.match(/\/(\d+)$/);
    flag.value = match ? parseInt(match[1], 10) : null;

    // 获取数据
    taskStore.getTaskPageList({
      page: 1,
      pageSize: 5,
      flag: flag.value,
    });
  },
  { immediate: true } // 初始化时也调用一次
);
// #endregion
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label {
  display: flex;
  align-items: center;
  color: inherit;
  transition: color 0.5s;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.custom-tabs-label.active {
  color: rgb(80, 198, 238); /* 浅蓝色 */
}
.custom-tabs-label:hover {
  color: rgb(80, 198, 238);
  transition: color 0.5s;
}
</style>
