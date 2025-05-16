// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import TestView from "../views/TestView.vue";

const routes = [
  {
    path: "/gantt/:id",
    component: TestView,
    props: (route) => ({
      id: route.params.id,
      type: route.query.type,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
