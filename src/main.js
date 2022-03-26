import { createApp } from "vue";
//import { ref } from 'vue';
import store from "./store";
import App from "./App.vue";
import router from "./router";
import LandingTopBar from "./components/LandingTopBar.vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//import VueChartKick for the charts in Grades page
import VueChartKick from "vue-chartkick";
import 'chartkick/chart.js'

const app = createApp(App);
app.component("LandingTopBar", LandingTopBar);
app.use(router);
app.use(store);
app.use(ElementPlus)
app.use(VueChartKick)

app.mount("#app");

// Make BootstrapVue available throughout your project