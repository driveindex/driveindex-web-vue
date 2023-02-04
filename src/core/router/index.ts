// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/admin',
    component: () => import("@/app/views/Admin.vue"),
    children: [
      {
        path: 'login',
        component: () => import("@/app/components/admin/AdminLogin.vue"),
      },
      {
        path: 'panel',
        component: () => import("@/app/components/admin/AdminPanel.vue"),
        children: [
          {
            path: 'basic',
            component: () => import("@/app/components/admin/panel/BasicSettings.vue")
          },
          {
            path: 'password',
            component: () => import("@/app/components/admin/panel/PasswordSettings.vue")
          }
        ]
      },
    ]
  },
  {
    path: '/:client/:account/:drive?',
    name: 'main',
    component: () => import("@/app/views/Drive.vue"),
    meta: {
      keepAlive: true
    }
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
