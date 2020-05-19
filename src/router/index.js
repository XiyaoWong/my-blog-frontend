import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    redirect: { name: "Login" },
  },
  {
    path: "/add",
    name: "AddPost",
    component: () => import("../views/AddPost.vue"),
  },
  {
    path: "/update/:id",
    name: "UpdatePost",
    component: () => import("../views/UpdatePost.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  from = "";
  const toName = to.name;
  if (toName == "AddPost" || toName == "UpdatePost") {
    if (
      window.localStorage.getItem("token") == null ||
      window.localStorage.getItem("token" == "")
    ) {
      Vue.toasted.info("请先登录!");
      next({ name: "Login" });
    }
  }
  next();
});
export default router;
