// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:client/:account/:drive',
    name: 'drive',
    query: {
      path: '/',
      page: 0,
      size: 20,
    },
    component: () => import("@/app/views/Drive.vue"),
  },
  {
    path: '/admin',
    component: () => import("@/app/views/Admin.vue"),
    child: [
      {
        path: 'admin-common',
        component: () => import("@/layouts/admin/common/AdminCommon.vue"),
      },
      {
        path: 'admin-password',
        component: () => import("@/layouts/admin/password/AdminPassword.vue"),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
