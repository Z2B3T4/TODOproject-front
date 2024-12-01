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
        <div class="second-list-title">
          {{ fatherName }}子任务
          <div class="add-subtask" @click="addSubTask">新增子任务</div>
        </div>
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
  <!-- 新建二级任务弹窗 -->
  <div class="add-list" v-show="dialogVisible === true">
    <el-dialog v-model="dialogVisible" title="新增任务" width="500px" draggable>
      <el-form
        :model="taskForm"
        :rules="rules"
        ref="taskFormRef"
        label-width="100px"
      >
        <!-- 任务名称 -->
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="taskForm.name" placeholder="请输入任务名称" />
        </el-form-item>

        <!-- 分组 -->
        <el-form-item label="分组" prop="group">
          <el-select v-model="taskForm.groupId" placeholder="请选择分组">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in groupStore.groupList"
              :key="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- 分类 -->
        <el-form-item label="分类" prop="category">
          <el-select v-model="taskForm.category" placeholder="请选择分类">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in categoryStore.categoryList"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="级别标签">
          <el-select v-model="taskForm.type">
            <el-option label="二级分类" :value="2" />
          </el-select>
        </el-form-item>

        <!-- 起始时间 -->
        <el-form-item label="起始时间">
          <el-date-picker
            v-model="taskForm.startTime"
            type="date"
            placeholder="选择起始时间"
            clearable
            style="width: 100%"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <!-- 终止时间 -->
        <el-form-item label="终止时间">
          <el-date-picker
            v-model="taskForm.endTime"
            type="date"
            placeholder="选择终止时间"
            clearable
            style="width: 100%"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <!-- 是否重要 -->
        <el-form-item label="是否重要">
          <el-switch v-model="taskForm.isImportant" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </div>
      </template>
    </el-dialog>
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
import { addTaskAPI } from "@/apis/task";
import { useGroupStore } from "@/stores/groupStore";
import { useCategoryStore } from "@/stores/categoryStore";
const groupStore = useGroupStore();
const categoryStore = useCategoryStore();

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
const fatherId = ref(0);
const selectSubTask = (item) => {
  console.log("传过来的id", item.id);
  fatherName.value = item.name;
  fatherId.value = item.id;
  console.log("传过来的id", fatherId.value, item.id);
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

// #region 新增二级任务
// 这个控制弹窗的显示与隐藏
const dialogVisible = ref(false);
const taskFormRef = ref();
const taskForm = reactive({
  name: "",
  groupId: "",
  category: "",
  startTime: "",
  endTime: "",
  isImportant: false,
  type: "",
  taskId: fatherId,
});
// 自定义规则
const rules = {
  name: [{ required: true, message: "任务名称不能为空", trigger: "blur" }],
};
// 当点击添加任务按钮时，控制属性，显示弹窗
const addSubTask = () => {
  console.log(fatherId.value);

  dialogVisible.value = true;
};

/**
 * 提交任务表单的函数
 * 该函数没有参数
 * 没有返回值
 * 主要功能是验证任务表单的数据是否有效，如果有效则添加任务，否则提示用户填写必要的任务信息
 */
const handleSubmit = () => {
  // 调用表单验证方法，如果表单数据有效，则valid为true
  taskFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log("taskFormRef.value.fatherId", taskFormRef.value.taskId);
      await addTaskAPI(taskForm).then((res) => {
        console.log("任务添加成功！", res);
        ElMessage({
          message: "任务添加成功！",
          type: "success",
        });
      });
      // 关闭任务添加对话框
      dialogVisible.value = false;
      // 调用重置表单的函数
      resetForm();
    } else {
      // 如果表单数据无效，显示错误消息提示用户
      ElMessage.error("请填写必要的任务信息！");
    }
  });
};

const resetForm = () => {
  Object.assign(taskForm, {
    name: "",
    groupId: "",
    category: "",
    startTime: "",
    endTime: "",
    isImportant: false,
    taskId: "",
  });
};
// #endregion
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
        padding: 50px;
        text-align: center;
        justify-content: center;
        align-content: center;
        height: 10%;
        width: 80%;
        font-size: large;
        display: flex;
        .add-subtask {
          position: absolute;
          right: 10%;
          color: rgb(91, 207, 246);
        }
      }
    }
  }
}
</style>
