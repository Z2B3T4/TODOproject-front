import httpInstance from "@/util/http";

export const addCategoryAPI = (data: any) => {
  return httpInstance({
    url: "/todo/categorys",
    method: "POST",
    data,
  });
};
export const getCategoryListAPI = () => {
  return httpInstance({
    url: "/todo/categorys",
    method: "GET",
  });
};
export const deleteCategoryAPI = (id: any) => {
  return httpInstance({
    url: `/todo/categorys/${id}`,
    method: "DELETE",
  });
};
