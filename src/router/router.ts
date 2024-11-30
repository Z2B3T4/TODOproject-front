import { createRouter, createWebHistory } from "vue-router";
import Logout from "@/views/Logout/index.vue";
import TODO from "@/views/TODO/index.vue";
import Work from "@/views/Work/index.vue";
import User from "@/views/User/index.vue";
import TODOList from "@/views/TODO/components/TODOList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Logout,
      children: [
        {
          path: "todo",
          component: TODO,
          children: [
            {
              path: "list/:typeId",
              component: TODOList,
            },
          ],
        },
        {
          path: "work",
          component: Work,
        },
        {
          path: "user",
          component: User,
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
