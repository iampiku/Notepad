import { createApp } from "vue";
import { Pinia, createPinia } from "pinia";

import App from "@/App.vue";
import "@/style.css";

import router from "@/router";

const pinia: Pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
