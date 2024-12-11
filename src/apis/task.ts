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

export const getSubTaskAPI = (id: number) => {
  return httpInstance({
    url: `/todo/tasks/subtasks/${id}`,
  });
};

export const searchTaskAPI = (data: any) => {
  return httpInstance({
    url: "/todo/tasks/search",
    method: "POST",
    data,
  });
};

export const updateTaskAPI = (data: any) => {
  return httpInstance({
    url: "/todo/tasks",
    method: "PUT",
    data,
  });
};

export const finishTaskAPI = (data: any) => {
  return httpInstance({
    url: "/todo/tasks/finish",
    method: "PUT",
    data,
  });
};

export const deleteTaskAPI = ({ id, type }: any) => {
  return httpInstance({
    url: "/todo/tasks",
    method: "DELETE",
    params: {
      id,
      type,
    },
  });
};
