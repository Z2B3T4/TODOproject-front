<template>
  <div class="todo-list">
    <TODOsearch />
    <div class="list-about">
      <div class="first-list">
        <div class="first-list-title">任务列表</div>
        <ListItem
          v-for="(item, index) in todos"
          :key="index"
          :item="item"
          :index="index"
          :isFirst="index === 0"
          :id="item.id"
          @lift="handleLift"
          @delete="handleDelete"
        />
        <div class="first-list-pagination">
          <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
      </div>
      <div class="second-list">
        <div class="second-list-title">xxx的子任务</div>
        <ListItem
          v-for="(item, index) in todos"
          :key="index"
          :item="item"
          :index="index"
          :isFirst="index === 0"
          :id="item.id"
          @lift="handleLift"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ListItem from "@/views/TODO/components/ListItem.vue";
import { ref } from "vue";
import TODOsearch from "@/views/TODO/components/TODOsearch.vue";

// =======================================
// 作为列表渲染传入子组件

const todos = ref([
  { context: "xxx任务1", id: 1 },
  { context: "xxx任务2", id: 2 },
  { context: "xxx任务3", id: 3 },
  { context: "xxx任务3", id: 4 },
  { context: "xxx任务3", id: 5 },
]);
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
