import httpInstance from "@/util/http";

export const addGroup = (data: any) => {
  return httpInstance({
    url: "/todo/groups",
    method: "POST",
    data,
  });
};
