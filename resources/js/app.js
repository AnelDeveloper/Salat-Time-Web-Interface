import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./services/router";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);


const pinia = createPinia();

app.config.globalProperties.$endpoints = {
    radnici: 'http://localhost:8000/api/radnici',
    odsustva: 'http://localhost:8000/api/odsustva',
    kalendar: 'http://localhost:8000/api/calendar'
};

app.use(router);
app.use(pinia);

app.component('VueDatePicker', VueDatePicker);

app.mount("#app");
