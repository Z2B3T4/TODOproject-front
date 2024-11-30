import httpInstance from "@/util/http";

export const addCategory = (data: any) => {
  return httpInstance({
    url: "/todo/categorys",
    method: "POST",
    data,
  });
};
