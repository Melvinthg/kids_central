import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { LandingTopBar } from  "./components/LandingTopBar.vue";


const app = createApp(App);
app.component('LandingTopBar', LandingTopBar)
app.use(router)
app.mount("#app");
