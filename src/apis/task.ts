import httpInstance from "@/util/http";

export const addTask = (data) => {
  return httpInstance({
    url: "/todo/tasks",
    method: "POST",
    data,
  });
};
