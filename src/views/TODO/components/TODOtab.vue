<template>
  <el-tabs type="border-card" class="demo-tabs" v-model="activeTab">
    <el-tab-pane name="0">
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
    <el-tab-pane name="1">
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
    <el-tab-pane name="2">
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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeTab = ref(route.path);

// 判断当前路由是否为选中状态
const isActive = (path) => route.path === path;
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
