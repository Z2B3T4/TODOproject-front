import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getTaskListPageAPI,
  getSubTaskAPI,
  searchTaskAPI,
  updateTaskAPI,
} from "@/apis/task";
export const useTaskStore = defineStore("task", () => {
  const taskList = ref([]);
  const SubtaskList = ref([]);
  const totalTaskList = ref([]);
  // 分页查询
  const getTaskPageList = async (data: any) => {
    const { page, pageSize, flag } = data;
    console.log(data);
    const res = await getTaskListPageAPI({ page, pageSize, flag });
    taskList.value = res.data;
  };
  // 查询所有
  const getTotalTaskList = async (data: any) => {
    console.log(data);
    const res = await searchTaskAPI(data);
    totalTaskList.value = res.data;
  };
  // 根据一级分类id查询子任务id
  const getSubTask = async (id: number) => {
    const res = await getSubTaskAPI(id);
    SubtaskList.value = res.data;
  };
  // 根据各种条件查询任务
  const searchTask = async (data: any) => {
    const res = await searchTaskAPI(data);
    taskList.value = res.data;
  };
  const updateTask = async (data: any) => {
    await updateTaskAPI(data);
  };
  return {
    taskList,
    totalTaskList,
    SubtaskList,
    getTaskPageList,
    getTotalTaskList,
    getSubTask,
    searchTask,
    updateTask,
  };
});
