import {createAlova} from 'alova'
import {axiosRequestAdapter} from '@alova/adapter-axios'
import VueHook from 'alova/vue'

const alovaInstance = createAlova({
    baseURL: import.meta.env.DI_API_BASE_URL as string,
    statesHook: VueHook,
    requestAdapter: axiosRequestAdapter(),
    timeout: 10000,
    responded(response){
        return response.data
    }
})

export interface AlovaResponse{
    code: number,
    message: string,
    data?: any
}

export default alovaInstance