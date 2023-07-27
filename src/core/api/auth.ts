import alovaInstance from "./index.ts";

export const loginTokenGetter = (username: string, password: string) => alovaInstance.Post('/login', {
    username,
    password,
})