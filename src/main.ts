import { createApp } from "vue";
import { Pinia, createPinia } from "pinia";

import App from "@/App.vue";
import "@/style.css";

const pinia: Pinia = createPinia();

createApp(App).use(pinia).mount("#app");
