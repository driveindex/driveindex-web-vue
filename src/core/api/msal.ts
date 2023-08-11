import alovaInstance from "./index.ts";

export const MSAurlGetter = (client_id: string, redirect_uri: string) => alovaInstance.Get('/user/login/url/onedrive',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
            client_id,
            redirect_uri
        }
    })

export const MSAConfirmation = (code: string, state: string) => alovaInstance.Post('/user/login/request/onedrive', {
        code,
        state,
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })