<template>
  <div class="todo-search">
    <el-form :model="searchCriteria" class="search-form" label-width="120px">
      <!-- 按时间范围 -->
      <el-form-item label="时间范围">
        <el-radio-group v-model="searchCriteria.timeRange">
          <el-radio label="today">今天内</el-radio>
          <el-radio label="week">7天内</el-radio>
          <el-radio label="month">一个月内</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 按名称查询 -->
      <el-form-item label="名称查询">
        <el-input
          v-model="searchCriteria.name"
          placeholder="输入任务名称"
          clearable
        />
      </el-form-item>

      <!-- 起始时间 -->
      <el-form-item label="起始时间">
        <el-date-picker
          v-model="searchCriteria.startDate"
          type="date"
          placeholder="选择起始时间"
          clearable
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <!-- 终止时间 -->
      <el-form-item label="终止时间">
        <el-date-picker
          v-model="searchCriteria.endDate"
          type="date"
          placeholder="选择终止时间"
          clearable
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <!-- 是否重要 -->
      <el-form-item label="重要性">
        <el-checkbox v-model="searchCriteria.isImportant">
          是否为重要
        </el-checkbox>
      </el-form-item>

      <!-- 按分组查询 -->
      <el-form-item label="分组查询">
        <el-select
          v-model="searchCriteria.groupId"
          placeholder="选择分组"
          clearable
        >
          <el-option
            v-for="group in groupStore.groupList"
            :key="group.id"
            :label="group.name"
            :value="group.id"
          />
        </el-select>
      </el-form-item>

      <!-- 按分类查询 -->
      <el-form-item label="分类查询">
        <el-select
          v-model="searchCriteria.categoryId"
          placeholder="选择分类"
          clearable
        >
          <el-option
            v-for="category in categoryStore.categoryList"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
      </el-form-item>

      <!-- 查询按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="default" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useGroupStore } from "@/stores/groupStore";
import { useCategoryStore } from "@/stores/categoryStore";
const taskStore = useTaskStore();
const groupStore = useGroupStore();
const categoryStore = useCategoryStore();

// #region 进行查询
// 查询条件
const searchCriteria = ref({
  timeRange: "",
  name: "",
  startDate: "",
  endDate: "",
  isImportant: false,
  groupId: "",
  categoryId: "",
  page: 1,
  pageSize: 5,
  flag: 0,
});
// 查询操作
const handleSearch = async () => {
  taskStore.searchTask(searchCriteria.value);
  // console.log("查询条件：", searchCriteria.value.groupId);
  // console.log("查询条件：", searchCriteria.value.categoryId);
};
// #endregion

// 重置操作
const resetSearch = () => {
  searchCriteria.value = {
    timeRange: "",
    name: "",
    startDate: "",
    endDate: "",
    isImportant: false,
    groupId: "",
    categoryId: "",
    page: 1,
    pageSize: 5,
  };
};
</script>

<style lang="scss" scoped>
.todo-search {
  height: 10%;
  width: 100%;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  .search-form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;

    .el-form-item {
      margin-bottom: 0;
      min-width: 300px;
    }
  }
}
</style>
