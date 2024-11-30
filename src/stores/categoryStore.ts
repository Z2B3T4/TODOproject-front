import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategoryListAPI } from "@/apis/category";
export const useCategoryStore = defineStore("category", () => {
  const categoryList = ref([]);
  const getCategoryList = async () => {
    const res = await getCategoryListAPI();
    categoryList.value = res.data;
  };
  return {
    categoryList,
    getCategoryList,
  };
});
