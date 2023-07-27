import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import("../../views/Main.vue"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../../views/Login.vue"),
        meta: {
            requiresAuth: false,
        }
    },
    {
        path:'/test',
        component: () => import("../../components/MSAL.vue"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path:'/msal-confirm',
        component: () => import("../../views/MSALConfirm.vue"),
        meta: {
            requiresAuth: true,
        }
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes,
})

// todo: Global Guards
router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem('token')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (token) {
            next()
        } else {
            next({name: 'login'})
        }
    } else {
        next()
    }
})
export default router