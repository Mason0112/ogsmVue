// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import TestView from "../views/TestView.vue";

const routes = [
  {
    path: "/gant/:dashboardCode",
    component: TestView,
    props: (route) => ({
      dashboardCode: route.params.dashboardCode,
      versionCode: route.query.versionCode,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
