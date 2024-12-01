<template>
  <div class="todo-item-list">
    <div class="context-index">{{ index + 1 }}</div>
    <div class="context" :style="progressStyle">
      {{ item.name }}
      <div class="charging-effect" :style="chargingEffectStyle"></div>
    </div>
    <div class="choice">
      <div class="todo-item-list-about" @click="handleAbout">详情</div>
      <div class="todo-item-list-update" @click="handleUpdate">修改</div>
      <div
        class="todo-item-list-lift"
        :class="{ disabled: isFirst }"
        @click="handleLift"
      >
        提升
      </div>
      <div class="todo-item-list-delete" @click="handleDelete">删除</div>
      <div
        class="todo-item-list-finish"
        @click="handleFinish"
        v-if="flag === 0"
      >
        <div class="circle">
          <div class="checkmark"></div>
        </div>
      </div>
    </div>

    <!-- 任务详情弹窗 -->
    <div class="task-detail-dialog" v-show="aboutDialogVisible === true">
      <el-dialog
        v-model="aboutDialogVisible"
        title="任务详情"
        width="500px"
        draggable
      >
        <el-form :model="aboutItem" label-width="100px">
          <el-form-item label="任务名称">
            <el-input v-model="aboutItem.name" disabled />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="aboutItem.start_time"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              disabled
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="aboutItem.end_time"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              disabled
            />
          </el-form-item>
          <el-form-item label="是否重要">
            <el-switch v-model="aboutItem.is_important" disabled />
          </el-form-item>
          <el-form-item label="进度百分比">
            <el-slider v-model="aboutItem.progress_num" disabled />
          </el-form-item>
          <el-form-item label="分类 ID">
            <el-input v-model="aboutItem.category_id" disabled />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="aboutItem.created_at" disabled />
          </el-form-item>
          <el-form-item label="更新时间">
            <el-input v-model="aboutItem.updated_at" disabled />
          </el-form-item>
          <el-form-item label="是否完成">
            <el-switch v-model="aboutItem.is_completed" disabled />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="aboutDialogVisible = false">关闭</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <!-- 任务修改弹窗 -->
    <div class="task-edit-dialog" v-show="editDialogVisible === true">
      <el-dialog
        v-model="editDialogVisible"
        title="修改任务"
        width="500px"
        draggable
      >
        <el-form
          :model="editableItem"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="100px"
        >
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="editableItem.name" />
          </el-form-item>
          <el-form-item label="开始时间" prop="start_time">
            <el-date-picker
              v-model="editableItem.start_time"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="end_time">
            <el-date-picker
              v-model="editableItem.end_time"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="是否重要" prop="is_important">
            <el-switch v-model="editableItem.is_important" />
          </el-form-item>
          <el-form-item label="分组 ID" prop="group_id">
            <el-select v-model="editableItem.group_id" placeholder="请选择分类">
              <el-option
                v-for="item in groupStore.groupList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />"
            </el-select>
          </el-form-item>
          <el-form-item label="分类 ID" prop="category_id">
            <el-select
              v-model="editableItem.category_id"
              placeholder="请选择分类"
            >
              <el-option
                v-for="item in categoryStore.categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />"
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
//
import { defineProps, defineEmits, ref, computed } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useGroupStore } from "@/stores/groupStore";
import { ElMessage } from "element-plus";
import { finishTaskAPI, deleteTaskAPI } from "@/apis/task";
import confetti from "canvas-confetti";
const taskStore = useTaskStore();
const categoryStore = useCategoryStore();
const groupStore = useGroupStore();
const props = defineProps({
  item: Object, // 任务对象
  index: Number, // 任务索引
  isFirst: Boolean, // 是否第一个任务
  id: Number, // 任务 ID
  flag: Number,
});

const emit = defineEmits(["lift", "delete", "update"]); // 事件声明
// #region 查看详情
// 详情逻辑
const aboutItem = ref({});
const aboutDialogVisible = ref(false);

const handleAbout = () => {
  const foundItem =
    taskStore.taskList.find((item) => item.id === props.id) ||
    taskStore.SubtaskList.find((item) => item.id === props.id);
  if (foundItem) {
    aboutItem.value = { ...foundItem }; // 深拷贝
    aboutDialogVisible.value = true;
  }
};
// #endregion

// #region 修改逻辑
const editableItem = ref({});
const editDialogVisible = ref(false);
const editFormRef = ref(null);
const editFormRules = {
  name: [{ required: true, message: "任务名称不能为空", trigger: "blur" }],
  start_time: [
    {
      type: "date",
      message: "请选择开始时间",
      trigger: "change",
    },
  ],
  end_time: [
    {
      type: "date",
      message: "请选择结束时间",
      trigger: "change",
    },
  ],
};

