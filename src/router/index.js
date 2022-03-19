import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase.js";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import SignupParent from "@/pages/SignupParent.vue";
import SignupTeacher from "@/pages/SignupTeacher.vue";
import Landing from "@/pages/Landing.vue";
import ForumDisplay from "@/pages/ForumDisplay.vue";
import ForumCreatePost from "@/pages/ForumCreatePost.vue";
import ChildrenInfo from '@/pages/ChildrenInfo.vue'

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
    path: "/signupparent",
    name: "SignupParent",
    component: SignupParent,
  },
  {
    path: "/signupteacher",
    name: "SignupTeacher",
    component: SignupTeacher,
  },
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/forumdisplay",
    name: "ForumDisplay",
    component: ForumDisplay,
  },
  {
    path: "/forumcreatepost",
    name: "ForumCreatePost",
    component: ForumCreatePost,
  },
  {
    path: "/ChildrenInfo",
    name: "ChildrenInfo",
    component: ChildrenInfo
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" && auth.currentUser) {
    next("/home")
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next("/login")
    return;
  }
  next()
})
export default router;
