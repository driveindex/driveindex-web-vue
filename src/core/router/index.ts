import {createRouter, createWebHistory} from "vue-router"
import {useAuthStore} from "../store/store.ts";
import pinia from "../store";

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import("../../views/Main.vue"),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '/client',
                name: 'client',
                component: () => import("../../components/client/ClientList.vue"),
                meta: {
                    requiresAuth: true,
                }
            }
        ]
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
        path: '/MSALConfirm',
        component: () => import("../../components/msal/MSALConfirm.vue"),
        meta: {
            requiresAuth: true,
        }
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes,
})

const authStore = useAuthStore(pinia)
// todo: Global Guards
router.beforeEach((to, _from, next) => {
    const token = authStore.isLogin

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (token && !authStore.isOutdated) {
            next()
        } else {
            next({name: 'login'})
        }
    } else {
        next()
    }
})
export default router