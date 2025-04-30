import { getCookie } from "@/Api/utils/cookieUtils.js";

export const authenticateUser = async (username, password) => {
    let fullRequestUrl = "https://orthovisor.com/api/authentication/user_login";
    let authorizationBody = {'username': username,
        'password': password};
    let authorizationHeader = {'Content-Type': 'application/json',};
    if (getCookie('csrftoken'))
    {
        authorizationHeader['X-CSRFToken'] = getCookie('csrftoken');
    }
    const submitcase_response = await fetch(fullRequestUrl, {
        method: "post",
        headers: authorizationHeader,
        body: JSON.stringify(authorizationBody)
    });
    return submitcase_response;
}