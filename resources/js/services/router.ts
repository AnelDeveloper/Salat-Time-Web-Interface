import { createRouter, createWebHistory } from "vue-router";
import routesMain from "./routes/routesMain";
//import { useAuthentication } from "./store/authStore";

const routes = routesMain;

const router = createRouter({
    history: createWebHistory(),
    routes,
});



export default router;
