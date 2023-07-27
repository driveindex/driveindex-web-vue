import * as msal from "@azure/msal-browser";
import {createMSALConfig, createMSALInstance} from "./configGen.ts";

const config = createMSALConfig({
    clientId: '78f0895e-e1e5-4363-8fde-38d3ad168a03',
    authority_area: 'global',
    redirectUri: 'http://localhost:5173/msal-confirm',
    postLogoutRedirectUri: 'http://localhost:5173/logout'
})

const myMSALObj = await createMSALInstance(config)

let username = '';

function selectAccount() {
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add choose account code here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        // showWelcomeMessage(username);
    }
}
async function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */
    const loginRequest = {
        scopes: ["User.Read"]
    }
    console.log('loginRequest', myMSALObj)
    await myMSALObj.loginPopup(loginRequest).then((response: any) => {
        console.log('response', response)
        username = response.account.username;
        // showWelcomeMessage(username);
    }).catch((error: any) => {
        console.log('error',error);
    })
}

function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: config.auth.redirectUri,
        mainWindowRedirectUri: config.auth.redirectUri
    };

    myMSALObj.logoutPopup(logoutRequest);
}

function getTokenPopup(request: any) {

    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(username);

    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using popup");
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenPopup(request)
                    .then(tokenResponse => {
                        console.log(tokenResponse);
                        return tokenResponse;
                    }).catch(error => {
                        console.error(error);
                    });
            } else {
                console.warn(error);
            }
        });
}


selectAccount();

export {signIn, signOut, getTokenPopup}