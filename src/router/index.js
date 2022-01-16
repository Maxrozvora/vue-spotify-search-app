import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Login from "@/views/Login";
import Search from "@/views/Search";
import Redirect from "@/views/Redirect";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/search",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/redirect",
    name: "redirect",
    component: Redirect,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    debugger;
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
