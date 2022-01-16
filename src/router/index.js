import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/search",
  },
  {
    path: "/login",
    name: "login",
  },
  {
    path: "/search",
    name: "search",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