// 修改任务
const handleUpdate = () => {
  const foundItem =
    taskStore.taskList.find((item) => item.id === props.id) ||
    taskStore.SubtaskList.find((item) => item.id === props.id);
  if (foundItem) {
    editableItem.value = { ...foundItem }; // 深拷贝
    editDialogVisible.value = true;
  }
};
// 执行提交
const handleSubmit = () => {
  editFormRef.value.validate((valid) => {
    if (valid) {
      // 转换为驼峰命名的对象
      const camelCaseItem = Object.keys(editableItem.value).reduce(
        (result, key) => {
          const camelCaseKey = key.replace(/_([a-z])/g, (_, char) =>
            char.toUpperCase()
          );
          result[camelCaseKey] = editableItem.value[key];
          return result;
        },
        {}
      );
      console.log(camelCaseItem); // 输出转化后的对象
      taskStore.updateTask(camelCaseItem);
      // todo 这里有问题，不知道为什么只能是刷新了才能显示
      taskStore.searchTask({
        page: 1,
        pageSize: 5,
        flag: props.flag,
      });
      console.log("执行了重新查看");
      ElMessage.success("修改成功");

      editDialogVisible.value = false;
    }
  });
};
// #endregion
// #region 提升任务
const handleLift = async () => {
  if (props.item.sort <= 0) {
    return ElMessage.error("任务已经在最上面了！");
  }
  props.item.sort = props.item.sort - 1;
  await taskStore.updateTask(props.item);
  taskStore.searchTask({
    page: 1,
    pageSize: 5,
    flag: props.flag,
  });
  ElMessage.success("任务提升成功！");
};
// #endregion
// #region 删除任务
const handleDelete = async () => {
  const deletedata = {
    id: props.item.id,
    type: props.item.type,
  };
  const res = await deleteTaskAPI(deletedata);
  if (res.code === 200) {
    taskStore.searchTask({
      page: 1,
      pageSize: 5,
      flag: props.flag,
    });
    ElMessage.success("任务提升成功！");
  } else {
    console.log(res);
    ElMessage.error("任务提升失败！");
  }
};
// #endregion

// #region 完成任务

const handleFinish = async () => {
  // 触发花瓣雨效果

  const finishdata = {
    id: props.item.id,
    type: props.item.type,
  };
  const res = await finishTaskAPI(finishdata);
  if (res.code === 200) {
    taskStore.searchTask({
      page: 1,
      pageSize: 5,
      flag: props.flag,
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 }, // 中心点
      colors: ["#ff9f43", "#f368e0", "#ff6b6b", "#48dbfb"], // 粒子颜色
    });
    setTimeout(() => {
      ElMessage.success("任务已完成！");
    }, 500);
  } else {
    console.log(res);
    ElMessage.error("任务完成失败！");
  }
};
// #endregion

// #region计算完成进度背景色
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
// #endregion
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
  background-color: #fff; /* 默认背景色 */

  &:hover {
    background-color: rgb(255, 225, 92); /* 悬停高亮 */
    transition: 0.5s;
  }

  /* 左侧索引样式 */
  .context-index {
    width: 10%; /* 增加索引区宽度 */
    background-color: green;
    font-size: large;
    color: lightblue;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1%;
  }

  /* 中间任务内容部分 */
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
      z-index: 2;
      pointer-events: none; /* 避免干扰交互 */
      transition: left 0.5s ease-in-out; /* 动态调整位置 */
    }
  }

  /* 右侧操作按钮部分 */
  .choice {
    width: 30%; /* 操作按钮宽度 */
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > * {
      color: rgb(45, 184, 231);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25%; /* 每个按钮的宽度 */

      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: rgb(80, 198, 238); /* 悬停效果 */
      }
    }
    .todo-item-list-finish {
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-right: 10px;

      .circle {
        position: relative;
        width: 100%;
        height: 100%;
        border: 2px solid #45c776;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        transition: all 0.3s ease-in-out;

        .checkmark {
          width: 12px;
          height: 24px;
          border: solid #45c776;
          border-width: 0 4px 4px 0;
          transform: rotate(45deg);
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }

  /* 禁用按钮样式 */
  .disabled {
    color: darkgray !important;
    cursor: not-allowed !important;
  }
}

/* 冲刺动画关键帧 */
@keyframes charging {
  0% {
    transform: translateX(5%);
  }
  100% {
    transform: translateX(-30%);
  }
}
</style>
