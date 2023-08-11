import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";

export const useErrorStore = defineStore('error', () => {
    const errorList: Ref<{
        id: number,
        error: Error,
        message: string,
        expire: number,
    }[]> = ref([])

    function setError(err: Error | undefined, msg?: string, timeout: number = 60) {
        if (err === undefined) return
        errorList.value.push({
            id: Date.now(),
            error: err,
            message: msg || err.message,
            expire: Math.floor(Date.now() / 1000) + timeout,
        })
    }

    function deleteError(id: number) {
        errorList.value = errorList.value.filter(e => e.id !== id)
    }

    function clearError() {
        errorList.value = []
    }

    const error = computed(() => {
        const now = Math.floor(Date.now() / 1000)
        // delete expired error
        errorList.value = errorList.value.filter(e => e.expire > now)
        return errorList.value
    })

    return {error, setError, deleteError, clearError}
})