// Composables
import {createRouter, createWebHistory} from 'vue-router'
import Drive from "@/app/views/Drive.vue";
const routes = [
  {
    path: '/:client/:account/:drive?',
    name: 'main',
    component: Drive,
    meta:{
      keepAlive: true
    }
  },
  {
    path: '/admin',
    component: () => import("@/app/views/Admin.vue"),
    child: [
      {
        path: 'admin-common',
        component: () => import("@/app/components/admin/common/AdminCommon.vue"),
      },
      {
        path: 'admin-password',
        component: () => import("@/app/components/admin/password/AdminPassword.vue"),
      },
    ]
  },
  // if no valid pattern is matched above, redirect to the main page.
  // todo: the redirect may have problem
  // {
  //   path: '/',
  //   name: 'index',
  //   component: Drive
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
