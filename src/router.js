import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";

// lazy load route
const Favorites = () => import("./views/Favorites");

Vue.use(VueRouter);

const routes = [
  { path: "/favorites", component: Favorites },
  { path: "*", component: Home }
];

const router = new VueRouter({
  mode: "history",
  routes // short for `routes: routes`
});

export default router;
