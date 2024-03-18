import { createApp } from "vue/dist/vue.esm-bundler";
import App from "./App.vue";
import router from "./services/router";
import i18n from './services/i18n.ts'; 
import '../css/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(i18n); 
app.mount("#app");
