import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase.js";
import HomeTeacher from "@/pages/HomeTeacher.vue";
import HomeParent from "@/pages/HomeParent.vue";
import Home from "@/pages/HomeParent.vue";
import Login from "@/pages/Login.vue";
import SignupParent from "@/pages/SignupParent.vue";
import SignupTeacher from "@/pages/SignupTeacher.vue";
import Landing from "@/pages/Landing.vue";
import ContactParent from "@/pages/ContactParent.vue";
import ContactTeacher from "@/pages/ContactTeacher.vue"
import ForumDisplay from "@/pages/ForumDisplay.vue";
import ForumCreatePost from "@/pages/ForumCreatePost.vue";
import ChildrenInfo from '@/pages/ChildrenInfo.vue'

// import Dashboard from '@/pages/Dashboard.vue'

import EditClassDashboard from '@/pages/EditClassDashboard.vue'

import ForumReply from '@/pages/ForumReply.vue'
import CaregiverUploadReport from '@/pages/CaregiverUploadReport.vue'

import HealthAndInjuries from '@/pages/HealthAndInjuries.vue'
import CognitiveAbilities from '@/pages/CognitiveAbilities.vue'
import GradesDisplay from '@/pages/GradesDisplay.vue'




const routes = [
  {
    path: "/hometeacher",
    name: "HomeTeacher",
    component: HomeTeacher,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/homeparent",
    name: "HomeParent",
    component: HomeParent,
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
    path: "/contactparent",
    name: "ContactParent",
    component: ContactParent,
  },
  {
    path: "/contactteacher",
    name: "ContactTeacher",
    component: ContactTeacher,
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
    path: "/childreninfo",
    name: "ChildrenInfo",
    component: ChildrenInfo
  },
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     component: Dashboard
//   }


  {
    path: "/editclassdashboard",
    name: "EditClassDashboard",
    component: EditClassDashboard,
  },
  {
    path: "/forumreply",
    name: "ForumReply",
    component: ForumReply,
  },
  {
    path: "/caregiveruploadreport",
    name: "CaregiverUploadReport",
    component: CaregiverUploadReport,
  },
  {
    path: "/HealthAndInjuries",
    name: "HealthAndInjuries",
    component: HealthAndInjuries,
  },{
    path: "/gradesDisplay",
    name: "GradesDisplay",
    component: GradesDisplay,
  },
  {
    path: "/CognitiveAbilities",
    name: "CognitiveAbilities",
    component: CognitiveAbilities,
  },

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
router.forward()
export default router;
