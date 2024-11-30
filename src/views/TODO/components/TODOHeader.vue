<template>
  <div class="todo-header">
    <!-- 主要选项 -->
    <div class="todo-header-choice">
      <TextButton text="新建任务" @click="handleCreateTask">
        <el-icon><Plus /></el-icon>
      </TextButton>
      <TextButton text="新建分组" @click="handleCreateGroup">
        <el-icon><Plus /></el-icon>
      </TextButton>
      <TextButton text="新建分类" @click="handleCreateCategory">
        <el-icon><Plus /></el-icon>
      </TextButton>
      <TextButton text="日程表">
        <el-icon><Calendar /></el-icon>
      </TextButton>
      <TextButton text="开始专注">
        <el-icon><Clock /></el-icon>
      </TextButton>
    </div>
    <!-- 搜索框 -->
    <div class="todo-header-input">
      <div class="todo-header-input-wrapper" :class="{ focused: isFocused }">
        <el-input
          v-model="inputText"
          maxlength="10"
          placeholder="请输入要查询的任务"
          show-word-limit
          type="text"
          @focus="changeInputWidth(true)"
          @blur="changeInputWidth(false)"
          :prefix-icon="Search"
        />
      </div>
    </div>
    <!-- 右侧消息提示组件 -->
    <div class="todo-header-user">
      <ImgButton>
        <el-icon><BellFilled /></el-icon>
      </ImgButton>
      <ImgButton>
        <el-icon><More /></el-icon>
      </ImgButton>
      <ImgButton>
        <el-icon><Setting /></el-icon>
      </ImgButton>
      <ImgButton>
        <el-icon><Avatar /></el-icon>
      </ImgButton>
    </div>
  </div>
  <!-- 新建任务弹窗 -->
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
            <el-option label="一级分类" :value="1" />
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
  <!-- 新建分组弹窗 -->
  <div class="add-group" v-show="groupDialogVisible === true">
    <el-dialog
      v-model="groupDialogVisible"
      title="新建分组"
      width="500px"
      draggable
    >
      <el-form
        :model="groupForm"
        :rules="groupRules"
        ref="groupFormRef"
        label-width="100px"
      >
        <!-- 分组名称 -->
        <el-form-item label="分组名称" prop="name">
          <el-input v-model="groupForm.name" placeholder="请输入分组名称" />
        </el-form-item>
        <!-- 分组描述 -->
        <el-form-item label="分组描述" prop="description">
          <el-input
            type="textarea"
            v-model="groupForm.description"
            placeholder="请输入分组描述"
          />
        </el-form-item>
        <!-- 分组优先级 -->
        <el-form-item label="优先级">
          <el-select v-model="groupForm.priority" placeholder="请选择优先级">
            <el-option label="高" :value="0" />
            <el-option label="中" :value="1" />
            <el-option label="低" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="groupDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleGroupSubmit">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>

  <!-- 新建分类弹窗 -->
  <div class="add-category" v-show="categoryDialogVisible === true">
    <el-dialog
      v-model="categoryDialogVisible"
      title="新建分类"
      width="500px"
      draggable
    >
      <el-form
        :model="categoryForm"
        :rules="categoryRules"
        ref="categoryFormRef"
        label-width="100px"
      >
        <!-- 分类名称 -->
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name" placeholder="请输入分类名称" />
        </el-form-item>
        <!-- 分类描述 -->
        <el-form-item label="分类描述" prop="description">
          <el-input
            type="textarea"
            v-model="categoryForm.description"
            placeholder="请输入分类描述"
          />
        </el-form-item>
        <!-- 分类颜色 -->
        <el-form-item label="分类颜色">
          <el-color-picker v-model="categoryForm.color" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="categoryDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleCategorySubmit"
            >确认</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// #region 引入组件
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { addTaskAPI } from "@/apis/task";
import { addGroupAPI } from "@/apis/group";
import { addCategoryAPI } from "@/apis/category";
import { useGroupStore } from "@/stores/groupStore";
import { useCategoryStore } from "@/stores/categoryStore";

// #endregion

// #region 搜索框相关
const inputText = ref("");
const isFocused = ref(false);
// 这个是头部搜索框的宽度控制
const changeInputWidth = (focused) => {
  isFocused.value = focused;
};
// #endregion

