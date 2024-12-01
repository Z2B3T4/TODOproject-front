<template>
  <div class="todo-item-list">
    <div class="context-index">{{ index + 1 }}</div>
    <div class="context" :style="progressStyle">
      {{ item.name }}
      <div class="charging-effect" :style="chargingEffectStyle"></div>
    </div>
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
import { defineProps, defineEmits, computed } from "vue";

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

// 动态计算背景样式
const progressStyle = computed(() => {
  const progress = props.item?.progress_num || 0; // 默认值为 0
  return {
    background: `linear-gradient(to right, rgba(173, 216, 230, 0.8), rgba(255, 183, 77, 0.8))`,
    backgroundSize: `${Math.min(progress, 100)}% 100%`,
    backgroundRepeat: "no-repeat",
    position: "relative",
    transition: "background-size 0.5s ease-in-out",
  };
});

// 动态计算冲刺效果位置
const chargingEffectStyle = computed(() => {
  const progress = props.item?.progress_num || 0; // 默认值为 0
  return {
    left: `${Math.min(progress, 100)}%`, // 根据 progress_num 调整位置
    animationDelay: `${-progress / 10}s`, // 动态延迟确保动画效果平滑
  };
});
</script>

<style lang="scss" scoped>
.todo-item-list {
  width: 95%;
  height: 75px;
  margin: 2% 2.5%;
  border: 1px solid yellowgreen;
  display: flex;
  overflow: hidden;
  position: relative;

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
    position: relative;
    overflow: hidden;

    /* 冲刺效果 */
    .charging-effect {
      position: absolute;
      top: 0;
      height: 100%;
      width: 5%;
      background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0.8),
        rgba(255, 183, 77, 0.3)
      );
      animation: charging 1.5s infinite linear;
      z-index: -2;
      pointer-events: none; /* 避免干扰交互 */
      transition: left 0.5s ease-in-out; /* 动态调整位置 */
    }
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
