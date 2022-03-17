import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import LandingTopBar from "./components/LandingTopBar.vue";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.component("LandingTopBar", LandingTopBar);
app.use(router);
app.use(store);
app.use(ElementPlus)
app.mount("#app");
