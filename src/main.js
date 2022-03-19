import { createApp } from "vue";
//import { ref } from 'vue';
import store from "./store";
import App from "./App.vue";
import router from "./router";
import LandingTopBar from "./components/LandingTopBar.vue";
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

=======
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Import Bootstrap an BootstrapVue CSS files (order is important)
>>>>>>> upstream/main

const app = createApp(App);
app.component("LandingTopBar", LandingTopBar);
app.use(router);
app.use(store);
<<<<<<< HEAD
app.use(ElementPlus)
=======
app.use(ElementPlus);
>>>>>>> upstream/main
app.mount("#app");

// Make BootstrapVue available throughout your project