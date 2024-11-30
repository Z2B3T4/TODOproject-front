import httpInstance from "@/util/http";

export const addGroupAPI = (data: any) => {
  return httpInstance({
    url: "/todo/groups",
    method: "POST",
    data,
  });
};

export const getGroupListAPI = () => {
  return httpInstance({
    url: "/todo/groups",
    method: "GET",
  });
};
