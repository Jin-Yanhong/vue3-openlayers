import NProgress from "nprogress";
import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";

import HomeView from "../views/HomeView.vue";

import "nprogress/nprogress.css";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: {
      title: "主页",
    },
  },
  {
    path: "/about",
    name: "AboutView",
    component: () => import("@/views/AboutView.vue"),
    meta: {
      title: "关于",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "redirect",
    redirect: "/",
    meta: {
      show: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  linkActiveClass: "activeLink",
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done();
  document.title = "vue3-openlayers" + " | " + to.meta?.title;
});
export default router;
