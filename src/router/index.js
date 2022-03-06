import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Signup from "@/pages/Signup.vue";
import Landing from "@/pages/Landing.vue";
const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