// #region 新增任务
// 这个控制弹窗的显示与隐藏
const dialogVisible = ref(false);
const taskFormRef = ref();
const taskForm = reactive({
  name: "",
  groupId: 0,
  category: 0,
  startTime: "",
  endTime: "",
  isImportant: false,
  type: 1,
});
// 自定义规则
const rules = {
  name: [{ required: true, message: "任务名称不能为空", trigger: "blur" }],
};
// 当点击添加任务按钮时，控制属性，显示弹窗
const handleCreateTask = () => {
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
      await addTaskAPI(taskForm).then((res) => {
        console.log("任务添加成功！", res);
        ElMessage({
          message: "Congrats, this is a success message.",
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
  });
};
// #endregion

// #region 新建分组逻辑
// 分组弹窗控制
const groupDialogVisible = ref(false);
// 分组表单引用和数据
const groupFormRef = ref();
const groupForm = reactive({
  name: "",
  description: "",
  priority: 0,
});
// 分组验证规则
const groupRules = {
  name: [{ required: true, message: "分组名称不能为空", trigger: "blur" }],
};
// 打开分组弹窗
const handleCreateGroup = () => {
  groupDialogVisible.value = true;
};
// 提交分组表单
const handleGroupSubmit = () => {
  groupFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log("新分组数据：", groupForm);
      await addGroupAPI(groupForm)
        .then((res) => {
          console.log("分组添加成功！");
          ElMessage.success("分组添加成功！");
        })
        .catch((err) => {
          ElMessage.error("分组添加失败！");
        });
      groupDialogVisible.value = false;
      resetGroupForm();
    } else {
      ElMessage.error("请填写必要的分组信息！");
    }
  });
};
// 重置分组表单
const resetGroupForm = () => {
  Object.assign(groupForm, {
    name: "",
    description: "",
    priority: "medium",
  });
};
// #endregion

// #region 新建分类逻辑
// 分类弹窗控制
const categoryDialogVisible = ref(false);
// 分类表单引用和数据
const categoryFormRef = ref();
const categoryForm = reactive({
  name: "",
  description: "",
  color: "#ffffff",
});
// 分类验证规则
const categoryRules = {
  name: [{ required: true, message: "分类名称不能为空", trigger: "blur" }],
};
// 打开分类弹窗
const handleCreateCategory = () => {
  categoryDialogVisible.value = true;
};
// 提交分类表单
const handleCategorySubmit = () => {
  categoryFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log("新分类数据：", categoryForm);
      await addCategoryAPI(categoryForm)
        .then((res) => {
          console.log("分类添加成功！", res);
          ElMessage.success("添加分类成功！");
        })
        .catch((err) => {
          ElMessage.error("添加分类失败！", err);
        });
      ElMessage.success("分类添加成功！");
      categoryDialogVisible.value = false;
      resetCategoryForm();
    } else {
      ElMessage.error("请填写必要的分类信息！");
    }
  });
};
// 重置分类表单
const resetCategoryForm = () => {
  Object.assign(categoryForm, {
    name: "",
    description: "",
    color: "#ffffff",
  });
};
// #endregion

// #region 获取分组列表
const groupStore = useGroupStore();
onMounted(() => {
  groupStore.getGroupList();
  // console.log("分类列表：", groupStore.groupList[0].name);
});
// #endregion

// #region 获取分类列表
const categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getCategoryList();
  console.log("分类列表：", categoryStore.categoryList[0]);
});
// #endregion
</script>

<style lang="scss" scoped>
.todo-header {
  width: 100%;
  height: 100px;
  align-items: center;
  padding: 10px;
  display: flex;

  .todo-header-choice {
    width: 60%;
    padding: 0 0 0 5%;
    margin-right: 5%;
    display: flex;
    justify-content: space-between;
  }
  .todo-header-input {
    width: 20%;
    .todo-header-input-wrapper {
      width: 60%;
      transition: width 0.3s ease;
      display: flex;
      align-items: center;
      margin: 0 20px 0 0;
      &.focused {
        width: 80%;
      }
    }
  }
  .todo-header-user {
    width: 16%;
    display: flex;
  }
}
.dialog-footer {
  text-align: right;
}
.el-message {
  z-index: 9999 !important;
}
</style>
