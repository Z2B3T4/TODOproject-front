import { defineStore } from "pinia";
import { ref } from "vue";
import { getGroupListAPI, DelgroupAPI } from "@/apis/group";
export const useGroupStore = defineStore("group", () => {
  const groupList = ref([]);
  const getGroupList = async () => {
    const res = await getGroupListAPI();
    groupList.value = res.data;
  };

  const delGroup = async (id: number) => {
    await DelgroupAPI(id);
    getGroupList();
  };
  return {
    groupList,
    getGroupList,
    delGroup,
  };
});
