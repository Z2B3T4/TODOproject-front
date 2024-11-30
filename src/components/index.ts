import TextButton from "@/components/TextButton/index.vue";
import ImgButton from "@/components/ImgButton/index.vue";

export const componentPlugin = {
  install(app) {
    app.component("TextButton", TextButton);
    app.component("ImgButton", ImgButton);
  },
};
