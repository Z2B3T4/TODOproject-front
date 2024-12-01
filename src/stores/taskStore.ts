import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getTaskListPageAPI,
  getTaskListAPI,
  getSubTaskAPI,
  searchTaskAPI,
} from "@/apis/task";
export const useTaskStore = defineStore("task", () => {
  const taskList = ref([]);
  const SubtaskList = ref([]);
  const totalTaskList = ref([]);
  const getTaskPageList = async (data: any) => {
    const { page, pageSize, flag } = data;
    console.log(data);
    const res = await getTaskListPageAPI({ page, pageSize, flag });
    taskList.value = res.data;
  };

  const getTotalTaskList = async (data: any) => {
    console.log(data);
    const res = await getTaskListAPI(data);
    totalTaskList.value = res.data;
  };
  const getSubTask = async (id: number) => {
    const res = await getSubTaskAPI(id);
    SubtaskList.value = res.data;
  };

  const searchTask = async (data: any) => {
    const res = await searchTaskAPI(data);
    taskList.value = res.data;
  };
  return {
    taskList,
    totalTaskList,
    SubtaskList,
    getTaskPageList,
    getTotalTaskList,
    getSubTask,
    searchTask,
  };
});
