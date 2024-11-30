import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router/router";
import "@/style/common.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { componentPlugin } from "@/components/index";
// 只有这个引入消息提示框才可以显示
import "element-plus/dist/index.css";
const app = createApp(App);
app.use(router);
app.use(createPinia());
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(componentPlugin);
app.mount("#app");
