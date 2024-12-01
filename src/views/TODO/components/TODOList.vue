<template>
  <div class="todo-list">
    <TODOsearch />
    <div class="list-about">
      <div class="first-list">
        <div class="first-list-title">任务列表</div>
        <ListItem
          v-for="(item, index) in taskStore.taskList"
          :key="item.id"
          :item="item"
          :index="index"
          :isFirst="index === 0"
          :id="item.id"
          :flag="parseInt(route.params.typeId, 10)"
          @lift="handleLift"
          @delete="handleDelete"
          @click="selectSubTask(item)"
        />
        <div class="first-list-pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="30"
            :current-page="currentPage"
            :page-size="pageSize"
            @current-change="handlePageChange"
          />
        </div>
      </div>
      <div class="second-list">
        <div class="second-list-title">{{ fatherName }}子任务</div>
        <ListItem
          v-for="(item, index) in taskStore.SubtaskList"
          :key="item.id"
          :item="item"
          :index="index"
          :isFirst="index === 0"
          :id="item.id"
          :flag="parseInt(route.params.typeId, 10)"
          @lift="handleLift"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// #region 引入相关组件
import { onMounted, reactive } from "vue";
import ListItem from "@/views/TODO/components/ListItem.vue";
import { ref } from "vue";
import TODOsearch from "@/views/TODO/components/TODOsearch.vue";
import { useTaskStore } from "@/stores/taskStore";
import { useRoute } from "vue-router";
// #endregion
const route = useRoute();
let flag = parseInt(route.params.typeId, 10); // 转换为整数
// #region 初始化渲染任务列表
const taskStore = useTaskStore();
const Initdata = {
  page: 1,
  pageSize: 5,
  flag: flag,
};
onMounted(() => {
  taskStore.searchTask(Initdata);
});
// #endregion

// #region 获取全部数据，计算总共的条数
const totalTaskCount = ref(50);

const totaldata = {
  type: 1,
  flag: flag,
};
onMounted(() => {
  taskStore.getTotalTaskList(totaldata);
});
totalTaskCount.value = taskStore.totalTaskList.length;
// #endregion

// #region 获取子任务数据
const fatherName = ref("");
const selectSubTask = (item) => {
  console.log("传过来的id", item.id);
  fatherName.value = item.name;
  taskStore.getSubTask(item.id);

  console.log(taskStore.SubtaskList[0]);
};
// #endregion

// #region分页查询
const currentPage = ref(1); // 默认当前页
const pageSize = ref(5); // 默认每页条数
const handlePageChange = (page) => {
  let flag = parseInt(route.params.typeId, 10); // 转换为整数
  currentPage.value = page; // 更新当前页
  console.log("当前页码:", page);
  // 在这里可以发送请求或其他逻辑
  const data = {
    page: page,
    pageSize: pageSize.value,
    flag: flag,
  };
  taskStore.searchTask(data);
};
// #endregion

// 执行提升逻辑
const handleLift = (id) => {
  console.log("父组件提升操作，索引：", id);
  // 实现提升逻辑，比如交换任务顺序
  // if (index > 0) {
  //   console.log(todos.value);
  //   const temp = todos.value[index];
  //   todos.value.splice(index, 1);
  //   todos.value.splice(index - 1, 0, temp);
  //   console.log(todos.value);
  // }
};

const handleDelete = (index) => {
  console.log("父组件删除操作，索引：", index);
  todos.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.todo-list {
  height: 1080px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .list-about {
    width: 100%;
    height: 90%;
    display: flex;

    .first-list {
      width: 60%;
      height: 100%;
      border: 2px solid blue;
      .first-list-title {
        text-align: center;
        align-content: center;
        height: 10%;
        width: 100%;
        font-size: large;
      }
      .first-list-pagination {
        margin-left: 20%;
        height: 10%;
        width: 95%;
        display: flex;
      }
    }
    .second-list {
      width: 40%;
      height: 100%;
      border: 2px solid green;
      .second-list-title {
        text-align: center;
        align-content: center;
        height: 10%;
        width: 100%;
        font-size: large;
      }
    }
  }
}
</style>
