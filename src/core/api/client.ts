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

export interface NewClientInfo {
    name: string,
    type: string,
    data: {
        azure_client_id: string,
        azure_client_secret: string,
        tenant_id?: string,
        end_point?: 'global' | 'us_l4' | 'us_l5' | 'cn'
    }
}

export const clientCreator = (data: NewClientInfo) =>
    alovaInstance.Post('/user/client', data, {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })


export interface ModifiedClientInfo {
    client_id: string,
    client_type: string,
    data: {
        client_secret?: string,
        name?: string,
    }
}

export const clientModifier = (data: ModifiedClientInfo) =>
    alovaInstance.Post('/user/client/edit', data, {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
