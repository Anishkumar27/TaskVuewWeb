import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    meta: { requiresAuth: true },
    redirect: "/posts",
    component: () => import("../pages/Home.vue"),
    children: [
      {
        path: "/posts",
        name: "posts",
        component: () => import("../pages/Posts.vue"),
      },
      {
        path: "/post",
        name: "post",
        component: () => import("../pages/Post.vue"),
      },
      {
        path: "/new",
        name: "new",
        component: () => import("../pages/New.vue"),
      },
    ],
  },
  {
    path: "/auth",
    meta: { requiresAuth: false },
    component: () => import("../pages/auth/Index.vue"),
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: () => import("../pages/auth/Login.vue"),
      },
      {
        path: "/auth/register",
        name: "register",
        component: () => import("../pages/auth/Signup.vue"),
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: () => import("../pages/404.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    window.scrollTo(0, 0);
  },
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!sessionStorage.getItem("accessToken")) {
      next({ path: "/auth/login" });
    }
  }
  next();
});
