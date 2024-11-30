import httpInstance from "@/util/http";

export const addTaskAPI = (data: any) => {
  return httpInstance({
    url: "/todo/tasks",
    method: "POST",
    data,
  });
};
