import alovaInstance from "./index.ts";
import {useAuthStore} from "../store/store.ts";
import pinia from "../store";

const authStore = useAuthStore(pinia)

export const clientListGetter = () =>
    alovaInstance.Get('/user/client', {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
