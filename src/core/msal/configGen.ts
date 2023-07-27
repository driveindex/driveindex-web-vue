import {LogLevel, PublicClientApplication} from "@azure/msal-browser";

type options = {
    clientId: string,
    authority_area: 'global' | 'cn' | 'us_gov',
    redirectUri: string,
    postLogoutRedirectUri: string,
}

const authority_url = {
    global: 'https://login.microsoftonline.com/common',
    cn: 'https://login.chinacloudapi.cn/common',
    us_gov: 'https://login.microsoftonline.us/common',
}

function createMSALConfig(options: options) {
    return {
        auth: {
            clientId: options.clientId,
            authority: authority_url[options.authority_area],
            redirectUri: options.redirectUri,
            postLogoutRedirectUri: options.postLogoutRedirectUri
        },
        cache: {
            cacheLocation: 'localStorage'
        },
        system: {
            loggerOptions: {
                loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                    if (containsPii) {
                        return;
                    }
                    switch (level) {
                        case LogLevel.Error:
                            console.error(message);
                            return;
                        case LogLevel.Info:
                            console.info(message);
                            return;
                        case LogLevel.Verbose:
                            console.debug(message);
                            return;
                        case LogLevel.Warning:
                            console.warn(message);
                            return;
                        default:
                            return;
                    }
                },
                logLevel: LogLevel.Verbose
            }
        }
    }
}

function createMSALInstance(config: any) {
    return new PublicClientApplication(config)
}

export {
    createMSALConfig,
    createMSALInstance
}