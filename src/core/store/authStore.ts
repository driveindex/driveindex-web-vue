import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useAuthStore = defineStore('auth', () => {
    let token = ref(localStorage.getItem('token')) || ref('')
    const username = computed(()=>{
        if (token.value === null) return ''
        const payload = token.value.split('.')[1]
        const payloadDecoded = JSON.parse(atob(payload))
        return payloadDecoded.username
    })
    const role = ref('')
    const nickname = ref('')

    const isLogin = computed(() => token.value !== '')

    const isOutdated = computed(() => {
        // parse JWT without verifying signature
        if (token.value === null) return true
        const payload = token.value.split('.')[1]
        const payloadDecoded = JSON.parse(atob(payload))
        const exp = payloadDecoded.exp
        const now = Math.floor(Date.now() / 1000)
        return exp < now
    })

    function logout() {
        token= ref(null)
        localStorage.removeItem('token')
    }

    return {token, username, role, nickname, isLogin, isOutdated, logout}
})