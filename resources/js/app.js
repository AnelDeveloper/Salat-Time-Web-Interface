import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./services/router";
import piniaPluginPersist from 'pinia-plugin-persistedstate'; 
import '../css/tailwind.css';

const app = createApp(App);

const pinia = createPinia();

app.use(router);
app.use(pinia);
pinia.use(piniaPluginPersist);

app.mount("#app");
