import httpInstance from "@/util/http";
import { Flag } from "@element-plus/icons-vue";

export const addTaskAPI = (data: any) => {
  return httpInstance({
    url: "/todo/tasks",
    method: "POST",
    data,
  });
};
export const getTaskListPageAPI = ({ page, pageSize, flag }: any) => {
  console.log(page, pageSize);
  return httpInstance({
    url: "/todo/tasks/page",
    method: "GET",
    params: {
      page: page,
      pageSize: pageSize,
      flag: flag,
    },
  });
};

export const getTaskListAPI = (data: any) => {
  console.log("apidata:", data);
  return httpInstance({
    url: "/todo/tasks",
    params: {
      type: data.type,
      flag: data.flag,
    },
  });
};

export const getSubTaskAPI = (id: number) => {
  return httpInstance({
    url: `/todo/tasks/subtasks/${id}`,
  });
};
