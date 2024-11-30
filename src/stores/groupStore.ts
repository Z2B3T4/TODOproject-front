import { defineStore } from "pinia";
import { ref } from "vue";
import { getGroupListAPI } from "@/apis/group";
export const useGroupStore = defineStore("group", () => {
  const groupList = ref([]);
  const getGroupList = async () => {
    const res = await getGroupListAPI();
    groupList.value = res.data;
  };
  return {
    groupList,
    getGroupList,
  };
});
