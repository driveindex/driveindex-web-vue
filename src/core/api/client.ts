import alovaInstance, {AlovaResponse} from "./index.ts";
import {useAuthStore} from "../store/authStore.ts";
import pinia from "../store";

const authStore = useAuthStore(pinia)

export type supportedEndPoints = 'Global' | 'us_l4' | 'us_l5' | 'CN'

export interface Client {
    id: string,
    name: string,
    type: string,
    create_at: string,
    modify_at: string,
    detail: {
        client_id: string,
        client_secret: string,
        tenant_id: string,
        end_point: string,
    },
    new: boolean,
    user_manage: boolean
}

export const clientListGetter = () =>
    alovaInstance.Get('/user/client', {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })

export interface ClientListResponse extends AlovaResponse {
    data: Array<Client>
}

export interface NewClientInfo {
    name: string,
    type: string,
    data: {
        azure_client_id: string,
        azure_client_secret: string,
        tenant_id?: string,
        end_point?: supportedEndPoints,
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

export const clientDeleter = (client_id: string) =>
    alovaInstance.Post('/user/client/delete', {
        client_id
    }, {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })