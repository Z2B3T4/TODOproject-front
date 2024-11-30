<template>
  <div class="todo-item-list">
    <div class="context-index">{{ index + 1 }}</div>
    <div class="context">{{ item.context }}</div>
    <div class="choice">
      <div class="todo-item-list-about">详情</div>
      <div class="todo-item-list-update">修改</div>
      <div
        class="todo-item-list-lift"
        :class="{ disabled: isFirst }"
        @click="handleLift"
      >
        提升
      </div>
      <div class="todo-item-list-delete" @click="handleDelete">删除</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  item: Object, // 从父组件接收的任务数据
  index: Number, // 当前任务的索引
  isFirst: Boolean, // 是否为第一个任务
  id: Number,
});

const emit = defineEmits(["lift", "delete"]); // 声明可用事件

const handleLift = () => {
  emit("lift", props.id); // 通知父组件进行提升操作
};

const handleDelete = () => {
  emit("delete", props.id); // 通知父组件进行删除操作
};
</script>

<style lang="scss" scoped>
.todo-item-list {
  width: 95%;
  height: 75px;
  margin: 2% 2.5%;
  border: 1px solid yellowgreen;
  display: flex;
  &:hover {
    background-color: rgb(255, 225, 92);
    transition: 0.5s;
  }
  .context-index {
    width: 3%;
    background-color: green;
    font-size: large;
    color: lightblue;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1%;
  }
  .context {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    color: black;
    margin: 0 2%;
  }
  .choice {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > * {
      color: rgb(45, 184, 231);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5%;
      width: 25%;
      padding: 0 5%;
      cursor: pointer;
    }
  }
}
.disabled {
  color: darkgray !important;
  cursor: not-allowed !important;
}
</style>
